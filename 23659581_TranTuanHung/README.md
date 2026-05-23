# 🍳 Đề kiểm tra React - Recipe Book

## Hướng dẫn chạy

```bash
npm install
npm run dev
```

## Cấu trúc thư mục

```
src/
 ├── components/
 │    ├── RecipeCard.jsx       (Câu 1 - memo, props)
 │    └── SearchBox.jsx        (Câu 1 - useRef)
 ├── context/
 │    └── ThemeContext.jsx     (Câu 4 - useContext, theme sáng/tối)
 ├── hooks/
 │    ├── useFetch.js          (Câu 4 - custom hook)
 │    └── useLocalStorage.js   (đã viết sẵn - dùng cho Câu 9)
 ├── pages/
 │    ├── HomePage.jsx         (Câu 6 - useMemo)
 │    ├── RecipeListPage.jsx   (Câu 2, 4, 6, 8)
 │    ├── RecipeDetailPage.jsx (Câu 5, 8)
 │    ├── AddRecipePage.jsx    (Câu 7 - useReducer + mảng động)
 │    ├── FavoritesPage.jsx    (Câu 6 - useMemo lọc favorite)
 │    └── LoginPage.jsx        (Câu 9)
 ├── services/
 │    └── recipeApi.js         (axios)
 ├── store/
 │    └── atoms.js             (Câu 3 - Recoil)
 ├── App.jsx                   (Câu 9, 10 - routes, ProtectedRoute)
 └── main.jsx
```

## Cấu trúc dữ liệu 1 công thức

```json
{
  "id": 1,
  "title": "Phở bò",
  "difficulty": "medium",
  "cookTime": 180,
  "servings": 4,
  "ingredients": ["500g bánh phở", "1kg xương bò", "..."],
  "description": "Bước 1: ...\nBước 2: ...",
  "favorite": false,
  "image": "https://..."
}
```

`difficulty`: `"easy"` | `"medium"` | `"hard"`

## API

Tạo mockapi.io với resource `recipes` rồi thay `API_URL` trong `src/services/recipeApi.js`.

## Nộp bài

Nén thư mục (KHÔNG kèm `node_modules`) thành `<MSSV>_<HoTen>.zip` và nộp lên LMS.
