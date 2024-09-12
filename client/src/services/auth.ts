import { RegisterFormType } from "../components/RegisterForm";

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
