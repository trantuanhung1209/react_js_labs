import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { recipesState } from '../store/atoms'
import { addRecipe } from '../services/recipeApi'

// TODO (Câu 7): Hoàn thiện reducer cho form thêm công thức.
// State gồm:
//   - title, difficulty, cookTime, servings
//   - ingredients: mảng các chuỗi (vd: ['200g thịt bò', '2 củ hành tây'])
//   - description
//   - error
//
// Action cần xử lý:
//   - { type: 'SET_FIELD', field, value }            -> cập nhật 1 trường thường
//   - { type: 'ADD_INGREDIENT' }                     -> thêm 1 chuỗi rỗng vào cuối mảng ingredients
//   - { type: 'UPDATE_INGREDIENT', index, value }    -> cập nhật ingredient tại vị trí index
//   - { type: 'REMOVE_INGREDIENT', index }           -> xóa ingredient tại vị trí index
//   - { type: 'SET_ERROR', error }                   -> gán error
//   - { type: 'RESET' }                              -> reset về initialState

const initialState = {
  title: '',
  difficulty: 'easy',
  cookTime: '',
  servings: '',
  ingredients: [''],
  description: '',
  error: '',
}

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, error: '' }
    case 'ADD_INGREDIENT':
      return { ...state, ingredients: [...state.ingredients, ''], error: '' }
    case 'UPDATE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.map((ing, idx) =>
          idx === action.index ? action.value : ing
        ),
      }
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter((_, idx) => idx !== action.index),
      }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function AddRecipePage() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const setRecipes = useSetRecoilState(recipesState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value })
  }

  // TODO (Câu 7): handleSubmit phải:
  //   1. Validate:
  //       - title không rỗng
  //       - cookTime > 0
  //       - servings > 0
  //       - Mảng ingredients phải có ít nhất 1 dòng KHÔNG rỗng (sau khi trim)
  //      Sai -> dispatch SET_ERROR và dừng.
  //   2. Chuẩn hóa: lọc bỏ ingredient rỗng (trim() === '')
  //   3. Gọi addRecipe(payload), cập nhật recipesState (thêm vào danh sách)
  //   4. dispatch RESET, navigate('/recipes')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = state.title.trim()
    const cookTime = Number(state.cookTime)
    const servings = Number(state.servings)
    const cleanedIngredients = state.ingredients
      .map((ing) => ing.trim())
      .filter((ing) => ing !== '')

    if (!title || cookTime <= 0 || servings <= 0 || cleanedIngredients.length === 0) {
      dispatch({ type: 'SET_ERROR', error: 'Vui lòng nhập đầy đủ thông tin hợp lệ.' })
      return
    }

    const payload = {
      title,
      difficulty: state.difficulty,
      cookTime,
      servings,
      ingredients: cleanedIngredients,
      description: state.description,
      favorite: false,
    }

    const created = await addRecipe(payload)
    setRecipes((prev) => [...prev, created])
    dispatch({ type: 'RESET' })
    navigate('/recipes')
  }

  return (
    <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 16 }}>➕ Thêm công thức mới</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên món *</label>
          <input name="title" value={state.title} onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Độ khó</label>
            <select name="difficulty" value={state.difficulty} onChange={handleChange}>
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Thời gian (phút) *</label>
            <input type="number" name="cookTime" value={state.cookTime} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Khẩu phần *</label>
            <input type="number" name="servings" value={state.servings} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Nguyên liệu *</label>
          {state.ingredients.map((ing, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input
                value={ing}
                placeholder={`Nguyên liệu ${idx + 1}`}
                onChange={(e) => dispatch({ type: 'UPDATE_INGREDIENT', index: idx, value: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch({ type: 'REMOVE_INGREDIENT', index: idx })}
              >−</button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => dispatch({ type: 'ADD_INGREDIENT' })}
          >+ Thêm nguyên liệu</button>
        </div>

        <div className="form-group">
          <label>Cách làm</label>
          <textarea name="description" value={state.description} onChange={handleChange} />
        </div>

        {state.error && <p className="error-text">⚠ {state.error}</p>}

        <button type="submit" className="btn btn-success">Lưu công thức</button>
        <button type="button" className="btn btn-ghost" onClick={() => dispatch({ type: 'RESET' })}>
          Làm mới
        </button>
      </form>
    </div>
  )
}

export default AddRecipePage
