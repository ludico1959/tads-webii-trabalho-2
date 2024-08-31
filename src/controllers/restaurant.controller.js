const restaurantService = require("../services/restaurant.service");
const logService = require("../services/log.service");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);

    await logService.createLog(
      "Create restaurant",
      `Restaurant ${restaurant.id} created`,
      req.user.id
    );

    res.status(201).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    await logService.createLog(
      "Get restaurant",
      `Restaurant ${restaurant.id} getted by ID`,
      req.user.id
    );

    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await restaurantService.updateRestaurant(
      req.params.id,
      req.body
    );

    await logService.createLog(
      "Update restaurant",
      `Restaurant ${req.params.id} updated by ID`,
      req.user.id
    );

    res.status(200).json({ restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    await restaurantService.deleteRestaurant(req.params.id);

    await logService.createLog(
      "Delete restaurant",
      `Restaurant ${req.params.id} deleted by ID`,
      req.user.id
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const shareRestaurant = async (req, res) => {
  try {
    await restaurantService.shareRestaurant(req.params.id, req.body.userId);

    await logService.createLog(
      "Update restaurant",
      `Restaurant ${req.params.id} shared by its owner`,
      req.user.id
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  shareRestaurant,
};
