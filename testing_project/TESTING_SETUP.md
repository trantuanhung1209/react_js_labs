# Jest & React Testing Library Setup Guide

Hướng dẫn hoàn chỉnh cài đặt và sử dụng Jest + React Testing Library để test React components.

---

## 📋 Table of Contents
1. [Cài đặt Dependencies](#cài-đặt-dependencies)
2. [Cấu hình Files](#cấu-hình-files)
3. [Package.json Scripts](#packagejson-scripts)
4. [Cấu trúc Folder](#cấu-trúc-folder)
5. [Viết Test Đầu Tiên](#viết-test-đầu-tiên)
6. [Testing Patterns](#testing-patterns)
7. [Chạy Tests](#chạy-tests)

---

## 📦 Cài đặt Dependencies

### Step 1: Cài Jest & Testing Library

```bash
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  babel-jest \
  @babel/preset-env \
  @babel/preset-react \
  jest-environment-jsdom
```

**Giải thích:**
- `jest` - Testing framework chính
- `@testing-library/react` - Utilities để test React components
- `@testing-library/jest-dom` - Custom matchers cho DOM
- `@testing-library/user-event` - Simulate user interactions
- `babel-jest` - Transform JSX/ES6 cho Jest
- `@babel/preset-env` & `@babel/preset-react` - Babel configs
- `jest-environment-jsdom` - DOM environment for tests

---

## ⚙️ Cấu hình Files

### 1. **jest.config.js** - Jest Configuration

```javascript
export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).{js,jsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

**Giải thích:**
- `testEnvironment: 'jsdom'` - Sử dụng DOM giống như browser
- `roots: ['<rootDir>/src']` - Chỉ test files trong src/
- `testMatch` - Pattern để tìm test files (*.test.js, *.spec.js)
- `transform` - Transform JSX & ES6 sang JS
- `setupFilesAfterEnv` - Chạy setup file trước mỗi test
- `moduleNameMapper` - Mock CSS imports

---

### 2. **jest.setup.js** - Setup File

```javascript
import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Clear mocks sau mỗi test
afterEach(() => {
  jest.clearAllMocks();
});
```

**Chứa:**
- Import jest-dom matchers
- Global mocks (fetch, matchMedia)
- Cleanup sau mỗi test

---

### 3. **babel.config.js** - Babel Configuration

```javascript
export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```

**Cho phép:**
- Transform JSX sang React calls
- Support modern JavaScript

---

## 📝 Package.json Scripts

Thêm vào `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**Scripts:**
- `npm test` - Chạy tất cả tests một lần
- `npm run test:watch` - Watch mode (tự động chạy lại)
- `npm run test:coverage` - Coverage report

---

## 📂 Cấu trúc Folder

```
project/
├── src/
│   ├── components/
│   │   ├── UserCard.jsx
│   │   ├── UserCard.test.jsx        ← Test file
│   │   ├── UserList.jsx
│   │   └── UserList.test.jsx        ← Test file
│   └── hooks/
│       ├── useFetchUsers.js
│       └── useFetchUsers.test.js    ← Test file
├── babel.config.js
├── jest.config.js
├── jest.setup.js
└── package.json
```

**Convention:**
- Test files cùng folder với component
- Đặt tên: `ComponentName.test.jsx`

---

## 🧪 Viết Test Đầu Tiên

### Ví dụ 1: Component Đơn Giản

**Component:** `UserCard.jsx`
```jsx
function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
export default UserCard;
```

**Test:** `UserCard.test.jsx`
```jsx
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  test('renders user name and email', () => {
    const mockUser = { name: 'John Doe', email: 'john@test.com' };
    
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
  });
});
```

---

### Ví dụ 2: Component với Fetch

**Component:** `UserList.jsx`
```jsx
import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
export default UserList;
```

**Test:** `UserList.test.jsx`
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('UserList', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  test('renders loading then users', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    });

    render(<UserList />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });
});
```

---

### Ví dụ 3: Component với Custom Hook

**Hook:** `useFetchUsers.js`
```jsx
import { useEffect, useState } from 'react';

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}
export default useFetchUsers;
```

**Component:** `UserList.jsx`
```jsx
import useFetchUsers from '../hooks/useFetchUsers';

function UserList() {
  const { users, loading } = useFetchUsers();

  if (loading) return <div>Loading...</div>;
  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
export default UserList;
```

**Test:** `UserList.test.jsx` - **QUAN TRỌNG: Mock Hook**
```jsx
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import useFetchUsers from '../hooks/useFetchUsers';

// ← BẮTBUỘC mock hook
jest.mock('../hooks/useFetchUsers');

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('UserList', () => {
  test('renders users from hook', () => {
    // Mock hook return value
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
    });

    render(<UserList />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    useFetchUsers.mockReturnValue({
      users: [],
      loading: true,
    });

    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

---

## 🎯 Testing Patterns

### Mocking Fetch

```javascript
// Success
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'value' }),
});

// Error
global.fetch.mockResolvedValueOnce({
  ok: false,
  statusText: 'Not Found',
});

// Network Error
global.fetch.mockRejectedValueOnce(new Error('Network error'));
```

### Mocking Custom Hooks

```javascript
// BẮTBUỘC ở đầu file test
jest.mock('../hooks/useMyHook');

// Trong test
useMyHook.mockReturnValue({
  data: mockData,
  loading: false,
});

// Reset mock
useMyHook.mockClear();
```

### Mocking Functions

```javascript
const mockCallback = jest.fn();

// Render with mock
render(<Component onAction={mockCallback} />);

// Verify it was called
expect(mockCallback).toHaveBeenCalled();
expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockCallback).toHaveBeenCalledTimes(1);
```

### Query Strategies (Order of Preference)

```javascript
import { render, screen } from '@testing-library/react';

// 1. getByRole (Preferred - Accessibility)
screen.getByRole('button', { name: /submit/i })

// 2. getByLabelText (Forms)
screen.getByLabelText('Email')

// 3. getByPlaceholderText
screen.getByPlaceholderText('Enter email')

// 4. getByText
screen.getByText('Exact text')

// 5. getByTestId (Last Resort)
screen.getByTestId('custom-id')

// Query variants:
// getBy* - Throws if not found, prefer for elements that must exist
// queryBy* - Returns null if not found, prefer for asserting absence
// findBy* - Async, waits for element, prefer for async operations
```

### Async Testing

```javascript
import { waitFor, screen } from '@testing-library/react';

// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Wait for specific condition
await waitFor(() => {
  expect(mockFetch).toHaveBeenCalled();
}, { timeout: 3000 });

// Using findBy (implicit wait)
const element = await screen.findByText('Async Result');
```

---

## ▶️ Chạy Tests

### Chạy Tất Cả Tests
```bash
npm test
```

### Chạy File Cụ Thể
```bash
npm test -- UserCard.test.jsx
```

### Watch Mode (Recommended Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Debug Mode
```bash
npm test -- --verbose
```

---

## ✅ Checklist Setup

- [ ] Cài đặt tất cả dependencies
- [ ] Tạo `jest.config.js`
- [ ] Tạo `jest.setup.js`
- [ ] Tạo `babel.config.js`
- [ ] Update `package.json` scripts
- [ ] Tạo first test file
- [ ] Chạy `npm test` thành công

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot find module"
**Solution:** Kiểm tra import path, chắc chắn file tồn tại

### Issue 2: "jest is not defined"
**Solution:** Kiểm tra jest.setup.js setup đúng trong jest.config.js

### Issue 3: "fetch is not defined"
**Solution:** Thêm vào jest.setup.js:
```javascript
global.fetch = jest.fn();
```

### Issue 4: "Module not mocked"
**Solution:** Thêm jest.mock() ở đầu test file:
```javascript
jest.mock('../hooks/useMyHook');
```

### Issue 5: Test timeout
**Solution:** Tăng timeout:
```javascript
jest.setTimeout(10000);
```

---

## 📚 Useful Jest Matchers

```javascript
expect(value).toBe(5);                              // Strict equality
expect(value).toEqual({ a: 1 });                    // Deep equality
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(array).toHaveLength(3);
expect(string).toMatch(/pattern/);
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith(arg);
expect(element).toBeInTheDocument();                // From jest-dom
expect(element).toHaveClass('className');           // From jest-dom
expect(input).toHaveValue('text');                 // From jest-dom
expect(element).toBeVisible();                      // From jest-dom
expect(element).toBeDisabled();                     // From jest-dom
```

---

## 📖 Tài liệu Tham Khảo

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [React Documentation - Testing](https://react.dev/learn/react-testing)

---

**Setup hoàn tất! Giờ bạn sẵn sàng test components. 🚀**
