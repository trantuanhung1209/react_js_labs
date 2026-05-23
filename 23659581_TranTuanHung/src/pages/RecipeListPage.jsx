import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { recipesState, difficultyFilterState } from '../store/atoms'
import { getRecipes, deleteRecipe } from '../services/recipeApi'
import { useFetch } from '../hooks/useFetch'
import RecipeCard from '../components/RecipeCard'
import SearchBox from '../components/SearchBox'

function RecipeListPage() {
  const [recipes, setRecipes] = useRecoilState(recipesState)
  const [difficulty, setDifficulty] = useRecoilState(difficultyFilterState)
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  // TODO (Câu 2 + Câu 4): Dùng custom hook useFetch để fetch danh sách công thức
  //   - Gợi ý: const { data, loading, error } = useFetch(getRecipes)
  //   - Sau khi có data, cần đồng bộ vào Recoil recipesState bằng useEffect
  //     để các trang khác (Home, Favorites) cũng có dữ liệu.
  const { data, loading, error } = useFetch(getRecipes)

  useEffect(() => {
    if (data !== null) setRecipes(data)
  }, [data, setRecipes])

  // TODO (Câu 6): Lọc danh sách công thức hiển thị theo:
  //   - difficulty ('all' | 'easy' | 'medium' | 'hard')
  //   - keyword: tìm theo tên (title), không phân biệt hoa thường
  const normalizedKeyword = keyword.trim().toLowerCase()
  const displayedRecipes = (recipes || []).filter((recipe) => {
    const matchesDifficulty = difficulty === 'all' || recipe.difficulty === difficulty
    const matchesKeyword =
      normalizedKeyword === '' || (recipe.title || '').toLowerCase().includes(normalizedKeyword)
    return matchesDifficulty && matchesKeyword
  })

  // TODO (Câu 8): Viết handleDelete dùng useCallback
  //   - window.confirm trước khi xóa
  //   - Gọi deleteRecipe(id)
  //   - Cập nhật recipesState (loại bỏ công thức đã xóa)
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Xác nhận xóa?')) return
    await deleteRecipe(id)
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
  }, [setRecipes])

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>📖 Tất cả công thức</h2>

      <div className="filter-bar">
        <SearchBox value={keyword} onChange={setKeyword} />

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="all">Tất cả độ khó</option>
          <option value="easy">Dễ</option>
          <option value="medium">Trung bình</option>
          <option value="hard">Khó</option>
        </select>
      </div>

      {loading && <p>⏳ Đang tải công thức...</p>}
      {error && <p className="error-text">⚠ Lỗi khi tải dữ liệu</p>}

      {!loading && displayedRecipes.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          Không có công thức nào phù hợp 🍽️
        </div>
      )}

      {!loading && displayedRecipes.length > 0 && (
        <div className="recipe-grid">
          {displayedRecipes.map((recipe) => (
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

export default RecipeListPage
