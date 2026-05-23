import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { recipesState } from '../store/atoms'

function HomePage() {
  const recipes = useRecoilValue(recipesState)

  // TODO (Câu 6): Dùng useMemo để tính:
  //   - total       : tổng số công thức
  //   - easy        : số công thức độ khó 'easy'
  //   - medium      : số công thức độ khó 'medium'
  //   - hard        : số công thức độ khó 'hard'
  //   - favoriteCount : số công thức có favorite === true
  //   - avgCookTime : thời gian nấu trung bình (làm tròn nguyên), 0 nếu chưa có công thức nào
  // useMemo giúp tránh tính lại stats khi recipes không đổi; nếu không có, mỗi render sẽ tính lại.
  const stats = useMemo(() => {
    const list = recipes || []
    const total = list.length
    const easy = list.filter((r) => r.difficulty === 'easy').length
    const medium = list.filter((r) => r.difficulty === 'medium').length
    const hard = list.filter((r) => r.difficulty === 'hard').length
    const favoriteCount = list.filter((r) => r.favorite === true).length
    const totalCookTime = list.reduce((sum, r) => sum + Number(r.cookTime || 0), 0)
    const avgCookTime = total === 0 ? 0 : Math.round(totalCookTime / total)

    return { total, easy, medium, hard, favoriteCount, avgCookTime }
  }, [recipes])

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>👨‍🍳 Sổ tay công thức của tôi</h2>

      <div className="stats">
        <div className="stat-box">
          <div className="num">{stats.total}</div>
          <div className="label">Tổng công thức</div>
        </div>
        <div className="stat-box">
          <div className="num" style={{ color: '#16a34a' }}>{stats.easy}</div>
          <div className="label">Dễ</div>
        </div>
        <div className="stat-box">
          <div className="num" style={{ color: '#f59e0b' }}>{stats.medium}</div>
          <div className="label">Trung bình</div>
        </div>
        <div className="stat-box">
          <div className="num" style={{ color: '#dc2626' }}>{stats.hard}</div>
          <div className="label">Khó</div>
        </div>
      </div>

      <div className="card">
        <h3>❤️ Yêu thích: <span style={{ color: '#ec4899' }}>{stats.favoriteCount}</span> công thức</h3>
        <h3 style={{ marginTop: 10 }}>⏱ Thời gian nấu trung bình: <span style={{ color: 'var(--primary)' }}>{stats.avgCookTime}</span> phút</h3>
      </div>
    </div>
  )
}

export default HomePage
