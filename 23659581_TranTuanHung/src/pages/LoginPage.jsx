import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms'
import { useLocalStorage } from '../hooks/useLocalStorage'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()

  // TODO (Câu 9): Dùng useLocalStorage để có biến savedUser
  // const [savedUser, setSavedUser] = useLocalStorage('user', null)
  const [savedUser, setSavedUser] = useLocalStorage('user', null)

  // TODO (Câu 9): Viết handleLogin:
  //   - Validate: username, password không rỗng
  //   - Đúng (chef / 1234) -> setUser({ username }), setSavedUser({ username }), navigate('/')
  //   - Sai -> setError("Sai tài khoản hoặc mật khẩu")
  const handleLogin = (e) => {
    e.preventDefault()
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu')
      return
    }

    if (trimmedUsername === 'chef' && trimmedPassword === '1234') {
      const user = { username: trimmedUsername }
      setUser(user)
      setSavedUser(user)
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch {}
      setError('')
      navigate('/')
    } else {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div className="login-box">
      <h2 style={{ marginBottom: 20, textAlign: 'center', color: 'var(--primary)' }}>🔐 ĐĂNG NHẬP</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="error-text">⚠ {error}</p>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }}>
          Đăng nhập
        </button>
      </form>
      <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
        Gợi ý: chef / 1234
      </p>
    </div>
  )
}

export default LoginPage
