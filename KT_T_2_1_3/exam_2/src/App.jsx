import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState } from './store/atoms'
import { useLocalStorage } from './hooks/useLocalStorage'
import HomePage from './pages/HomePage.jsx'
import BookListPage from './pages/BookListPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function App() {
  // TODO (Câu 9): Lấy thông tin user từ Recoil để hiển thị tên + nút Logout
  // TODO (Câu 10): Làm ProtectedRoute cho các trang cần đăng nhập
  const [user, setUser] = useRecoilState(userState)
  const location = useLocation()
  const navigate = useNavigate()
  const [savedUser, setSavedUser] = useLocalStorage('user', null)
  const effectiveUser = user || savedUser

  useEffect(() => {
    if (!user && savedUser) {
      setUser(savedUser)
    }
  }, [user, savedUser, setUser])

  useEffect(() => {
    if (user) {
      setSavedUser(user)
    }
  }, [user, setSavedUser])

  useEffect(() => {
    const isProtected =
      location.pathname.startsWith('/add') || location.pathname.startsWith('/books/')
    if (!effectiveUser && isProtected) {
      navigate('/login')
    }
  }, [effectiveUser, location.pathname, navigate])

  const handleLogout = () => {
    setUser(null)
    setSavedUser(null)
  }

  const ProtectedRoute = ({ children }) => {
    if (!effectiveUser) return <Navigate to="/login" />
    return children
  }

  return (
    <>
      <nav className="navbar">
        <h1>📚 My Book Library</h1>
        <div>
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/books">Danh sách sách</NavLink>
          <NavLink to="/add">Thêm sách</NavLink>
          {!effectiveUser && <NavLink to="/login">Đăng nhập</NavLink>}
          {/* TODO: Hiển thị "Xin chào, {username}" và nút Logout khi đã login */}
          {effectiveUser && (
            <>
              <span style={{ marginLeft: 12, marginRight: 8 }}>
                Xin chào, {effectiveUser.username}
              </span>
              <button className="btn btn-warning" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBookPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
