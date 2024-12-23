import { generateUserData } from "./generateUser";
import { postReqFormData, postReqJson } from "./testReq";

export const login = async (email: string, password: string) => {
  const loginRes = await postReqJson("/auth/login", undefined, {
    email: email,
    password: password,
  });
  return loginRes.body.tokens.accessToken;
};

export const loginWithUser = async (email?: string, password?: string) => {
  const userData = generateUserData();
  await postReqFormData("/auth/register", userData, "profile_test");
  return await login(email || userData.email, password || userData.password);
};

export const loginWithSuperAdmin = async () => {
  return await login("super@admin.com", "super-admin");
};
