# Jest & React Testing Library Guide

Hướng dẫn test component React bằng Jest và React Testing Library (RTL).

## 📦 Setup đã hoàn thành

Các file cấu hình đã được tạo:
- `jest.config.js` - Cấu hình chính của Jest
- `jest.setup.js` - Setup file (mock fetch, window.matchMedia, etc.)
- `babel.config.js` - Cấu hình Babel cho Jest
- `UserPostsMemo.test.jsx` - Test file mẫu với 26 test cases

## 🚀 Chạy Tests

### Chạy tất cả tests
```bash
npm test
```

### Chạy test file cụ thể
```bash
npm test -- UserPostsMemo.test.jsx
```

### Chạy tests ở chế độ watch (tự động chạy lại khi code thay đổi)
```bash
npm run test:watch
```

### Kiểm tra code coverage
```bash
npm run test:coverage
```

## 📝 Cấu trúc Test

Mỗi test file nên:
1. **Import các thư viện cần thiết**
   ```jsx
   import { render, screen, fireEvent, waitFor } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```

2. **Mocking dữ liệu**
   - Tạo mock data gần giống dữ liệu thực tế
   - Mock fetch requests bằng `global.fetch.mockResolvedValueOnce()`

3. **Organize tests bằng describe blocks**
   ```jsx
   describe('Component Name', () => {
     describe('Feature Area', () => {
       test('should do something', () => {
         // test logic
       });
     });
   });
   ```

## 🎯 Test Cases trong UserPostsMemo.test.jsx

### 1. **Rendering & Loading Tests** (5 tests)
- Kiểm tra loading state ban đầu
- Render component và các UI elements
- Kiểm tra sự hiện diện của input, button, etc.

### 2. **Data Fetching Tests** (5 tests)
- Verify fetch được gọi đúng
- Display posts sau khi fetch
- Handle fetch errors
- Handle network errors
- Handle single post object response

### 3. **Search Functionality Tests** (4 tests)
- Filter theo search term
- Case insensitive search
- Clear search và show all posts
- Handle whitespace trong search

### 4. **Filter Functionality Tests** (3 tests)
- Populate filter options
- Filter posts theo user ID
- Show all posts khi filter = "all"

### 5. **Combined Search + Filter Tests** (2 tests)
- Filter bởi cả search và user ID
- Show result khi tiêu chí không match

### 6. **Refetch Button Tests** (2 tests)
- Refetch data khi click button
- Show loading state khi refetch

### 7. **UI Elements Tests** (2 tests)
- Check styling
- Display post content correctly

### 8. **Edge Cases Tests** (3 tests)
- Handle empty posts array
- Handle posts with same userId
- Handle special characters

## 🛠️ Key Testing Patterns

### Waiting for Async Operations
```jsx
await waitFor(() => {
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Fire Events
```jsx
fireEvent.change(element, { target: { value: 'new value' } });
fireEvent.click(button);
```

### User Events (Preferred for realistic interactions)
```jsx
await userEvent.type(input, 'text');
await userEvent.clear(input);
```

### Query Methods
```jsx
// Get - throws if not found
screen.getByText('Text')
screen.getByDisplayValue('value')
screen.getByRole('button', { name: /name/i })

// Query - returns null if not found
screen.queryByText('Text')

// Find - async, waits for element
await screen.findByText('Text')

// Get All
screen.getAllByText('Text')
```

## 📊 Mocking Fetch

```jsx
// Success
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => mockData,
});

// Error
global.fetch.mockResolvedValueOnce({
  ok: false,
});

// Network Error
global.fetch.mockRejectedValueOnce(new Error('Network error'));

// Clear mocks
global.fetch.mockClear();
```

## ✅ Best Practices

1. **Test behavior, not implementation**
   - ❌ Test that setState was called
   - ✅ Test that button click changes the DOM

2. **Use user-centric queries**
   - ✅ screen.getByRole('button', { name: /click me/i })
   - ❌ container.querySelector('.my-button')

3. **Wait for async updates**
   - ✅ await waitFor(() => { expect(...).toBeInTheDocument() })
   - ❌ Direct assertions after sync operations

4. **Keep tests focused**
   - Test một behavior per test
   - Use descriptive test names

5. **Mock external dependencies**
   - Mock API calls
   - Mock browser APIs (fetch, localStorage, etc.)

## 🔍 Tips for Debugging Tests

### Print DOM to console
```jsx
const { debug } = render(<Component />);
debug(); // Prints current DOM
```

### Use screen.logTestingPlaygroundURL
```jsx
import { screen } from '@testing-library/react';
screen.logTestingPlaygroundURL();
```

### Run single test
```bash
npm test -- --testNamePattern="test name"
```

### Watch mode + verbose
```bash
npm run test:watch -- --verbose
```

## 📚 Tài liệu tham khảo

- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Docs](https://jestjs.io/)
- [Testing Playground](https://testing-playground.com/)

## ✍️ Tạo Test File Mới

Template cơ bản cho test file mới:

```jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

// Mock dữ liệu
const mockData = {
  // ...
};

describe('MyComponent', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  test('should render correctly', () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  test('should handle user interaction', async () => {
    render(<MyComponent />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/new text/i)).toBeInTheDocument();
    });
  });
});
```

---

**Status**: ✅ All 26 tests passing
**Next Step**: Tạo test files cho các component khác hoặc chạy coverage report!
