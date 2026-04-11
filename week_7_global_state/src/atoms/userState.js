import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {
        keyword: '',
        searchResults: [],
        allUsers: [],
        loading: false,
        error: null,
    }
});