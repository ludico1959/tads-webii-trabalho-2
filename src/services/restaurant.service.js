const prisma = require("../models/prisma.client");

const createRestaurant = async (name, email, password, phone) => {
  return await prisma.restaurant.create({
    data: { name, address, description, openingHours, isShared, ownerId },
  });
};

const getRestaurantById = async (id) => {
  return await prisma.restaurant.findUnique({
    where: { id },
  });
};

const listAllRestaurants = async () => {
  return await prisma.restaurant.findMany();
};

const updateRestaurant = async (id, data) => {
  return await prisma.restaurant.update({
    where: { id },
    data,
  });
};

const deleteRestaurant = async (id) => {
  return await prisma.restaurant.delete({
    where: { id },
  });
};

const shareRestaurant = async (id, userId) => {
  return await prisma.restaurant.update({
    where: { id },
    data: { editors: { connect: { id: userId } } },
  });
};

module.exports = {
  createRestaurant,
  getRestaurantById,
  listAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  shareRestaurant
};
