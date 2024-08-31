const express = require("express");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const menuRoutes = require("./routes/menu.routes");
const itemRoutes = require("./routes/item.routes");
const logRoutes = require("./routes/log.routes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/items", itemRoutes);
app.use("/logs", logRoutes);

module.exports = app;
