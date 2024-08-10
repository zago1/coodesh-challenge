import OpenFoodFactsFoodInfoProvider from "../../providers/implementations/OpenFoodFactsFoodInfoProvider";
import MongoFilesInfoRepository from "../../repositories/implementations/MongoFilesInfoRepository";
import MongoProductsRepository from "../../repositories/implementations/MongoProductsRepository";
import CreateProductsController from "./CreateProductsController";
import CreateProductUseCase from "./CreateProductsUseCase";


const openFoodFactsFoodInfoProvider = new OpenFoodFactsFoodInfoProvider();

const mongoFilesInfoRepository = new MongoFilesInfoRepository();
const mongoProductsRepository = new MongoProductsRepository();

const createProductsUseCase = new CreateProductUseCase(
  mongoProductsRepository,
  openFoodFactsFoodInfoProvider,
  mongoFilesInfoRepository
);

const createProductsController = new CreateProductsController(createProductsUseCase);

export { createProductsController, createProductsUseCase };