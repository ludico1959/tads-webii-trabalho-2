const prisma = require("../models/prisma.client");

const createItem = async (data) => {
  return await prisma.item.create({
    data,
  });
};

const getItemById = async (id) => {
  return await prisma.item.findUnique({
    where: { id },
  });
};

const updateItem = async (id, data) => {
  return await prisma.item.update({
    where: { id },
    data,
  });
};

const deleteItem = async (id) => {
  return await prisma.item.delete({
    where: { id },
  });
};

module.exports = { 
  createItem, 
  getItemById, 
  updateItem, 
  deleteItem
};
