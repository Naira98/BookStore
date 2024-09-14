import { createSlice } from "@reduxjs/toolkit";

export interface IUserModel {
  firstName: string;
  lastName: string;
  phone: string;
  wallet: number;
  picture: string;
  type: string;
}

export interface IBookModel {
  _id: string;
  title: string;
  copies: number;
  availableCopies: number;
  regularPrice: number;
  deposit: number;
  poster: string;
  author: string;
  description: string;
}

// export interface Tokens {
//   accessToken: string;
//   refreshToken: string;
// }

export interface ReduxState {
  user: IUserModel | null;
  isAuth: boolean;
  books: IBookModel[] | null;
}
const initialState: ReduxState = {
  user: null,
  isAuth: false,
  books: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      // payload = {fullName, email, ...}
      state.user = action.payload;
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setLogin, setLogout, setBooks } = authSlice.actions;
export default authSlice.reducer;
