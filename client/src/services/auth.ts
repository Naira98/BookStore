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
