const { Router } = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  importMultipleItems,
  uploadItemImage,
} = require("../controllers/item.controller");
const upload = require("../middlewares/upload.images.middleware");

const router = Router();

router.post("/", authenticateToken, createItem);
router.post("/bulk", authenticateToken, importMultipleItems);
router.post(
  "/:itemId/image",
  authenticateToken,
  upload.single("image"),
  uploadItemImage
);
router.get("/:id", authenticateToken, getItem);
router.put("/:id", authenticateToken, updateItem);
router.delete("/:id", authenticateToken, deleteItem);

module.exports = router;
