import { deleteUsers } from "../services/auth";
import { generateUserData, profileTestImg } from "./generateUser";
import {
  getReq,
  patchReqFormData,
  postReqFormData,
  postReqJson,
} from "./testReq";
import { faker } from "@faker-js/faker";

let accessToken: string;
let refreshToken: string;
const userData = generateUserData();
let userId: number;
let cloudinary_public_id: number;

jest.useFakeTimers({ advanceTimers: true });

describe("Auth", () => {
  afterAll(async () => await deleteUsers(userId));
  describe("Register", () => {
    it("should return status 201 when register with new data", async () => {
      const res = await postReqFormData(
        "/auth/register",
        { ...userData, role: "admin" },
        "profile_test"
      );
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/you registered successfully/i);
      expect(res.body.role).toEqual("user");
      userId = res.body.id;
    });

    it("should return status 409 when register with same email", async () => {
      const res = await postReqFormData(
        "/auth/register",
        userData,
        "profile_test"
      );
      expect(res.status).toBe(409);
      expect(res.body.message).toMatch(/email already exists/i);
    });
  });
  describe("Login", () => {
    it("should return 400 when login with wrong email", async () => {
      const res = await postReqJson("/auth/login", undefined, {
        email: faker.internet.email(),
        password: userData.password,
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/bad credentials/i);
    });

    it("should return 400 when login with wrong password", async () => {
      const res = await postReqJson("/auth/login", undefined, {
        email: userData.email,
        password: faker.internet.password(),
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/bad credentials/i);
    });

    it("should return 200, user without password, access and refresh tokens when login with correct data", async () => {
      const res = await postReqJson("/auth/login", undefined, {
        email: userData.email,
        password: userData.password,
      });
      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.user.role).toEqual("user");
      expect(res.body.tokens.accessToken).toBeTruthy();
      expect(res.body.tokens.refreshToken).toBeTruthy();
      accessToken = res.body.tokens.accessToken;
      refreshToken = res.body.tokens.refreshToken;
      cloudinary_public_id = res.body.user.cloudinary_public_id;
    });
  });

  describe("Refresh Token", () => {
    it("should return 401 when use incorrect refresh token", async () => {
      jest.advanceTimersByTime(1000);
      const res = await postReqJson("/auth/refresh", undefined, {
        refreshToken: faker.string.alpha(50),
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/invalid token/i);
    });

    it("should return 200 and new access token when use correct data", async () => {
      jest.advanceTimersByTime(1000);
      const res = await postReqJson("/auth/refresh", undefined, {
        refreshToken,
      });
      expect(res.status).toBe(200);
      expect(res.body.accessToken).not.toEqual(accessToken);
      accessToken = res.body.accessToken;
    });
  });

  describe("Get User", () => {
    it("should return 401 when send without access token", async () => {
      const res = await getReq("/auth/user");
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/access declined/i);
    });

    it("should return 403 when send with wrong access token", async () => {
      const res = await getReq("/auth/user", faker.string.alpha(50));
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/invalid access token/i);
    });

    it("should return 200 and user data without password when use correct data", async () => {
      const res = await getReq("/auth/user", accessToken);
      expect(res.status).toBe(200);
      expect(res.body.user.id).toBe(userId);
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.password).toBeUndefined();
    });
  });
  describe("Update User", () => {
    const full_name = faker.person.fullName();
    it("should return 401 when send without access token", async () => {
      const res = await patchReqFormData(
        "/auth/account",
        {
          email: faker.internet.email(),
          full_name,
        },
        undefined,
        undefined
      );
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/access declined/i);
    });
    it("should return 403 when send with wrong access token", async () => {
      const res = await patchReqFormData(
        "/auth/account",
        {
          email: faker.internet.email(),
          full_name,
        },
        undefined,
        faker.string.alpha(50)
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/invalid access token/i);
    });
    it("should return 200 and can't update email, wallet and role", async () => {
      const res = await patchReqFormData(
        "/auth/account",
        {
          email: faker.internet.email(),
          full_name,
          phone: "0123456789",
          wallet: "20",
          role: "admin",
        },
        undefined,
        accessToken
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(userId);
      expect(res.body.email).toBe(userData.email);
      expect(res.body.password).toBeUndefined();
      expect(res.body.wallet).toEqual(0);
      expect(res.body.cloudinary_public_id).toEqual(cloudinary_public_id);
      expect(res.body.role).toBe("user");
      expect(res.body.full_name).toEqual(full_name);
      expect(res.body.phone).not.toEqual(userData.phone);
    });
    it("should return 200 and update picture", async () => {
      const res = await patchReqFormData(
        "/auth/account",
        {
          picture: profileTestImg,
        },
        "test_img",
        accessToken
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(userId);
      expect(res.body.password).toBeUndefined();
      expect(res.body.cloudinary_public_id).not.toEqual(cloudinary_public_id);
      cloudinary_public_id = res.body.cloudinary_public_id;
    });
  });

  describe("Logout", () => {
    it("should return 401 when send without access token", async () => {
      const res = await postReqJson("/auth/logout");
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/access declined/i);
    });

    it("should return 403 when send with wrong access token", async () => {
      const res = await postReqJson(
        "/auth/logout",
        faker.string.alpha(50),
        undefined
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/invalid access token/i);
    });
    it("should return 200 and logged out when use correct data", async () => {
      const res = await postReqJson("/auth/logout", accessToken, undefined);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/logged out!/i);
    });
  });
});
