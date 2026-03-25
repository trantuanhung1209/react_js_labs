
import React, { use, useEffect, useState } from 'react';
import Counter_5 from './components/Counter_5';
import Counter_6 from './components/Counter_6';
import Dashboard from './components/Dashboard';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Counter_2 from './components/Counter_2';
import Counter_3 from './components/Counter_3';
import Counter_4 from './components/Counter_4';
import Counter_7 from './components/Counter_7';
import Counter_8 from './components/Counter_8';
import Counter_9 from './components/Counter_9';
import Counter_10 from './components/Counter_10';
import CounterState from './components/Counter_1';
import CounterReducer from './components/Counter_2';
import FetchingData from './components/FetchingData';
import FetchingDataWithHook from './components/FetchingDataWithHook';
import MemoDemo from './components/MemoDemo';
import UseMemoUserSearch from './components/UseMemoUserSearch';
import UseCallbackDemo from './components/UseCallbackDemo';
import UserFilter from './components/UserFilter';
import UserPosts from './components/UserPosts';
import UserPostsMemo from './components/UserPostsMemo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "counter1",
        element: <CounterState />,
      },
      {
        path: "counter2",
        element: <CounterReducer />,
      },
      {
        path: "counter3",
        element: <Counter_3 />,
      },
      {
        path: "counter4",
        element: <Counter_4 />,
      },
      {
        path: "counter5",
        element: <Counter_5 />,
      },
      {
        path: "counter6",
        element: <Counter_6 />,
      },
      {
        path: "counter7",
        element: <Counter_7 />,
      },
      {
        path: "counter8",
        element: <Counter_8 />,
      },
      {
        path: "counter9",
        element: <Counter_9 />,
      },
      {
        path: "counter10",
        element: <Counter_10 />,
      },
      {
        path: "fetching-data",
        element: <FetchingData />,
      },
      {
        path: "fetching-data-hook",
        element: <FetchingDataWithHook />,
      },
      {
        path: "memo-demo",
        element: <MemoDemo />,
      },
      {
        path: "usememo-search-users",
        element: <UseMemoUserSearch />,
      },
      {
        path: "usecallback-demo",
        element: <UseCallbackDemo />,
      },
      {
        path: "user-filter",
        element: <UserFilter />,
      },
      {
        path: "user-posts",
        element: <UserPosts />,
      },
      {
        path: "user-posts-memo",
        element: <UserPostsMemo />,
      }
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;