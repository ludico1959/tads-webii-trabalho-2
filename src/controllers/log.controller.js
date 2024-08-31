const prisma = require("../models/prisma.client");

const getLogs = async (req, res) => {
  try {
    const logs = await prisma.log.findMany({
      orderBy: { timestamp: "desc" },
    });

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getLogs,
};
