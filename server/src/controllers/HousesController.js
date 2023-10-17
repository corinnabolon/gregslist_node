import { Auth0Provider } from "@bcwdev/auth0provider"
import { housesService } from "../services/HousesService.js"
import BaseController from "../utils/BaseController.js"

export class HousesController extends BaseController {
  constructor() {
    super("api/houses")
    this.router
      .get("", this.getHouses)
      .get("/:houseId", this.getHouseById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createHouse)
      .delete("/:houseId", this.removeHouse)
      .put("/:houseId", this.updateHouse)
  }

  async getHouses(request, response, next) {
    try {
      // response.send("API is working!")
      let houses = await housesService.getHouses()
      return response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(request, response, next) {
    try {
      let houseId = request.params.houseId
      let house = await housesService.getHouseById(houseId)
      return response.send(house)
    } catch (error) {
      next(error)
    }
  }


  async createHouse(request, response, next) {
    try {
      let houseData = request.body
      let userInfo = request.userInfo
      houseData.creatorId = userInfo.id
      let house = await housesService.createHouse(houseData)
    } catch (error) {
      next(error)
    }
  }


  async removeHouse(request, response, next) {
    try {
      let houseId = request.params.houseId
      let userId = request.userInfo.id
      let house = await housesService.removeHouse(houseId, userId)
      return response.send(`The house has been removed.`)

    } catch (error) {
      next(error)
    }
  }

  async updateHouse(request, response, next) {
    try {
      let houseId = request.params.houseId
      let userId = request.userInfo.id
      let houseData = request.body
      let updatedHouse = await housesService.updateHouse(houseId, userId, houseData)
      return response.send(updatedHouse)
    } catch (error) {
      next(error)
    }
  }
}