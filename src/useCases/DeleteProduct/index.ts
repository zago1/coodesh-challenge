import MongoProductsRepository from "../../repositories/implementations/MongoProductsRepository";
import DeleteProductController from "./DeleteProductController";
import DeleteProductUseCase from "./DeleteProductUseCase";

const mongoProductsRepository = new MongoProductsRepository();

const deleteProductUseCase = new DeleteProductUseCase(
  mongoProductsRepository
);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase
);

export { deleteProductUseCase, deleteProductController }