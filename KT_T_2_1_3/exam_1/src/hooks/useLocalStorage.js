import { useState, useEffect } from 'react'

// TODO (Câu 4): SV hoàn thiện custom hook useLocalStorage
// Hook này đồng bộ state với localStorage theo key
// Yêu cầu:
//   - Khi khởi tạo: đọc giá trị từ localStorage, nếu không có thì dùng initialValue
//   - Khi setValue: cập nhật state và ghi vào localStorage
//   - Trả về [value, setValue] giống useState
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) return JSON.parse(raw)
      return typeof initialValue === 'function' ? initialValue() : initialValue
    } catch (err) {
      console.error('useLocalStorage init error', err)
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  })

  useEffect(() => {
    try {
      if (state === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.error('useLocalStorage set error', err)
    }
  }, [key, state])

  return [state, setState]
}