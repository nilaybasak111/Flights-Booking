const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
 * POST : /api/v1/cities/
 * req.body = { name : "New York" }
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    console.log("This is create city ",SuccessResponse);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * PUT : /api/v1/cities/
 * req.body = { currentCity : "Kolkata" }, { updateCityName : "Mumbai" }
 */
async function updateCity(req, res) {
  try {
    const currentCity = req.body.currentCity;
    const updateCityName = req.body.updateCityName;
    const city = await CityService.updateCity(
      {
        name: currentCity,
      },
      {
        name: updateCityName,
      }
    );
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * DELETE : /api/v1/cities/
 * req.body = { name : "kolkata" }
 */
async function deleteCity(req, res) {
  try {
    const city = await CityService.deleteCity(req.body.name);
    // SuccessResponse.data = city;
    SuccessResponse.data = {
      message: `${req.body.name} City Deleted Successfully`
    };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
