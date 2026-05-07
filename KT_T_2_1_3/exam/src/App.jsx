import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BookListPage from './pages/BookListPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function App() {
  // TODO (Câu 9): Lấy thông tin user từ Recoil để hiển thị tên + nút Logout
  // TODO (Câu 10): Làm ProtectedRoute cho các trang cần đăng nhập

  return (
    <>
      <nav className="navbar">
        <h1>📚 My Book Library</h1>
        <div>
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/books">Danh sách sách</NavLink>
          <NavLink to="/add">Thêm sách</NavLink>
          <NavLink to="/login">Đăng nhập</NavLink>
          {/* TODO: Hiển thị "Xin chào, {username}" và nút Logout khi đã login */}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
