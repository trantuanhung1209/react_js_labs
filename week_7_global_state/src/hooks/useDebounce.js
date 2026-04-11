import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt timer để cập nhật debouncedValue sau delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Xóa timer nếu value thay đổi trước khi delay kết thúc
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
