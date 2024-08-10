import OpenFoodFactsFoodInfoProvider from "./providers/implementations/OpenFoodFactsFoodInfoProvider";
import MongoFilesInfoRepository from "./repositories/implementations/MongoFilesInfoRepository";
import MongoProductsRepository from "./repositories/implementations/MongoProductsRepository";
import CreateProductsController from "./useCases/CreateProducts/CreateProductsController";
import CreateProductUseCase from "./useCases/CreateProducts/CreateProductsUseCase";

const dateTimeValue = '6 9 * * *';

async function cronFunction() {
  const openFoodFactsFoodInfoProvider = new OpenFoodFactsFoodInfoProvider();

  const mongoFilesInfoRepository = new MongoFilesInfoRepository();
  const mongoProductsRepository = new MongoProductsRepository();

  const createProductsUseCase = new CreateProductUseCase(
    mongoProductsRepository,
    openFoodFactsFoodInfoProvider,
    mongoFilesInfoRepository
  );

  await createProductsUseCase.execute();
}

export { dateTimeValue, cronFunction }