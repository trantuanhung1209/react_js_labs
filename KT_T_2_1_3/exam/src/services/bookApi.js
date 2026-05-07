import axios from 'axios'

// Sử dụng mockapi.io hoặc json-server cho trước:
// URL mẫu: https://67xxxxx.mockapi.io/books
export const API_URL = 'https://69f7e71edd0c226688ee03bf.mockapi.io/books'

// TODO (Câu 2): SV viết hàm fetch danh sách sách bằng axios
export async function getBooks() {
  console.log('GET', API_URL)
  return axios.get(API_URL).then(res => {
    console.log('books data', res.data)
    return res.data
  })
}

// TODO (Câu 7): SV viết hàm POST thêm sách mới
export async function addBook(book) {
  // ...
}

// TODO (Câu 8): SV viết hàm DELETE sách theo id
export async function deleteBook(id) {
  // ...
}

// TODO (Câu 5): SV viết hàm GET chi tiết 1 cuốn sách theo id
export async function getBookById(id) {
  // ...
}
