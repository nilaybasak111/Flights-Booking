const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const router = express.Router();

// POST : /api/v1/flights/
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// GET : /api/v1/flights?trips=BOM-MAA/
router.get("/", FlightController.getAllFlights);

// GET : /api/v1/flights/:id
router.get("/:id", FlightController.getFlight);

module.exports = router;
