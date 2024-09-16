import { Dispatch } from "redux";
import { apiReq } from "./apiReq";
import { setBooks } from "../redux/authSlice";

export const getBooksApi = async (dispatch: Dispatch) => {
  try {
    const res = await apiReq(
      "GET",
      `/users/`,
      { "Content-Type": "application/json" },
      undefined,
    );
    const data = await res.json();
    if (res.ok) {
      dispatch(setBooks(data));
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getBookApi = async (bookId: string) => {
  try {
    const res = await apiReq(
      "GET",
      `/users/${bookId}`,
      { "Content-Type": "application/json" },
      undefined,
    );
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addMoneyApi = async (amount: string) => {
  try {
    console.log('in addMoney Api')
    const res = await apiReq(
      "GET",
      `/users/createCheckoutSession/${amount}`,
      { "Content-Type": "application/json" },
      undefined,
    );
    const data = await res.json();
    console.log(res)
    console.log(data)
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
