import MongoProductsRepository from "../../repositories/implementations/MongoProductsRepository";
import GetProductsController from "./GetProductsController";
import GetProductsUseCase from "./GetProductsUseCase";

const mongoProductsRepository = new MongoProductsRepository()

const getProductsUseCase = new GetProductsUseCase(
  mongoProductsRepository
);
const getProductsController = new GetProductsController(
  getProductsUseCase
);

export { getProductsUseCase, getProductsController };
