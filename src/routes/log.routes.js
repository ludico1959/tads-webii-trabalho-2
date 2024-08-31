const { Router } = require("express");
const { getLogs } = require("../controllers/log.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/logs", authenticateToken, getLogs);

module.exports = router;
