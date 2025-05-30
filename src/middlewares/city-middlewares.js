const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while Creating a City";
    ErrorResponse.error = new AppError(
      ["City Name is not found in this format --> name"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body.currentCity || !req.body.updateCityName) {
    ErrorResponse.message = "Something went wrong while Updating a City";
    ErrorResponse.error = new AppError(
      ["Current City & Update City Names are not found in this format --> currentCity & updateCityName"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateDeleteRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while Deleting a City";
    ErrorResponse.error = new AppError(
      ["City Name is not found in this format --> name"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
  validateDeleteRequest
};
