import React, { createContext, useContext, useEffect, useState } from 'react'
import Direction from './Direction';

// 1. create context
const ThemeContext = createContext();

// 2. Custom hook để sử dụng theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 3. ThemeProvider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Button Component (cấp sâu nhất - sử dụng useContext)
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        backgroundColor: theme === 'light' ? '#007bff' : '#ffc107',
        color: theme === 'light' ? 'white' : 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
      }}
    >
      Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

// 5. Page Component (cấp 3)
function Page() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#495057',
      color: theme === 'light' ? '#212529' : '#f8f9fa',
      borderRadius: '5px',
      marginTop: '10px'
    }}>
      <h3>Page Component (Level 3)</h3>
      <p>This is the page content. Current theme: <strong>{theme}</strong></p>
      <ThemedButton />
    </div>
  );
}

// 6. Layout Component (cấp 2)
function Layout() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#e9ecef' : '#343a40',
      color: theme === 'light' ? '#212529' : '#f8f9fa',
      borderRadius: '5px',
      marginTop: '10px'
    }}>
      <h2>Layout Component (Level 2)</h2>
      <p>This is the layout wrapper</p>
      <Page />
    </div>
  );
}

// 7. Main Exercise2 Component (App level - cấp 1)
function Exercise2() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}

// Component con để sử dụng theme context
function ThemeContent() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: theme === 'light' ? '#ffffff' : '#212529',
      color: theme === 'light' ? '#212529' : '#ffffff',
      transition: 'all 0.3s ease'
    }}>
      
      <h1>Exercise 2 - Theme Manager with Context API</h1>
      <p>Current Theme: <strong>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</strong></p>
      
      <div style={{
        padding: '20px',
        backgroundColor: theme === 'light' ? '#dee2e6' : '#495057',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>App Component (Level 1)</h2>
        <p>This is the root app level. Theme can be toggled from any level!</p>
        
        {/* Toggle ở cấp 1 */}
        <ThemedButton />
        
        {/* Cấu trúc lồng nhau: Layout → Page → Button */}
        <Layout />
      </div>
    </div>
  );
}

export default Exercise2