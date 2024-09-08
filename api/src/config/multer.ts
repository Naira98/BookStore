import path from "path";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { nanoid } from "nanoid";
import { IMAGES_PATH } from "../server";

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(IMAGES_PATH, "profiles"));
  },
  filename: (req, file, cb) => {
    const randomeName = nanoid() + path.extname(file.originalname);
    cb(null, randomeName);
    req.body.picturePath = randomeName;
  },
});

const storageBook = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(IMAGES_PATH, "books"));
  },
  filename: (req, file, cb) => {
    const randomeName = nanoid() + path.extname(file.originalname);
    cb(null, randomeName);
    req.body.poster = randomeName;
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

export const uploadProfile = multer({
  storage: storageProfile,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});
export const uploadBook = multer({
  storage: storageBook,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});
