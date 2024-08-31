const { Router } = require("express");
const {
  authenticateToken,
  authorizeRestaurantEdit,
  authorizeOwnerOnly,
} = require("../middlewares/auth.middleware");
const { 
  createRestaurant, 
  getRestaurant, 
  updateRestaurant, 
  deleteRestaurant, 
  shareRestaurant 
} = require("../controllers/restaurant.controller");

const router = Router();

router.post("/", authenticateToken, createRestaurant);
router.get("/:id", authenticateToken, getRestaurant);
router.put("/:id", authenticateToken, authorizeRestaurantEdit, updateRestaurant);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRestaurantEdit,
  authorizeOwnerOnly, 
  deleteRestaurant
);
router.post(
  "/:id/share",
  authenticateToken,
  authorizeRestaurantEdit,
  authorizeOwnerOnly,
  shareRestaurant
);

module.exports = router;
