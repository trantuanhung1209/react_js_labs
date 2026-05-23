import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  // Code mặc định tối thiểu để app chạy được. SV cần NÂNG CẤP hàm này theo yêu cầu Câu 4.
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' ? 'dark' : 'light'
  })

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // TODO (Câu 4 - phần B): NÂNG CẤP ThemeProvider để đạt yêu cầu sau:
  //   1. Khởi tạo `theme` ban đầu LẤY TỪ localStorage (key 'theme'); nếu chưa có thì dùng 'light'.
  //      Gợi ý: dùng dạng useState(() => { ... }) để chỉ đọc 1 lần khi mount.
  //   2. Mỗi khi `theme` thay đổi:
  //        - Lưu lại vào localStorage (key 'theme').
  //        - Cập nhật class trên document.body:
  //            'light' -> xóa class 'dark'
  //            'dark'  -> thêm class 'dark'
  //      Gợi ý: dùng useEffect phụ thuộc [theme].
  //
  // Lưu ý: GIỮ NGUYÊN tên { theme, toggleTheme } trong value của Provider.

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook tiện dụng đã viết sẵn cho SV
export function useTheme() {
  return useContext(ThemeContext)
}
