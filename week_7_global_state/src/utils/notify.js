import { notificationsState } from '../atoms/notificationsState';
import { snapshot_UNSTABLE } from 'recoil';

// helper to push a notification from anywhere: use setRecoil in component via useSetRecoilState
// but for convenience provide a function that accepts a setter. Simple approach: export a factory.

export function notifyFactory(setNotifications) {
  return function notify(message, type = 'info') {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, message, type }]);
  }
}
