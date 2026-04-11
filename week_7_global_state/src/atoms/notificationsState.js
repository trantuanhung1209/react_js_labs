import { atom } from 'recoil';

export const notificationsState = atom({
  key: 'notificationsState',
  default: [], // { id, message, type }
});
