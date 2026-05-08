import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { booksState, filterState } from '../store/atoms'
import { getBooks, deleteBook } from '../services/bookApi'
import BookItem from '../components/BookItem'
import SearchBox from '../components/SearchBox'

function BookListPage() {
  const [books, setBooks] = useRecoilState(booksState)
  const [filter, setFilter] = useRecoilState(filterState)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // TODO (Câu 2): SV dùng useEffect + hàm getBooks() để fetch danh sách sách
  // khi component mount. Nhớ bật/tắt loading cho đúng.
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getBooks()
      .then((data) => {
        if (isMounted) {
          setBooks(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setBooks([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [setBooks])

  // TODO (Câu 6): SV lọc sách dựa trên `filter` (trạng thái) và `keyword` (tên sách)
  // Gợi ý: filter === 'all' thì giữ nguyên; ngược lại so sánh book.status === filter
  //        keyword: so sánh (không phân biệt hoa thường) với book.title
  const normalizedKeyword = keyword.trim().toLowerCase()
  const displayedBooks = books.filter((book) => {
    const matchStatus = filter === 'all' || book.status === filter
    const matchKeyword =
      normalizedKeyword.length === 0 ||
      (book.title || '').toLowerCase().includes(normalizedKeyword)
    return matchStatus && matchKeyword
  })

  // TODO (Câu 8): SV viết hàm xử lý xóa sách:
  //   - Gọi API deleteBook(id)
  //   - Sau khi xóa thành công thì cập nhật lại booksState (loại bỏ sách khỏi list)
  //   - Nên có confirm trước khi xóa
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa sách này?')
    if (!confirmed) return
    await deleteBook(id)
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>📚 Danh sách sách</h2>

      <div className="filter-bar">
        <SearchBox value={keyword} onChange={setKeyword} />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="read">Đã đọc</option>
          <option value="reading">Đang đọc</option>
          <option value="unread">Chưa đọc</option>
        </select>
      </div>

      {loading && <p>Đang tải...</p>}

      {!loading && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedBooks.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>
                    Không có sách nào phù hợp
                  </td>
                </tr>
              ) : (
                displayedBooks.map((book) => (
                  <BookItem
                    key={book.id}
                    book={book}
                    onView={() => navigate(`/books/${book.id}`)}
                    onDelete={() => handleDelete(book.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default BookListPage
