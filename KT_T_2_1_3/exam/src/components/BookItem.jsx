import { memo } from 'react'

// Component con hiển thị 1 dòng sách
// TODO (Câu 1): SV giải thích ngắn trong bài làm:
//    - Props nào đang được nhận?
//    - Vì sao nên dùng React.memo ở đây?
// Props nhận vào: book (thông tin sách), onView (xử lý xem chi tiết), onDelete (xử lý xóa).
// React.memo phù hợp vì khi danh sách lớn, item không đổi sẽ không bị render lại không cần thiết.
function BookItem({ book, onView, onDelete }) {
  const statusMap = {
    read:    { label: 'Đã đọc',   className: 'badge-read' },
    reading: { label: 'Đang đọc', className: 'badge-reading' },
    unread:  { label: 'Chưa đọc', className: 'badge-unread' },
  }
  const status = statusMap[book.status] || statusMap.unread

  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.category}</td>
      <td><span className={`badge ${status.className}`}>{status.label}</span></td>
      <td>
        <button className="btn btn-primary" onClick={onView}>Xem</button>
        <button className="btn btn-danger"  onClick={onDelete}>Xóa</button>
      </td>
    </tr>
  )
}

export default memo(BookItem)
