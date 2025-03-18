const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

// Create an Airport
async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create A New Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customeFilter = {};
  // trips = BOM-MAA
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customeFilter.departureAirportId = departureAirportId;
    customeFilter.arrivalAirportId = arrivalAirportId;
    // Add a Check that departureAirportId and arrivalAirportId are not same
  }
  try {
    console.log("Inside Flight custome");
    const flights = await flightRepository.getAllFlights(customeFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot Fetch Data of All the Flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createFlight, getAllFlights };
