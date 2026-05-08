import { useRef, useEffect } from 'react'

// TODO (Câu 1): SV dùng useRef để:
//   - Tự động focus vào ô input khi component mount
function SearchBox({ value, onChange }) {
  const inputRef = useRef(null)

  // TODO: useEffect + inputRef để focus khi mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="🔍 Tìm theo tên sách..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ flex: 1 }}
    />
  )
}

export default SearchBox
