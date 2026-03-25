import React, { createContext, use, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const CounterContext = createContext();

function Dashboard() {

  return (
    <>
      <nav
        style={{
          marginTop: "40px",
        }}
      >
        <Link to="/dashboard/counter1">Counter 1</Link> |{" "}
        <Link to="/dashboard/counter2">Counter 2</Link> |{" "}
        <Link to="/dashboard/counter3">Counter 3</Link> |{" "}
        <Link to="/dashboard/counter4">Counter 4</Link> |{" "}
        <Link to="/dashboard/counter5">Counter 5</Link> |{" "}
        <Link to="/dashboard/counter6">Counter 6</Link> |{" "}
        <Link to="/dashboard/counter7">Counter 7</Link> |{" "}
        <Link to="/dashboard/counter8">Counter 8</Link> |{" "}
        <Link to="/dashboard/counter9">Counter 9</Link> |{" "}
        <Link to="/dashboard/counter10">Counter 10</Link> |{" "}
        <Link to="/dashboard/fetching-data">Fetching Data</Link> |{" "}
        <Link to="/dashboard/fetching-data-hook">Fetching Data Hook</Link> |{" "}
        <Link to="/dashboard/memo-demo">React.memo Demo</Link> |{" "}
        <Link to="/dashboard/usememo-search-users">useMemo Search Users</Link> |{" "}
        <Link to="/dashboard/usecallback-demo">useCallback Demo</Link>|{" "}
        <Link to="/dashboard/user-filter">User filter</Link>|{" "}
        <Link to="/dashboard/user-posts">User posts</Link>|{" "}
        <Link to="/dashboard/user-posts-memo">User posts (with useMemo)</Link>
      </nav>

      <div
        className=""
        style={{
          marginTop: "40px",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
