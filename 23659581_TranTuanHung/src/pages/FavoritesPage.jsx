import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { recipesState } from '../store/atoms'
import RecipeCard from '../components/RecipeCard'

function FavoritesPage() {
  const [recipes, setRecipes] = useRecoilState(recipesState)
  const navigate = useNavigate()

  // TODO (Câu 6): Dùng useMemo lọc ra các công thức có favorite === true.
  const favorites = useMemo(() => {
    return (recipes || []).filter((r) => r.favorite === true)
  }, [recipes])

  // (Hàm xóa đã được viết sẵn để SV không phải làm lại)
  const handleDelete = (id) => {
    if (!window.confirm('Xác nhận xóa?')) return
    setRecipes((prev) => prev.filter(r => r.id !== id))
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>❤️ Công thức yêu thích</h2>

      {favorites.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          Bạn chưa có công thức yêu thích nào. Vào trang chi tiết và bấm "❤ Thêm vào yêu thích" nhé!
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onView={() => navigate(`/recipes/${recipe.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
