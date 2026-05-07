import { useState } from 'react'

// TODO (Câu 4): SV hoàn thiện custom hook useLocalStorage
// Hook này đồng bộ state với localStorage theo key
// Yêu cầu:
//   - Khi khởi tạo: đọc giá trị từ localStorage, nếu không có thì dùng initialValue
//   - Khi setValue: cập nhật state và ghi vào localStorage
//   - Trả về [value, setValue] giống useState
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setStoredValue = (nextValue) => {
    const resolvedValue = typeof nextValue === 'function'
      ? nextValue(value)
      : nextValue

    setValue(resolvedValue)

    try {
      localStorage.setItem(key, JSON.stringify(resolvedValue))
    } catch (error) {
      // Ignore write errors (e.g. storage full or disabled)
    }
  }

  return [value, setStoredValue]
}
