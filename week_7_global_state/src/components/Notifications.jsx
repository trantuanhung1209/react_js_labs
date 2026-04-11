import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { notificationsState } from '../atoms/notificationsState';

function Notifications() {
  const [notes, setNotes] = useRecoilState(notificationsState);

  useEffect(() => {
    if (notes.length === 0) return;
    const timers = notes.map(n => {
      return setTimeout(() => {
        setNotes(prev => prev.filter(p => p.id !== n.id));
      }, 3000);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [notes, setNotes]);

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      {notes.map(n => (
        <div key={n.id} style={{ marginBottom: 8, padding: '8px 12px', background: n.type === 'error' ? '#f44336' : '#323232', color: '#fff', borderRadius: 4 }}>
          {n.message}
        </div>
      ))}
    </div>
  )
}

export default Notifications;
