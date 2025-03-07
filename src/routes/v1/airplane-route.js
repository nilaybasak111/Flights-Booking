const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplanesMiddlewares } = require("../../middlewares");
const router = express.Router();

// POST : /api/v1/airplanes/
router.post(
  "/",
  AirplanesMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

// GET : /api/v1/airplanes/:id
router.get("/:id", AirplaneController.getAirplane);

// GET : /api/v1/airplanes/
router.get("/", AirplaneController.getAirplanes);

module.exports = router;
