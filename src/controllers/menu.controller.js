const menuService = require("../services/menu.service");
const logService = require("../services/log.service");

const createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body);

    await logService.createLog(
      "Create menu",
      `Menu ${menu.id} created`,
      req.user.id
    );

    res.status(201).json({ menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const menu = await menuService.getMenuById(req.params.id);

    if (!menu) return res.status(404).json({ error: "Menu not found" });

    await logService.createLog(
      "Get menu",
      `Menu ${menu.id} getted by ID`,
      req.user.id
    );

    res.status(201).json({ menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await menuService.updateMenu(req.params.id, req.body);

    await logService.createLog(
      "Update menu",
      `Menu ${menu.id} updated by ID`,
      req.user.id
    );

    res.status(200).json({ menu: menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await menuService.deleteMenu(req.params.id);

    await logService.createLog(
      "Delete menu",
      `Menu ${req.params.id} deleted by ID`,
      req.user.id
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createMenu, 
  getMenu, 
  updateMenu, 
  deleteMenu 
};
