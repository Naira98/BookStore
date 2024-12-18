import { v2 as cloudinary } from "cloudinary";
import config from "./config";

cloudinary.config({
  cloud_name: config.cloudinay.cloud_name,
  api_key: config.cloudinay.api_key,
  api_secret: config.cloudinay.api_secret,
});

export async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
