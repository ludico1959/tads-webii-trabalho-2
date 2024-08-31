const itemService = require("../services/item.service");
const logService = require("../services/log.service");

const createItem = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);

    await logService.createLog(
      "Create item",
      `Item ${item.id} created`,
      req.user.id
    );

    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await logService.createLog(
      "Get item",
      `Item ${item.id} getted by ID`,
      req.user.id
    );

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);

    await logService.createLog(
      "Update item",
      `Item ${item.id} updated by ID`,
      req.user.id
    );

    res.status(200).json({ item: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    await itemService.deleteItem(req.params.id);

    await logService.createLog(
      "Delete item",
      `Item ${req.params.id} deleted by ID`,
      req.user.id
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const importMultipleItems = async (req, res) => {
  const { menuId, items } = req.body;

  try {
    const menu = await prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    const createdItems = await prisma.item.createMany({
      data: items.map((item) => ({
        ...item,
        menuId: menuId,
      })),
    });

    await logService.createLog(
      "Import multiple itens",
      `${items.length} itens imported to the menu ${menuId}`,
      req.user.id
    );

    return res
      .status(201)
      .json({ message: "Items omported successfully", createdItems });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const uploadItemImage = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const imageUrl = req.file.path;

    await prisma.item.update({
      where: { id: itemId },
      data: {
        images: {
          push: imageUrl,
        },
      },
    });

    await logService.createLog(
      "Upload item image",
      `Image uploaded to item ${item.id}`,
      req.user.id
    );

    return res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { 
  createItem, 
  getItem, 
  updateItem, 
  deleteItem,
  importMultipleItems,
  uploadItemImage
};
