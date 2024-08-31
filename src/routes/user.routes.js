const { Router } = require("express");
const { 
  registerUser, 
  loginUser, 
  getUser, 
  listAllUsers,
  updateUser,
  deleteUser 
} = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.get("/", listAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
