import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

const testImgPath = path.join(__dirname, "..", "assets", "book_img.jpg");
export const BookTestImg = fs.readFileSync(testImgPath);

export function generateBookData() {
  return {
    title: faker.book.title(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    all_copies: faker.number.int({ min: 0, max: 20 }).toString(),
    deposit: faker.number
      .float({ min: 5, max: 100, fractionDigits: 2 })
      .toString(),
    regular_price: faker.number
      .float({ min: 5, max: 100, fractionDigits: 2 })
      .toString(),
    publish_year: faker.number.int({ min: 1950, max: 2025 }).toString(),
    author: faker.book.author(),
    category: faker.book.genre(),
    picture: BookTestImg,
  };
}
