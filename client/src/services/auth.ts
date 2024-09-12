import { NavigateFunction } from "react-router-dom";
import { RegisterFormType } from "../components/RegisterForm";
import { apiReq } from "./apiReq";
import { Dispatch } from "redux";
import { setLogin } from "../redux/authSlice";

export const loginApi = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // {user: {}, tokens: {}}
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const registerApi = async (values: RegisterFormType) => {
  try {
    const formData = new FormData();

    for (const key in values) {
      const value = values[key as keyof RegisterFormType];
      if (value !== null) formData.append(key, value);
    }

    // for (const pair of formData.entries()) {
    //     console.log(pair[0] + ", " + pair[1]);
    //   }

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserApi = async (
  navigate: NavigateFunction,
  dispatch: Dispatch
) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const res = await apiReq(
        "GET",
        `/auth/user`,
        { "Content-Type": "application/json" },
        undefined
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(setLogin(data.user));
        return data;
      } else {
        throw new Error(data.message);
      }
    } else {
      navigate("/login");
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logoutApi = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const res = await apiReq(
        "POST",
        `/auth/logout`,
        { "Content-Type": "application/json" },
        undefined
      );
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
