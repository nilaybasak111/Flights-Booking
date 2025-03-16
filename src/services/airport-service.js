const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

// Create an Airport
async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create A New Airport Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get an Airport
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport You Requested is not Present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Fetch Data of an Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get All Airports
async function getAirports() {
  try {
    const airports = await airportRepository.getall();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot Fetch Data of All the Airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Delete An Airport
async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport You Requested to Delete is not Present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Delete an Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createAirport, getAirport, getAirports, destroyAirport };
