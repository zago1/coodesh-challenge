import FoodFileInfo from "../../entities/FoodFileInfo";
import Product from "../../entities/Product";
import IFoodInfoProvider from "../../providers/IFoodInfoProvider";
import IFilesInfoRepository from "../../repositories/IFilesInfoRepository";
import IProductsRepository from "../../repositories/IProductsRepository";

export default class CreateProductUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private foodInfoProvider: IFoodInfoProvider,
    private filesInfoRepository: IFilesInfoRepository
  ) {}

  private async saveFilesInfo(files: FoodFileInfo[]) {
    for await (const file of files) {
      if (!!file.id) {
        await this.filesInfoRepository.update(file);
      } else {
        await this.filesInfoRepository.insert(file);
      }
    }
  }

  async execute() {
    try {
      const files = await this.filesInfoRepository.findAll();
      const { products, filesInfo } = await this.foodInfoProvider.getFoodFactsInfo(files);

      if (!products.length) {
        console.log('NOTHING TO INSERT');
        return;
      }
  
      await this.productRepository.insertAll(products);
      console.log('[INSERTED PRODUCTS]')
      await this.saveFilesInfo(filesInfo);
      console.log('[SAVE FILES INFO]');
    } catch (err) {
      console.log('[execute][err]', err);
    }

  }
}