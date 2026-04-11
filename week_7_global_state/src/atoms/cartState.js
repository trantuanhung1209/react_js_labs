import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState',
  default: [], // each item: { id, title, price, quantity, image }
});
