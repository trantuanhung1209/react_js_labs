import { useState, useRef, useEffect } from 'react';

function Exercise5() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapName, setLapName] = useState("");
  const intervalId = useRef(null);
  const lapInputRef = useRef(null);

  // Start
  const handleStart = () => {
    if (!running) {
      setRunning(true);
      intervalId.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
  };

  // Pause
  const handlePause = () => {
    setRunning(false);
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  // Reset
  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
    setLapName("");
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  // Add Lap
  const handleAddLap = () => {
    if (lapName.trim()) {
      setLaps([...laps, { name: lapName, time }]);
      setLapName("");
    }
    // Focus input lap name
    if (lapInputRef.current) lapInputRef.current.focus();
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  // Format time
  const formatTime = (ms) => {
    const centiseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 60000) % 60);
    const hours = Math.floor(ms / 3600000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: 400, margin: '32px auto', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #0002', background: '#fff' }}>
      <h2>Stopwatch</h2>
      <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 16, fontFamily: 'monospace' }}>{formatTime(time)}</div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={handleStart} disabled={running} style={{ marginRight: 8 }}>Start</button>
        <button onClick={handlePause} disabled={!running} style={{ marginRight: 8 }}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          ref={lapInputRef}
          value={lapName}
          onChange={e => setLapName(e.target.value)}
          placeholder="Lap name"
          style={{ padding: 6, width: 180, marginRight: 8 }}
        />
        <button onClick={handleAddLap}>Add Lap</button>
      </div>
      <div>
        <h4>Laps</h4>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {laps.map((lap, idx) => (
            <li key={idx} style={{ padding: '4px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <span>{lap.name}</span>
              <span style={{ fontFamily: 'monospace' }}>{formatTime(lap.time)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exercise5;