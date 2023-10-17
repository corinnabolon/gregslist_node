import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
  constructor() {

  }

  async getHouses() {
    let houses = await dbContext.Houses.find()
    return houses
  }

  async getHouseById(houseId) {
    let house = await dbContext.Houses.findById(houseId)

    if (!house) {
      throw new BadRequest(`${houseId} is not a valid Id`)
    }

    return house
  }

  async createHouse(houseData) {
    let house = await dbContext.Houses.create(houseData)
    return house
  }


  async removeHouse(houseId, userId) {
    let houseToBeRemoved = await this.getHouseById(houseId)
    if (houseToBeRemoved.creatorId != userId) {
      throw new Forbidden("Not your house to delete.")
    }
    await houseToBeRemoved.remove()
    return houseToBeRemoved
  }


  async updateHouse(houseId, userId, houseData) {
    let houseToBeUpdated = await this.getHouseById(houseId)
    if (houseToBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden("Not your house to update")
    }

    houseToBeUpdated.bedrooms = houseData.bedrooms || houseToBeUpdated.bedrooms
    houseToBeUpdated.bathrooms = houseData.bathrooms || houseToBeUpdated.bathrooms
    houseToBeUpdated.year = houseData.year || houseToBeUpdated.year
    houseToBeUpdated.price = houseData.price || houseToBeUpdated.price
    houseToBeUpdated.imgUrl = houseData.imgUrl || houseToBeUpdated.imgUrl
    houseToBeUpdated.description = houseData.description || houseToBeUpdated.description

    await houseToBeUpdated.save()

    return houseToBeUpdated
  }
}

export const housesService = new HousesService()