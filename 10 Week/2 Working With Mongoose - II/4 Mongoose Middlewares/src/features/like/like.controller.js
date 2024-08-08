import { ApplicationError } from "../../errorHandler/applicatioonError.js"
import { LikeRepository } from "./like.repository.js"

export class LikeController {

  constructor() {
    this.likeRepository = new LikeRepository()
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body
      const userId = req.userId

      if (type != 'Product' && type != 'Category') { return res.status(400).send('Invalid type') }
      if (type == 'Product') {
        await this.likeRepository.likeProduct(userId, id)
      }
      else if (type == 'Category') {
        await this.likeRepository.likeCategory(userId, id)
      }
      res.status(200).send('OK')
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500)
    }
  }

  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query
      const likes = await this.likeRepository.getLikes(type, id)
      return res.status(200).send(likes)
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500)
    }
    finally {
      next()
    }
  }
}