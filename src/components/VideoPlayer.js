import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = React.forwardRef(({ url }, ref) => {
  const videoRef = useRef();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  }, [url]);

  // Expose videoRef for parent sync logic
  React.useImperativeHandle(ref, () => videoRef.current);

  return (
    <video ref={videoRef} controls width="100%" height="100%" />
  );
});

export default VideoPlayer;
