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

export interface IBorrowModel {
  _id: string;
  book: IBookModel;
  user: string;
  regularPrice: number;
  deposit: number;
  status: string;
  borrowingDate: Date;
  returnDate: Date;
}

// export interface Tokens {
//   accessToken: string;
//   refreshToken: string;
// }

export interface ReduxState {
  user: IUserModel | null;
  isAuth: boolean;
}
const initialState: ReduxState = {
  user: null,
  isAuth: false,
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
  },
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
