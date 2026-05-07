# 📚 Đề kiểm tra React - My Book Library

## Hướng dẫn cài đặt

```bash
npm install
npm run dev
```

## Cấu trúc thư mục

```
src/
 ├── components/
 │    ├── BookItem.jsx       (Câu 1 - memo, props)
 │    └── SearchBox.jsx      (Câu 1 - useRef)
 ├── hooks/
 │    └── useLocalStorage.js (Câu 4 - custom hook)
 ├── pages/
 │    ├── HomePage.jsx       (Câu 6 - useMemo)
 │    ├── BookListPage.jsx   (Câu 2, 6, 8 - fetch, filter, delete)
 │    ├── BookDetailPage.jsx (Câu 5 - useParams)
 │    ├── AddBookPage.jsx    (Câu 7 - useReducer)
 │    └── LoginPage.jsx      (Câu 4, 9 - login)
 ├── services/
 │    └── bookApi.js         (axios)
 ├── store/
 │    └── atoms.js           (Recoil)
 ├── App.jsx                 (Câu 10 - routes)
 └── main.jsx
```

## Chuẩn bị API

Tạo mockapi.io với resource `books` có schema:
- id (number)
- title (string)
- author (string)
- category (string)
- status (string)    // 'read' | 'reading' | 'unread'
- description (string)

Sau đó thay `API_URL` trong `src/services/bookApi.js`.

## Nộp bài

Nén toàn bộ thư mục (KHÔNG kèm node_modules) thành file zip.
Đặt tên: `<MSSV>_<HoTen>.zip`
