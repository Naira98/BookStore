import { UploadApiResponse } from "cloudinary";

const cloudinary: typeof import("cloudinary") =
  jest.createMockFromModule("cloudinary");

const upload: typeof cloudinary.v2.uploader.upload =
  async (): Promise<UploadApiResponse> => {
    return {
      url: "https://example.org/path/to/image.png",
      public_id: "1234567890",
    } as UploadApiResponse;
  };

const destroy: typeof cloudinary.v2.uploader.destroy = async () => {};

(cloudinary.v2.uploader.upload as jest.Mock).mockImplementation(upload);
(cloudinary.v2.uploader.destroy as jest.Mock).mockImplementation(destroy);

module.exports = cloudinary;
