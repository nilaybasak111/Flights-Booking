const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

// Create an Airplane
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
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
      "Cannot Create A New Airplane Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get an Airplane
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane You Requested is not Present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Fetch Data of an Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get All Airplanes
async function getAirplanes(id) {
  try {
    const airplanes = await airplaneRepository.getall();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot Fetch Data of All the Airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createAirplane, getAirplanes, getAirplane };
