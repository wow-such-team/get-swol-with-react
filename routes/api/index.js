const router = require("express").Router();
const userRoutes = require("./users");
const exerciseRoutes = require('./exercises');

router.use("/users", userRoutes);
router.use("/exercises", exerciseRoutes);

module.exports = router;