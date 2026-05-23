import { memo } from 'react'

// Component con hiển thị 1 dòng sách
// TODO (Câu 1): SV giải thích ngắn trong bài làm:
//    - Props nào đang được nhận?
//    - Vì sao nên dùng React.memo ở đây?
// Trả lời:
// (1) Nhận props: book, onView, onDelete.
// (2) React.memo giúp tránh re-render không cần thiết khi danh sách lớn,
//     chỉ render lại khi props của item thay đổi.
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
