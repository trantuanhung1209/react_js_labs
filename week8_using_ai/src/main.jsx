import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "./App"
import SearchPage from "./components/SearchPage"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
