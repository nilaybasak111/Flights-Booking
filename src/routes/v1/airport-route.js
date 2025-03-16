const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");
const router = express.Router();

// POST : /api/v1/airports/
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// GET : /api/v1/airports/:id
router.get("/:id", AirportController.getAirport);

// GET : /api/v1/airports/
router.get("/", AirportController.getAirports);

// DELETE : /api/v1/airports/:id
router.delete("/:id", AirportController.destroyAirport);

module.exports = router;
