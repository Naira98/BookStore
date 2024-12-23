import { UploadApiResponse } from "cloudinary";
import { faker } from "@faker-js/faker";

const cloudinary: typeof import("cloudinary") =
  jest.createMockFromModule("cloudinary");

const upload: typeof cloudinary.v2.uploader.upload =
  async (): Promise<UploadApiResponse> => {
    return {
      url: "https://example.org/path/to/image.png",
      public_id: faker.number.int({ min: 1000000 }).toString(),
    } as UploadApiResponse;
  };

const destroy: typeof cloudinary.v2.uploader.destroy = async () => {};

(cloudinary.v2.uploader.upload as jest.Mock).mockImplementation(upload);
(cloudinary.v2.uploader.destroy as jest.Mock).mockImplementation(destroy);

module.exports = cloudinary;
