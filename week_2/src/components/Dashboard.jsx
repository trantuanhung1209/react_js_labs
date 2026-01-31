import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Welcome to React!</h1>
      <p>My name is Tran Tuan Hung - Student ID: 23659581</p>
      <p>This is my exercise for week 2.</p>
      <nav>
        <li>
          <Link to="/ex1" className="nav-link">
            Bài tập 1: Form & Controlled Components
          </Link>
        </li>
        <li>
          <Link to="/ex2" className="nav-link">
            Bài tập 02: useEffect cơ bản (Lifecycle)
          </Link>
        </li>
        <li>
          <Link to="/ex3" className="nav-link">
            Bài tập 03: “Product Filter + Tổng tiền”
          </Link>
        </li>
        <li>
          <Link to="/ex4" className="nav-link">
            Bài tập 04: “Todo List Performance”
          </Link>
        </li>
        <li>
          <Link to="/ex5" className="nav-link">
            Bài tập 05: “Stopwatch”
          </Link>
        </li>
        <li>
          <Link to="/ex6" className="nav-link">
            Bài tập 06: “Fetch Users State Machine”
          </Link>
        </li>
        <li>
          <Link to="/ex7" className="nav-link">
            Bài tập 07: “Theme Switcher”
          </Link>
        </li>
      </nav>
    </>
  );
}

export default Dashboard;
