import axios from 'axios'

export const API_URL = 'https://6a0660aec83ba8ad9b3d6969.mockapi.io/recipes'

// TODO (Câu 2): Viết hàm GET danh sách công thức bằng axios
export async function getRecipes() {
  const res = await axios.get(API_URL)
  return res.data
}

// TODO (Câu 5): Viết hàm GET chi tiết công thức theo id
export async function getRecipeById(id) {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

// TODO (Câu 7): Viết hàm POST thêm công thức mới
export async function addRecipe(recipe) {
  const res = await axios.post(API_URL, recipe)
  return res.data
}

// TODO (Câu 8): Viết hàm DELETE công thức theo id
export async function deleteRecipe(id) {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}

// TODO (Câu 8): Viết hàm PUT cập nhật trạng thái yêu thích (favorite: boolean)
export async function toggleFavorite(id, favorite) {
  const res = await axios.put(`${API_URL}/${id}`, { favorite })
  return res.data
}
