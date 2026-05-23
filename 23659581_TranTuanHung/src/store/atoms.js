import { atom } from 'recoil'

// Các atom đã được khai báo SẴN giúp SV.
// Câu 3 yêu cầu SV PHẢI import và SỬ DỤNG ĐÚNG các atom này trong các trang
// thông qua useRecoilState / useRecoilValue / useSetRecoilState.

export const recipesState = atom({
  key: 'recipesState',
  default: [],
})

export const userState = atom({
  key: 'userState',
  default: null,
})

// Bộ lọc theo độ khó: 'all' | 'easy' | 'medium' | 'hard'
export const difficultyFilterState = atom({
  key: 'difficultyFilterState',
  default: 'all',
})
