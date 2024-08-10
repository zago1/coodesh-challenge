import MongoProductsRepository from "../../repositories/implementations/MongoProductsRepository";
import GetProductByCodeController from "./GetProductByCodeController";
import GetProductByCodeUseCase from "./GetProductByCodeUseCase";

const mongoProductsRepository = new MongoProductsRepository();

const getProductByCodeUseCase = new GetProductByCodeUseCase(
  mongoProductsRepository
);

const getProductByCodeController = new GetProductByCodeController(
  getProductByCodeUseCase
);

export { getProductByCodeController, getProductByCodeUseCase }