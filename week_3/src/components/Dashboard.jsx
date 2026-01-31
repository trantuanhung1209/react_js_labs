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
            Bài 3 – Fetch theo tham số (Dynamic Fetch)
          </Link>
        </li>
        <li>
          <Link to="/ex4" className="nav-link">
            Bài 4 – Fetch + Search + Filter (THỰC TẾ)
          </Link>
        </li>
        <li>
          <Link to="/ex5" className="nav-link">
            Bài 5 – CRUD với Fetch API (NÂNG CAO)
          </Link>
        </li>
      </nav>
    </>
  );
}

export default Dashboard;
