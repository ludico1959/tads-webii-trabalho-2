const userService = require("../services/user.service");
const logService = require("../services/log.service");
const { generateToken } = require("../utils/auth.util");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const user = await userService.createUser(name, email, password, phone);

    await logService.createLog(
      "Register user", 
      `User ${user.id} registered`, 
      req.user.id
    );

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    await logService.createLog(
      "Login user",
      `User ${user.id} logged`,
      req.user.id
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await logService.createLog(
      "Get user",
      `User ${user.id} getted by ID`,
      req.user.id
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const users = await userService.listAllUsers();

    if (users.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    await logService.createLog(
      "List all users",
      `All ${users.length} users listened`,
      req.user.id
    );

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);

    await logService.createLog(
      "Update user",
      `User ${user.id} updated by ID`,
      req.user.id
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    await logService.createLog(
      "Delete user",
      `User ${user.id} deleted by ID`,
      req.user.id
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser,
  getUser,
  listAllUsers,
  updateUser,
  deleteUser, 
};
