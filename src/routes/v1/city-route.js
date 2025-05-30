const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");
const router = express.Router();

// POST : /api/v1/cities/
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);
// DELETE : /api/v1/cities/
router.delete(
  "/",
  CityMiddlewares.validateDeleteRequest,
  CityController.deleteCity
);
// PUT : /api/v1/cities/
router.put(
  "/",
  CityMiddlewares.validateUpdateRequest,
  CityController.updateCity
);

module.exports = router;
