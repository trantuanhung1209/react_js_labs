import { atom } from 'recoil'

// TODO (Câu 3): SV sử dụng atom này cho danh sách sách
export const booksState = atom({
  key: 'booksState',
  default: [],
})

// TODO (Câu 9): SV sử dụng atom này cho user đang đăng nhập
// Giá trị: null (chưa login) hoặc { username: 'abc' }
export const userState = atom({
  key: 'userState',
  default: null,
})

// TODO (Câu 6): SV sử dụng atom này cho filter (trạng thái đọc)
// Giá trị: 'all' | 'read' | 'reading' | 'unread'
export const filterState = atom({
  key: 'filterState',
  default: 'all',
})
