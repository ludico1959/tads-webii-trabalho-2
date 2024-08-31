const jwt = require("jsonwebtoken");
require("dotenv").config();
const logService = require("../services/log.service");

const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
  
    req.user = user;

    await logService.createLog(
      'Token Authentication', 
      `User ${user.id} authenticated`, 
      user.id);
    
    next();
  });
};  

const authorizeRestaurantEdit = async (req, res, next) => {
  const restaurantId = req.params.id;
  const userId = req.user.id;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { owner: true, editors: true },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const isOwner = restaurant.ownerId === userId;
    const isEditor = restaurant.editors.some((editor) => editor.id === userId);

    if (isOwner || isEditor) {
      req.isOwner = isOwner;
      req.isEditor = isEditor;
      return next();
    } else {
      return res
        .status(403)
        .json({
          error:
            "Access denied. You do not have permission to edit this restaurant.",
        });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
};

const authorizeOwnerOnly = (req, res, next) => {
  if (req.isOwner) {
    return next();
  } else {
    return res
      .status(403)
      .json({
        error: "Access denied. Only the owner can perform this action.",
      });
  }
};

module.exports = {
  authenticateToken,
  authorizeRestaurantEdit,
  authorizeOwnerOnly,
};
