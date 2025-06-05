const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating a Flight";
    ErrorResponse.error = new AppError(
      ["Flight Number is not found in this format --> flightNumber"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Airplane Id is not found in this format --> airplaneId"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      [
        "Departure Airport Id is not found in this format --> departureAirportId",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Arrival Airport Id is not found in this format --> arrivalAirportId"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Arrival Time is not found in this format --> arrivalTime"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Departure Time is not found in this format --> departureTime"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Price is not found in this format --> price"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Total Seats is not found in this format --> totalSeats"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Check if arrival time is after departure time
  // Means After the Flight has departed from Airport, it cannot arrive before its departure time
  // The date format should be in ISO 8601 format
  // Correct Format: YYYY-MM-DDTHH:mm:ss.sssZ
  // Example: 2023-10-01T10:00:00.000Z
  const departureTime = new Date(req.body.departureTime);
  const arrivalTime = new Date(req.body.arrivalTime);
  if (departureTime > arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["DepartureTime Must Be Before ArrivalTime"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // Check if the departure and arrival airports are the same
  if (req.body.departureAirportId === req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating an Flight";
    ErrorResponse.error = new AppError(
      ["Departure Airport and Arrival Airport Cannot Be Same"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  if (!req.body.seats) {
    ErrorResponse.message = "Something went wrong while Updating an Flight";
    ErrorResponse.error = new AppError(
      ["Seats are not found in this format --> seats"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest,
};
