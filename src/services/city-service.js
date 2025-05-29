const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

// This Function Creates A New City In The Database
async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create A New City Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// This Function Updates The City In The Database
async function updateCity(data) {
  try {
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create A New City Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// This Function Deletes City From The Database
async function deleteCity(name) {
  try {
    const city = await cityRepository.deleteCityByName(name);
    // If the city is not found, the destroy method returns 0
    // if (city === 0) {
    //   console.log("City is not found");
    //   throw new AppError(
    //     `${name} City is Already Deleted Or Does Not Exist.`,
    //     StatusCodes.NOT_FOUND
    //   );
    //   // You can also return a message instead of throwing an error
    //   // return {
    //   //   message: `${name} City is Already Deleted Or Does Not Exist.`,
    //   // };
    // }
    return city;
  } catch (error) {
    // If You Want to Printt "${name} City is Already Deleted Or Does Not Exist."
    // Then Use the Below Code
    // if (error instanceof AppError) {
    //   throw error;
    // }
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      `Cannot Delete A ${name} City Object`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  updateCity,
  deleteCity,
};
