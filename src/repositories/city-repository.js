const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const CrudRepository = require("./crud-repository");
const { City } = require("../models");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }
  async deleteCityByName(name) {
    const response = await City.destroy({
      where: {
        name: name,
      },
    });
    if (!response) {
      throw new AppError(
        "Not Able to Find the Resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = CityRepository;
