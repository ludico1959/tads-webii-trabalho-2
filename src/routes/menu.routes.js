const { Router } = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu.controller");

const router = Router();

router.post("/", authenticateToken, createMenu);
router.get("/:id", authenticateToken, getMenu);
router.put("/:id", authenticateToken, updateMenu);
router.delete("/:id", authenticateToken, deleteMenu);

module.exports = router;
