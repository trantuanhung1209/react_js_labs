import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ComponentA from './components/ComponentA'
import ComponentB from './components/ComponentB'
import { useRecoilState } from 'recoil'
import { themeState } from './atoms/themeState'
import Login from './components/Login'
import Logout from './components/Logout'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import Notifications from './components/Notifications'
import UserList from './components/UserList'
import Search from './components/Search'
import UserInfo from './components/UserInfo'
import { useAuth } from './hooks/useAuth'
import ProductCatalog from './components/ProductCatalog'
import CartSummary from './components/CartSummary'

function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const { checkAuth } = useAuth();

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // save local storage
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  }

  // load local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // Check if user is already logged in
    checkAuth();
  }, [setTheme, checkAuth]);

  return (
    <>
    <Notifications />
    
    {/* Header & Theme */}
    <header style={{ 
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
      padding: '15px',
      marginBottom: '20px',
      borderBottom: '1px solid #ddd'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Global State Management Labs</h1>
        <button onClick={handleToggleTheme} style={{
          padding: '8px 16px',
          backgroundColor: theme === 'light' ? '#333' : '#fff',
          color: theme === 'light' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <Login />
        <Logout />
      </div>
    </header>

    <main style={{
      backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
      color: theme === 'light' ? '#000' : '#fff',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>

      {/* Bài 1 & 2: Cơ bản */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 1-2: Cơ bản (Props, State)</h2>
        <ComponentA />
        <ComponentB />
      </section>

      {/* Bài 3 & 4: useContext */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 3-4: useContext & Global State</h2>
        <p style={{ fontSize: '14px', color: '#888' }}>Theme được quản lý bằng Recoil (xem header phía trên)</p>
      </section>

      {/* Bài 5: Todo List */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 5: Todo List (useState + Recoil)</h2>
        <TodoInput />
        <TodoList />
      </section>

      {/* Bài 6 & 7: Shopping Cart */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 6-7: Shopping Cart (Recoil)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Sản phẩm</h3>
            <ProductList />
          </div>
          <div>
            <h3>Giỏ hàng</h3>
            <Cart />
          </div>
        </div>
      </section>

      {/* Bài 8: Search + Debounce + API */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 8: Search + Debounce + API</h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>
          Input tìm kiếm → Debounce 500ms → Gọi API → Lưu vào Global State
        </p>
        <Search />
        <UserList />
      </section>

      {/* Bài 9: Auth + API + Token */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 9: Auth + API + Token</h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>
          Login API → Token → Gọi API cần auth → Logout → Xóa token
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <Login />
          <Logout />
        </div>
        <UserInfo />
      </section>

      {/* Bài 10: Mini App (Tổng hợp) */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#2a2a2a', borderRadius: '8px' }}>
        <h2>Bài 10: Mini App (Tổng hợp)</h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>
          Kiến trúc hoàn chỉnh: Product API + Cart Global + Auth Global + Loading + Error + Notification
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            <ProductCatalog />
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </section>

    </main>
    </>
  )
}

export default App
