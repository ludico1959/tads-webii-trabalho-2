const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloundinary.config");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "menu_items",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
