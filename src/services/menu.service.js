const prisma = require("../models/prisma.client");

const createMenu = async (data) => {
  return await prisma.menu.create({
    data,
  });
};

const getMenuById = async (id) => {
  return await prisma.menu.findUnique({
    where: { id },
    include: { items: true },
  });
};

const updateMenu = async (id, data) => {
  return await prisma.menu.update({
    where: { id },
    data,
  });
};

const deleteMenu = async (id) => {
  return await prisma.menu.delete({
    where: { id },
  });
};

module.exports = { 
  createMenu, 
  getMenuById, 
  updateMenu, 
  deleteMenu 
};
