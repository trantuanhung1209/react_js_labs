import { useEffect } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import HomePage from './pages/HomePage.jsx'
import RecipeListPage from './pages/RecipeListPage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'
import AddRecipePage from './pages/AddRecipePage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { useTheme } from './context/ThemeContext.jsx'
import { userState } from './store/atoms'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const { theme, toggleTheme } = useTheme()

  // TODO (Câu 9): Lấy user từ Recoil để hiển thị tên + nút Logout trên navbar
  // TODO (Câu 10): Bọc /add và /favorites bằng ProtectedRoute
  const [user, setUser] = useRecoilState(userState)
  const [savedUser, setSavedUser] = useLocalStorage('user', null)

  useEffect(() => {
    if (savedUser && !user) setUser(savedUser)
  }, [savedUser, user, setUser])

  const handleLogout = () => {
    // setUser(null)
    setSavedUser(null)
  }

  const isAuthed = Boolean(user || savedUser)
  const ProtectedRoute = ({ children }) => {
    if (!isAuthed) return <Navigate to="/login" replace />
    return children
  }

  return (
    <>
      <nav className="navbar">
        <h1>🍳 RECIPE BOOK</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/recipes">Công thức</NavLink>
          <NavLink to="/favorites">Yêu thích</NavLink>
          <NavLink to="/add">Thêm mới</NavLink>
          {!user && <NavLink to="/login">Đăng nhập</NavLink>}
          {user && (
            <>
              <span style={{ marginLeft: 8 }}>Xin chào, {user.username}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </>
          )}

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Sáng' : '🌙 Tối'}
          </button>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={(
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          )} />
          <Route path="/add" element={(
            <ProtectedRoute>
              <AddRecipePage />
            </ProtectedRoute>
          )} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
