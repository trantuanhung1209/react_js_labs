import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Welcome to React!</h1>
      <p>My name is Tran Tuan Hung - Student ID: 23659581</p>
      <p>
        This is my exercise for week 4: State Management (Context / Redux
        Toolkit)
      </p>
      <nav>
        <li>
          <Link to="ex1" className="nav-link">
            Bài 1 – useReducer cho state phức tạp
          </Link>
        </li>
        <li>
          <Link to="ex2" className="nav-link">
            Bài 2 – Global State với Context API
          </Link>
        </li>
        <li>
          <Link to="ex3" className="nav-link">
            Bài 3 – State Management thực tế (Context + Reducer)
          </Link>
        </li>
        <li>
          <Link to="profile">Profile</Link> |<Link to="settings">Settings</Link>
        </li>
      </nav>

      <Outlet />
    </>
  );
}

export default Dashboard;
