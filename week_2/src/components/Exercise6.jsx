import { useEffect } from 'react';
import { useReducer } from 'react';

const initialState = {
  status: 'idle', // idle | loading | success | error
  users: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', users: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

function Exercise6() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      // Sử dụng API mẫu
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  // Tự động fetch khi lần đầu vào
  useEffect(() => {
    if (state.status === 'idle') fetchUsers();
    // eslint-disable-next-line
  }, [state.status]);

  return (
    <div style={{ maxWidth: 500, margin: '32px auto', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #0002', background: '#fff' }}>
      <h2>Fetch Users State Machine</h2>
      {state.status === 'idle' && <div>Chờ bắt đầu...</div>}
      {state.status === 'loading' && <div>Đang tải dữ liệu...</div>}
      {state.status === 'error' && (
        <div style={{ color: 'red' }}>
          Lỗi: {state.error}
          <br />
          <button onClick={fetchUsers} style={{ marginTop: 8 }}>Retry</button>
        </div>
      )}
      {state.status === 'success' && (
        <div>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {state.users.map(u => (
              <li key={u.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                <b>{u.name}</b> <span style={{ color: '#888' }}>({u.email})</span>
              </li>
            ))}
          </ul>
          <button onClick={fetchUsers} style={{ marginTop: 8 }}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default Exercise6;