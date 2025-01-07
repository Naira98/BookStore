import { faker } from "@faker-js/faker/.";
import { generateBookData, BookTestImg } from "./generateBook";
import {
  deleteReq,
  patchReqFormData,
  patchReqJson,
  postReqFormData,
} from "./testReq";
import { login, loginWithSuperAdmin, loginWithUser } from "./loginUsers";
import { generateUserData } from "./generateUser";
import { IBook } from "../types/db_types";

describe("Admins", () => {
  let superAdminAccessToken: string;
  let userAccessToken: string;
  let adminAccessToken: string;
  let courierAccessToken: string;
  let book_id: number;
  let returnedBook: IBook
  const bookData = generateBookData();

  beforeAll(async () => {
    const [superAdmin, user] = await Promise.all([
      loginWithSuperAdmin(),
      loginWithUser(),
    ]);
    superAdminAccessToken = superAdmin;
    userAccessToken = user;
  });

  describe("Add Employee", () => {
    const adminData = generateUserData();
    const courierData = generateUserData(false);
    it("should return 201 with super admin when send admin data", async () => {
      const res = await postReqFormData(
        "/admins/addEmployee",
        { ...adminData, role: "admin" },
        "test_img",
        superAdminAccessToken
      );
      expect(res.status).toBe(201);
      expect(res.body.role).toEqual("admin");
      expect(res.body.cloudinary_public_id).toBeTruthy();

      adminAccessToken = await login(adminData.email, adminData.password);
    });
    it("should return 201 with super admin when send courier data", async () => {
      const res = await postReqFormData(
        "/admins/addEmployee",
        { ...courierData, role: "courier" },
        "test_img",
        superAdminAccessToken
      );
      expect(res.status).toBe(201);
      expect(res.body.role).toEqual("courier");
      expect(res.body.cloudinary_public_id).toBeFalsy();

      courierAccessToken = await login(courierData.email, courierData.password);
    });
    it("should return 403 when send data by admin", async () => {
      const res = await postReqFormData(
        "/admins/addEmployee",
        { ...adminData, role: "courier" },
        "test_img",
        adminAccessToken
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });
  });

  describe("Add Book", () => {
    it("should return 401 without access token", async () => {
      const res = await postReqFormData("/admins/addBook", bookData);
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/access declined/i);
    });

    it("should return 403 with wrong access token", async () => {
      const res = await postReqFormData(
        "/admins/addBook",
        bookData,
        "book_test",
        faker.string.alpha(50)
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/invalid access token/i);
    });

    it("should return 403 with user access token", async () => {
      const res = await postReqFormData(
        "/admins/addBook",
        bookData,
        "book_test",
        userAccessToken
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });

    it("should return 201 and book_id when use correct data", async () => {
      const res = await postReqFormData(
        "/admins/addBook",
        bookData,
        "book_test",
        superAdminAccessToken
      );
      expect(res.status).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.cloudinary_public_id).toBeTruthy();
      book_id = res.body.id;
      returnedBook = res.body;
    });
  });

  describe("Update Book", () => {
    it("should return 403 with courier access token", async () => {
      const res = await patchReqFormData(
        `/admins/book/${book_id}`,
        {
          title: faker.book.title(),
        },
        undefined,
        courierAccessToken
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });

    it("should return 200 with admin access token when updated book without new photo", async () => {
      const res = await patchReqFormData(
        `/admins/book/${book_id}`,
        {
          title: faker.book.title(),
          publish_year: faker.number.int({ min: 1950, max: 2025 }).toString(),
        },
        undefined,
        adminAccessToken
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(book_id);
      expect(res.body.title).not.toEqual(bookData.title);
      expect(res.body.publish_year).not.toEqual(bookData.publish_year);
      expect(res.body.description).toEqual(bookData.description);
      expect(res.body.cloudinary_public_id).toEqual(
        returnedBook.cloudinary_public_id
      );
    });
    it("should return 200 with super admin access token when updated book with new photo", async () => {
      const res = await patchReqFormData(
        `/admins/book/${book_id}`,
        {
          picture: BookTestImg,
        },
        "test_img",
        superAdminAccessToken
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(book_id);
      expect(res.body.cloudinary_public_id).not.toEqual(
        returnedBook.cloudinary_public_id
      );
      returnedBook.cloudinary_public_id = res.body.cloudinary_public_id;
    });
  });
  describe("Update Author", () => {
    it("should return 403 with user access token", async () => {
      const res = await patchReqJson(
        `/admins/book/author/${book_id}`,
        userAccessToken,
        {
          author: faker.book.author(),
        }
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });
    it("should return 200 with admin access token", async () => {
      const res = await patchReqJson(
        `/admins/book/author/${book_id}`,
        adminAccessToken,
        {
          author: faker.book.author(),
        }
      );
      expect(res.status).toBe(200);
      expect(res.body.author_id).not.toEqual(returnedBook.author_id);
    });
  });
  describe("Update Category", () => {
    it("should return 403 with courier access token", async () => {
      const res = await patchReqJson(
        `/admins/book/category/${book_id}`,
        courierAccessToken,
        {
          author: faker.book.genre(),
        }
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });
    it("should return 200 with admin access token", async () => {
      const res = await patchReqJson(
        `/admins/book/category/${book_id}`,
        adminAccessToken,
        {
          category: faker.book.genre(),
        }
      );
      expect(res.status).toBe(200);
      expect(res.body.category_id).not.toEqual(returnedBook.category_id);
    });
  });
  describe("Update Settings", () => {
    it("should return 403 with admin access token", async () => {
      const res = await patchReqJson(
        "/admins/updateSettings",
        adminAccessToken,
        { borrow_days: 14 }
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });
  });
  describe("Delete Book", () => {
    it("should return 403 with user access token", async () => {
      console.log({book_id})
      const res = await deleteReq(
        `/admins/${book_id}`,
        userAccessToken
      );
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/forbidden/i);
    });
    it("should return 200 with admin access token", async () => {
      const res = await deleteReq(
        `/admins/${book_id}`,
        adminAccessToken
      );
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/book deleted successfully/i);
    });
  });
});
