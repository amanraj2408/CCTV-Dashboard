<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

// Update these URLs to your server's HLS endpoints generated via FFmpeg
const STREAM_URLS = [
  "http://localhost:8000/stream1.m3u8",
  "http://localhost:8000/stream2.m3u8",
  "http://localhost:8000/stream3.m3u8",
  "http://localhost:8000/stream4.m3u8", 
  "http://localhost:8000/stream5.m3u8",
  "http://localhost:8000/stream6.m3u8"
];

const App = () => {
  const playersRef = useRef([]);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (playersRef.current.length === 0) return;
      const masterPlayer = playersRef.current[0];
      if (!masterPlayer) return;
      const currentTime = masterPlayer.currentTime;
      playersRef.current.forEach((player, idx) => {
        if (player && idx !== 0 && Math.abs(player.currentTime - currentTime) > 0.3) {
          player.currentTime = currentTime;
        }
      });
    }, 500);

    return () => clearInterval(syncInterval);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Multi-Stream Video Dashboard</h1>
        <p>Live HLS video feeds – synchronized for smooth monitoring.</p>
      </header>
      <div className="dashboard-grid">
        {STREAM_URLS.map((url, index) => (
          <VideoPlayer
            key={index}
            url={url}
            ref={el => (playersRef.current[index] = el?.videoRef?.current || null)}
          />
        ))}
      </div>
    </div>
  );
};
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
>>>>>>> 30cac26f1d36715f0a1897e00c1436109a3101eb

export default App;
