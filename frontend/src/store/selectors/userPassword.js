import { userState } from "../atoms/UserState";
import { selector } from "recoil";
export const userEmailState = selector({
    key: 'userEmailState',
    get: ({get}) => {
      const state = get(userState);
      return state.password;
    },
  });