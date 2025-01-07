import { v2 as cloudinary } from "cloudinary";
import config from "./config";
import { Request } from "express";

cloudinary.config({
  cloud_name: config.cloudinay.cloud_name,
  api_key: config.cloudinay.api_key,
  api_secret: config.cloudinay.api_secret,
});

export async function handleUploadPicture(req: Request) {
  let picture: string | null = null;
  let cloudinary_public_id: string | null = null;
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
    });
    picture = cldRes.url;
    cloudinary_public_id = cldRes.public_id;
  }
  return { picture, cloudinary_public_id };
}

export async function handleDeletePicture(
  cloudinary_public_id?: string | null
) {
  if (cloudinary_public_id) {
    await cloudinary.uploader.destroy(cloudinary_public_id);
  }
}
