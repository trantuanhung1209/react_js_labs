import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { booksState } from '../store/atoms'
import { addBook } from '../services/bookApi'

// TODO (Câu 7): SV hoàn thiện reducer cho form thêm sách.
// State form gồm các trường: title, author, category, status, error
// Các action tối thiểu:
//   - { type: 'SET_FIELD', field, value }  -> cập nhật 1 trường
//   - { type: 'SET_ERROR', error }         -> gán thông báo lỗi
//   - { type: 'RESET' }                    -> reset về trạng thái rỗng
const initialState = {
  title: '',
  author: '',
  category: '',
  status: 'unread',
  error: '',
}

function formReducer(state, action) {
  // SV viết các case ở đây
  return state
}

function AddBookPage() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const setBooks = useSetRecoilState(booksState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value })
  }

  // TODO (Câu 7): SV viết hàm submit:
  //   1. Validate: title và author không được để trống -> nếu sai thì dispatch SET_ERROR
  //   2. Gọi API addBook(...) để thêm sách lên server
  //   3. Cập nhật booksState (thêm sách mới vào danh sách)
  //   4. Reset form và điều hướng về trang /books
  const handleSubmit = async (e) => {
    e.preventDefault()
    // SV viết code ở đây
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 16 }}>➕ Thêm sách mới</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên sách *</label>
          <input name="title" value={state.title} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Tác giả *</label>
          <input name="author" value={state.author} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Thể loại</label>
          <input name="category" value={state.category} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select name="status" value={state.status} onChange={handleChange}>
            <option value="unread">Chưa đọc</option>
            <option value="reading">Đang đọc</option>
            <option value="read">Đã đọc</option>
          </select>
        </div>

        {state.error && (
          <p style={{ color: 'red', marginBottom: 10 }}>⚠ {state.error}</p>
        )}

        <button type="submit" className="btn btn-success">Thêm sách</button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Làm mới
        </button>
      </form>
    </div>
  )
}

export default AddBookPage
