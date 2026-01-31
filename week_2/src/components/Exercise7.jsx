import React, { createContext, useContext, useState, useEffect } from 'react';

// ThemeContext
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.background = theme === 'light' ? '#f5f5f5' : '#222';
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Button: cấp sâu nhất, lấy theme qua useContext
function Button() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 20px',
        borderRadius: 8,
        border: 'none',
        background: theme === 'light' ? '#1976d2' : '#444',
        color: '#fff',
        fontWeight: 600,
        boxShadow: '0 2px 8px #0002',
        cursor: 'pointer',
        marginTop: 12,
      }}
    >
      Đổi theme: {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

// Card: cấp giữa
function Card() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{
      background: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#222' : '#eee',
      borderRadius: 12,
      boxShadow: '0 2px 12px #0002',
      padding: 24,
      margin: '32px auto',
      maxWidth: 400,
      textAlign: 'center',
      transition: 'all 0.3s',
    }}>
      <h2>Theme Switcher</h2>
      <p>Chọn theme cho toàn UI</p>
      <Button />
    </div>
  );
}

// Layout: cấp giữa
function Layout() {
  return <Card />;
}

// App: cấp ngoài cùng
function Exercise7() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default Exercise7;