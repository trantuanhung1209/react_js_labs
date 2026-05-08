import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BookListPage from './pages/BookListPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { userState } from './store/atoms'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  // TODO (Câu 9): Lấy thông tin user từ Recoil để hiển thị tên + nút Logout
  const [user, setUser] = useRecoilState(userState)
  const [savedUser, setSavedUser] = useLocalStorage('user', null)
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = user || savedUser

  useEffect(() => {
    if (!user && savedUser) {
      setUser(savedUser)
    }
  }, [savedUser, setUser, user])

  const handleLogout = () => {
    setUser(null)
    setSavedUser(null)

    if (location.pathname === '/add' || location.pathname.startsWith('/books/')) {
      navigate('/login')
    }
  }

  // TODO (Câu 10): Làm ProtectedRoute cho các trang cần đăng nhập
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />
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
          {!currentUser && <NavLink to="/login">Đăng nhập</NavLink>}
          {/* TODO: Hiển thị "Xin chào, {username}" và nút Logout khi đã login */}
          {currentUser && (
            <>
              <span style={{ marginLeft: 12 }}>Xin chào, {currentUser.username}</span>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<ProtectedRoute><BookDetailPage /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddBookPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
