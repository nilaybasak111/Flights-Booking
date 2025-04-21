const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

// Create an Airplane
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

// Get All Airplanes
async function getAllFlights(query) {
  let customeFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:59";
  
  // Filter Your Trip Flights using the Airport Code
  // trips = BOM-MAA
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customeFilter.departureAirportId = departureAirportId;
    customeFilter.arrivalAirportId = arrivalAirportId;
    // Add a Check that departureAirportId and arrivalAirportId are not same
  }

  // Filter to Get All the Flights Between a Price Range
  // price = 100-200
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customeFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

  // Filter to Find Available Seats in a Flight
  // travellers = 5
  if (query.travellers) {
    customeFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  // Filter to Find Available Flights on a Specific Date
  // tripDate = 2021-09-10
  if (query.tripDate) {
    customeFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }

  if(query.sort){
    const params = query.sort.split(",");
    const sortFilters = params.map((params)=>params.split("_"));
    sortFilter = sortFilters;
  }

  try {
    const flights = await flightRepository.getAllFlights(customeFilter, sortFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot Fetch Data of All the Flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get An Airplane
async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Flight You Requested is not Present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Fetch Data of an Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createFlight, getAllFlights, getFlight };
