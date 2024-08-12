import OpenFoodFactsFoodInfoProvider from "./providers/implementations/OpenFoodFactsFoodInfoProvider";
import MongoCronRepository from "./repositories/implementations/MongoCronRepository";
import MongoFilesInfoRepository from "./repositories/implementations/MongoFilesInfoRepository";
import MongoProductsRepository from "./repositories/implementations/MongoProductsRepository";
import CreateProductsController from "./useCases/CreateProducts/CreateProductsController";
import CreateProductUseCase from "./useCases/CreateProducts/CreateProductsUseCase";

const dateTimeValue = '0 0 * * *';

async function cronFunction() {
  const openFoodFactsFoodInfoProvider = new OpenFoodFactsFoodInfoProvider();

  const mongoFilesInfoRepository = new MongoFilesInfoRepository();
  const mongoProductsRepository = new MongoProductsRepository();
  const mongoCronRepository = new MongoCronRepository();

  const createProductsUseCase = new CreateProductUseCase(
    mongoProductsRepository,
    openFoodFactsFoodInfoProvider,
    mongoFilesInfoRepository,
    mongoCronRepository
  );

  await createProductsUseCase.execute();
}

export { dateTimeValue, cronFunction }