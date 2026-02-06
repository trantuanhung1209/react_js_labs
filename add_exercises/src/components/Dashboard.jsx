import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Welcome to React!</h1>
      <p>My name is Tran Tuan Hung - Student ID: 23659581</p>
      <p>This is my extra exercises.</p>
      <nav>
        <li>
          <Link to="/ex1" className="nav-link">
            Review hooks
          </Link>
        </li>
        <li>
          <Link to="/ex2" className="nav-link">
            Review Fetch API
          </Link>
        </li>
      </nav>
    </>
  );
}

export default Dashboard;
