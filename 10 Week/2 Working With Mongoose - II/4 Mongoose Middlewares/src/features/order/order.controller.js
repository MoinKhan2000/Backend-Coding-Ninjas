import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository()
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.userId;
      console.log('userId', userId);
      await this.orderRepository.placeOrder(userId);
      res.status(201).send('Order is created successfully');
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }
  async getTotalAmount(req, res, next) {
    try {
      const userId = req.userId;
      const result = await this.orderRepository.getTotalAmount(userId);
      console.log("result -> ", result);
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      return res.status(200).send('Something went wrong');
    }
  }


}