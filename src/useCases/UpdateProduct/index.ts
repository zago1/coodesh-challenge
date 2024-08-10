import MongoProductsRepository from "../../repositories/implementations/MongoProductsRepository";
import UpdateProductController from "./UpdateProductController";
import UpdateProductUseCase from "./UpdateProductUseCase";

const mongoProductsRepository = new MongoProductsRepository();

const updateProductUseCase = new UpdateProductUseCase(
  mongoProductsRepository
);
const updateProductController = new UpdateProductController(
  updateProductUseCase
);

export { updateProductUseCase, updateProductController }