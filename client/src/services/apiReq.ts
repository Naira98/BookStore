import { jwtDecode } from "jwt-decode";

export const apiReq = async (
  method: string,
  endpoint: string,
  headers?: { [key: string]: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken.exp) throw new Error("Error in decoding token");

      if (Date.now() >= decodedToken.exp * 1000) {
        const res = await fetch("http://localhost:3000/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        accessToken = data.accessToken;
        localStorage.setItem("accessToken", data.accessToken);
      }

      return await fetch(`http://localhost:3000/api${endpoint}`, {
        method,
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        body,
      });
    } else {
      throw new Error("You are not authenticated");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
