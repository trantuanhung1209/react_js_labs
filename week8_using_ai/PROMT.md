Bạn là Senior Frontend Engineer chuyên React.js. Hãy refactor và mở rộng giao diện onboarding modal theo hình ảnh/mô tả, nhưng phải bám sát codebase hiện có của project `week8_using_ai` (không tạo project mới).

## 1) Context dự án bắt buộc phải hiểu trước khi code
- Dự án đang dùng: React + Vite + Tailwind + React Router DOM v7.
- Routing hiện đặt ở `src/main.jsx` (đã có `<BrowserRouter>`, `<Routes>`, `<Route>`).
- `src/App.jsx` hiện là trang home chính, đã có `Navbar`, `Hero`, `SummerRecipes`, `RecipeVideos`, `EditorsPick`, `Footer`, và modal hiện tại `DiscoverModal`.
- `src/components/Navbar.jsx` đã tồn tại, KHÔNG rewrite toàn bộ nếu không cần.
- Project hiện chưa có `recoil` trong dependencies: nếu cần, thêm dependency trước khi dùng.

## 2) Mục tiêu implementation
Refactor modal onboarding để đạt kiến trúc scalable + clean code:
- Chuyển state modal từ local component state sang Recoil.
- Quản lý 2 state chính:
  - `isOpen` (boolean)
  - `currentStep` (number)
- Giữ trải nghiệm người dùng tốt trên desktop và mobile.

## 3) Tech constraints
- Framework: React Functional Components + Hooks.
- Styling: Tailwind CSS.
- Routing: giữ nguyên cấu trúc Router v7 đang có ở `src/main.jsx`.
- State management: Recoil cho onboarding state.

## 4) Design constraints (theo ảnh/mô tả)
Sử dụng các token/layout sau (có thể dùng arbitrary values):
- Colors:
  - Primary hồng Chefify: `#F04E8A`
  - Overlay: `bg-black/40` hoặc `bg-gray-900/50` + `backdrop-blur-sm`
  - Secondary text: `text-gray-500`
  - Modal surface: `bg-white`
- Typography:
  - Title "Discover Chefify": `text-2xl` hoặc `text-3xl`, `font-bold`
  - Subtitle: `text-sm`, `font-medium`, `text-center`
- Spacing/Sizing:
  - Modal: `w-full max-w-2xl`, `rounded-2xl`, `p-6` hoặc `p-8`
  - Close button: `absolute top-4 right-4`, icon `w-6 h-6`
  - Next button: `w-full py-3 rounded-xl font-semibold`
  - Skip button: `mt-4 text-sm font-semibold`
  - Pagination dots: `w-2.5 h-2.5 rounded-full gap-2`

## 5) Interaction requirements
- Click `X` hoặc `Skip` -> đóng modal qua Recoil state.
- Click `Next`:
  - Nếu chưa ở step cuối: tăng `currentStep`.
  - Nếu ở step cuối: đóng modal.
- Click outside overlay -> đóng modal.
- ESC key -> đóng modal (nếu triển khai được, nên có).

## 6) Kiến trúc file đề xuất (ưu tiên tận dụng file đang có)
Ưu tiên sửa trên file hiện tại trước, chỉ tạo file mới khi thực sự cần:
- `src/store/onboardingState.js` (mới): recoil atoms/selectors cho onboarding.
- `src/components/DiscoverModal.jsx` (refactor): dùng Recoil, tách dữ liệu slide rõ ràng.
- `src/App.jsx` (update): dùng Recoil state thay vì local `useState` cho modal.
- `src/main.jsx` (update nhẹ): bọc `RecoilRoot` ở root app.

Nếu muốn tách thêm để clean hơn, có thể thêm:
- `src/components/ui/Button.jsx`
- `src/components/modals/OnboardingModal.jsx`
Nhưng phải đảm bảo không phá vỡ flow hiện tại của app.

## 7) Coding standards
- Clean Code, naming rõ nghĩa, component nhỏ gọn.
- Chỉ comment ở các logic quan trọng (outside click, step transition, close behavior).
- Hạn chế hard-code lặp lại; dùng constants/array cho slides.
- Không thay đổi những phần không liên quan tới onboarding.

## 8) Output mong muốn từ bạn
Khi trả lời, hãy cung cấp:
1. Danh sách file đã sửa/tạo.
2. Code hoàn chỉnh cho từng file thay đổi.
3. Ghi chú ngắn về các quyết định kỹ thuật (vì sao chọn cách tổ chức state/component).
4. Các lệnh cần chạy (nếu có), ví dụ: cài `recoil`.