import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from './store/atoms'
import { useLocalStorage } from './hooks/useLocalStorage'
import HomePage from './pages/HomePage.jsx'
import BookListPage from './pages/BookListPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function ProtectedRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  // TODO (Câu 9): Lấy thông tin user từ Recoil để hiển thị tên + nút Logout
  // TODO (Câu 10): Làm ProtectedRoute cho các trang cần đăng nhập
  const [user, setUser] = useRecoilState(userState)
  const [savedUser, setSavedUser] = useLocalStorage('user', null)

  useEffect(() => {
    if (savedUser && !user) {
      setUser(savedUser)
    }
  }, [savedUser, user, setUser])

  const handleLogout = () => {
    setUser(null)
    setSavedUser(null)
  }

  return (
    <>
      <nav className="navbar">
        <h1>📚 My Book Library</h1>
        <div>
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/books">Danh sách sách</NavLink>
          <NavLink to="/add">Thêm sách</NavLink>
          {!user && <NavLink to="/login">Đăng nhập</NavLink>}
          {user && (
            <>
              <span style={{ marginLeft: 12 }}>Xin chào, {user.username}</span>
              <button
                type="button"
                className="btn btn-warning"
                style={{ marginLeft: 8 }}
                onClick={handleLogout}
              >
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
            element={(
              <ProtectedRoute user={user}>
                <BookDetailPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/add"
            element={(
              <ProtectedRoute user={user}>
                <AddBookPage />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App


