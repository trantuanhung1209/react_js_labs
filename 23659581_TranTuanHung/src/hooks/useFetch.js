import { useState, useEffect } from 'react'

// TODO (Câu 4): Hoàn thiện custom hook useFetch
// Mục đích: gói gọn việc gọi API + quản lý trạng thái loading/error/data.
// Cách dùng:
//   const { data, loading, error, refetch } = useFetch(getRecipes)
//
// Yêu cầu:
//   - Nhận vào: fetcher (1 hàm async, ví dụ getRecipes), deps (mảng dependencies, mặc định [])
//   - State: data (mặc định null), loading (mặc định true), error (mặc định null)
//   - Khi mount (và khi deps thay đổi): set loading = true, gọi fetcher(),
//       thành công -> setData, setLoading(false)
//       thất bại  -> setError, setLoading(false)
//   - Trả về { data, loading, error, refetch }
//       refetch: hàm cho phép gọi lại fetcher để load lại dữ liệu
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
      return result
    } catch (err) {
      setError(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher()
        if (active) setData(result)
      } catch (err) {
        if (active) setError(err)
      } finally {
        if (active) setLoading(false)
      }
    }

    run()
    return () => {
      active = false
    }
  }, deps)

  return { data, loading, error, refetch }
}
