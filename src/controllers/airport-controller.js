const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
 * POST : /api/v1/airports/
 * req.body = {
 *              name : "Netaji Subhas Chandra Bose International Airport",
 *              cityId : 5,
 *              code : "CCU"
 *            }
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * Get an Airport
 * GET : /api/v1/airports/:id
 */
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * Get All Airports
 * GET : /api/v1/airports/
 */
async function getAirports(req, res) {
  try {
    const airport = await AirportService.getAirports();
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * Update An Airport
 * PUT : /api/v1/airports/:id
 * req.body = {
 *              name : "Netaji Subhas Chandra Bose International Airport",
 *            }
 */
async function updateAirport(req, res) {
  try {
    const airport = await AirportService.updateAirport(req.params.id, {
      name: req.body.name,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
* Delete an Airport
* DELETE : /api/v1/airports/:id
}
*/
async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    //SuccessResponse.data = response;
    // Instead of returning the 0/1 response, we can return a success message
    SuccessResponse.data = {
      message: `Airport Id ${req.params.id} Is Deleted Successfully`,
    };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAirports,
  updateAirport,
  destroyAirport,
};
