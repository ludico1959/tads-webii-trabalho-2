const prisma = require("../models/prisma.client");
const { hashPassword, comparePassword } = require("../utils/hash.util");

const createUser = async (name, email, password, phone) => {
  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: { name, email, password: hashedPassword, phone },
  });
};

const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  } 
    
  const isValid = await comparePassword(password, user.password);

  return isValid ? user : null;
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const listAllUsers = async () => {
  return await prisma.user.findMany();
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

module.exports = { 
  createUser, 
  authenticateUser, 
  getUserById, 
  listAllUsers, 
  updateUser, 
  deleteUser 
};
