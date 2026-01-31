import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Exercise1 from "./components/Exercise1";
import Exercise2 from "./components/Exercise2";
import Exercise3 from "./components/Exercise3";
import Exercise4 from "./components/Exercise4";
import Exercise5 from "./components/Exercise5";
import Exercise6 from "./components/Exercise6";
import Exercise7 from "./components/Exercise7";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ex1" element={<Exercise1 />} />
        <Route path="/ex2" element={<Exercise2 />} />
        <Route path="/ex3" element={<Exercise3 />} />
        <Route path="/ex4" element={<Exercise4 />} />
        <Route path="/ex5" element={<Exercise5 />} />
        <Route path="/ex6" element={<Exercise6 />} />
        <Route path="/ex7" element={<Exercise7 />} />
      </Routes>

    </>
  );
}

export default App;
