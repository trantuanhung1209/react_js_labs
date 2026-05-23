import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { getRecipeById, toggleFavorite } from '../services/recipeApi'
import { recipesState } from '../store/atoms'

function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useRecoilState(recipesState)

  // TODO (Câu 5): Dùng useEffect để gọi getRecipeById(id), lưu kết quả vào state
  //   - Có xử lý loading
  //   - Khi id đổi thì fetch lại
  useEffect(() => {
    let active = true

    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const data = await getRecipeById(id)
        if (active) setRecipe(data)
      } catch {
        if (active) setRecipe(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    if (id) fetchRecipe()
    return () => {
      active = false
    }
  }, [id])

  // TODO (Câu 8): handleToggleFavorite:
  //   - Gọi toggleFavorite(id, newValue) (newValue ngược lại với recipe.favorite hiện tại)
  //   - Cập nhật state `recipe` (đảo favorite)
  //   - Cập nhật Recoil recipesState để danh sách ngoài kia đồng bộ
  const handleToggleFavorite = async () => {
    if (!recipe) return
    const newValue = !recipe.favorite
    await toggleFavorite(id, newValue)
    setRecipe((prev) => (prev ? { ...prev, favorite: newValue } : prev))
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipe.id ? { ...r, favorite: newValue } : r))
    )
  }

  if (loading) return <p>⏳ Đang tải...</p>
  if (!recipe) return <p>Không tìm thấy công thức</p>

  return (
    <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Quay lại</button>

      <h2 style={{ marginTop: 20 }}>{recipe.title}</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>
        ⏱ {recipe.cookTime} phút  •  🍽 {recipe.servings} người  •  Độ khó: {recipe.difficulty}
      </p>

      <button
        className="btn btn-primary"
        style={{ marginTop: 14 }}
        onClick={handleToggleFavorite}
      >
        {recipe.favorite ? '💔 Bỏ yêu thích' : '❤ Thêm vào yêu thích'}
      </button>

      <h3 style={{ marginTop: 24 }}>🥬 Nguyên liệu</h3>
      <ul className="ingredient-list">
        {(recipe.ingredients || []).map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>

      <h3 style={{ marginTop: 24 }}>👨‍🍳 Cách làm</h3>
      <p style={{ lineHeight: 1.7, marginTop: 8, whiteSpace: 'pre-wrap' }}>
        {recipe.description || 'Chưa có hướng dẫn.'}
      </p>
    </div>
  )
}

export default RecipeDetailPage
