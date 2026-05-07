import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookById } from '../services/bookApi'

function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  // TODO (Câu 5): SV dùng useEffect để gọi getBookById(id) và lưu kết quả vào state
  // Lưu ý: Khi id thay đổi thì phải fetch lại.
  useEffect(() => {
    let isMounted = true

    const fetchBook = async () => {
      try {
        setLoading(true)
        const data = await getBookById(id)
        if (isMounted) {
          setBook(data)
        }
      } catch (error) {
        if (isMounted) {
          setBook(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBook()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) return <p>Đang tải...</p>
  if (!book) return <p>Không tìm thấy sách</p>

  return (
    <div className="card">
      <button className="btn btn-warning" onClick={() => navigate(-1)}>← Quay lại</button>

      <h2 style={{ marginTop: 16 }}>{book.title}</h2>
      <p><b>Tác giả:</b> {book.author}</p>
      <p><b>Thể loại:</b> {book.category}</p>
      <p><b>Trạng thái:</b> {book.status}</p>
      <p style={{ marginTop: 12 }}>{book.description}</p>
    </div>
  )
}

export default BookDetailPage
