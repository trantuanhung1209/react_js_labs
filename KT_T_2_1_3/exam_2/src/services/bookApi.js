import axios from 'axios'

// Sử dụng mockapi.io hoặc json-server cho trước:
// URL mẫu: https://67xxxxx.mockapi.io/books
export const API_URL = 'https://69fc4450fce564e25917b0fd.mockapi.io/books'

// TODO (Câu 2): SV viết hàm fetch danh sách sách bằng axios
export async function getBooks() {
  return axios.get(API_URL).then((res) => res.data)
}

// TODO (Câu 7): SV viết hàm POST thêm sách mới
export async function addBook(book) {
  return axios.post(API_URL, book).then((res) => res.data)
}

// TODO (Câu 8): SV viết hàm DELETE sách theo id
export async function deleteBook(id) {
  return axios.delete(`${API_URL}/${id}`).then((res) => res.data)
}

// TODO (Câu 5): SV viết hàm GET chi tiết 1 cuốn sách theo id
export async function getBookById(id) {
  return axios.get(`${API_URL}/${id}`).then((res) => res.data)
}
