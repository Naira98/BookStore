import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

const testImgPath = path.join(__dirname, "..", "assets", "profile_img.jpeg");
const testImg = fs.readFileSync(testImgPath);

export function generateUserData() {
  return {
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: "+2011111111",
    picture: testImg,
  };
}
