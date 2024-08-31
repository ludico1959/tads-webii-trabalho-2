const prisma = require("../models/prisma.client");

/**
 * Registra uma nova entrada de log.
 *
 * @param {String} action   - Descrição da ação realizada.
 * @param {String} details  - Detalhes adicionais sobre a ação.
 * @param {String} userId   - ID do usuário que realizou a ação.
 */
const createLog = async (action, details, userId) => {
  try {
    await prisma.log.create({
      data: {
        action,
        details,
        userId,
      },
    });
  } catch (error) {
    console.error("Error creating log:", error);
  }
};

module.exports = {
  createLog,
};
