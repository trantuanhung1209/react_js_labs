import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import Notfound from './components/Notfound';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import Order from './components/Order';
import Setting from './components/Setting';
import Checkout from './components/Checkout';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import Cart from './components/Cart';

// Định nghĩa routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "products", element: <Product /> },
      { path: "products/:id", element: <ProductDetail /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "carts/:id",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "Settings", element: <Setting /> },
      { path: "Checkout/:id", element: <Checkout /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App