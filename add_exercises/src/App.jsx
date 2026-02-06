import "./App.css";
import Exercise1 from "./components/Exercise1";
import Exercise2 from "./components/Exercise2";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import UseStateExample from "./components/UseStateExample";
import UseEffectExample from "./components/UseEffectExample";
import UseReducerExample from "./components/UseReducerExample";
import UseRefExample from "./components/UseRefExample";
import UseMemoExample from "./components/UseMemoExample";
import UseCallbackExample from "./components/UseCallbackExample";
import MemoExample from "./components/MemoExample";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ex1" element={<Exercise1 />} />
        <Route path="/ex2" element={<Exercise2 />} />
        
        {/* React Hooks Examples */}
        <Route path="/use-state" element={<UseStateExample />} />
        <Route path="/use-effect" element={<UseEffectExample />} />
        <Route path="/use-reducer" element={<UseReducerExample />} />
        <Route path="/use-ref" element={<UseRefExample />} />
        <Route path="/use-memo" element={<UseMemoExample />} />
        <Route path="/use-callback" element={<UseCallbackExample />} />
        <Route path="/memo" element={<MemoExample />} />
      </Routes>

    </>
  );
}

export default App;
