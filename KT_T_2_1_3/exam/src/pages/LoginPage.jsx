import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms'
import { useLocalStorage } from '../hooks/useLocalStorage'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()

  // TODO (Câu 4): SV sử dụng custom hook useLocalStorage ở đây
  // Ví dụ: const [savedUser, setSavedUser] = useLocalStorage('user', null)
  const [, setSavedUser] = useLocalStorage('user', null)

  // TODO (Câu 9): Viết hàm đăng nhập:
  //   - Kiểm tra đơn giản: username === 'admin' && password === '123' là hợp lệ
  //   - Nếu đúng:
  //       + Lưu user vào Recoil (setUser)
  //       + Lưu user vào localStorage (qua custom hook useLocalStorage)
  //       + Điều hướng về trang /
  //   - Nếu sai: hiện thông báo lỗi
  const handleLogin = (e) => {
    e.preventDefault()
    // SV viết code ở đây
    if (username === 'admin' && password === '123') {
      const loggedInUser = { username: 'admin' }
      setUser(loggedInUser)
      setSavedUser(loggedInUser)
      navigate('/')
      return
    }

    alert('Tên đăng nhập hoặc mật khẩu không đúng')
  }

  return (
    <div className="login-box">
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>🔐 Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Đăng nhập
        </button>
      </form>
      <p style={{ marginTop: 10, fontSize: 12, color: '#888' }}>
        Gợi ý: admin / 123
      </p>
    </div>
  )
}

export default LoginPage
