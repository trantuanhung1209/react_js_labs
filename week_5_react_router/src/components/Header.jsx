import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Header() {
  return (
    <>
        <nav>
            <Link to="/dashboard/home">Home</Link> | 
            <Link to="/dashboard/about">About</Link> | 
            <Link to="/dashboard/contact">Contact</Link> | 
            <Link to="/dashboard/products">Products</Link> | 
            <Link to="/dashboard/profile">Profile</Link> | 
            <Link to="/dashboard/orders">Orders</Link> | 
            <Link to="/dashboard/settings">Setting</Link> | 
            <Link to="/dashboard/carts">Setting</Link> | 
            <Link to="/login">Login</Link> | 
        </nav>
    </>
  )
}

export default Header
