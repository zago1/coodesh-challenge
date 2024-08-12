import Cron from "../../entities/Cron";
import FoodFileInfo from "../../entities/FoodFileInfo";
import Product from "../../entities/Product";
import IFoodInfoProvider from "../../providers/IFoodInfoProvider";
import ICronRepository from "../../repositories/ICronRepository";
import IFilesInfoRepository from "../../repositories/IFilesInfoRepository";
import IProductsRepository from "../../repositories/IProductsRepository";

export default class CreateProductUseCase {
  constructor(
    private productRepository: IProductsRepository,
    private foodInfoProvider: IFoodInfoProvider,
    private filesInfoRepository: IFilesInfoRepository,
    private cronRepository: ICronRepository
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
    let cron: Cron;
    try {
      cron = await this.cronRepository.insert(new Cron({ dateTime: new Date(), status: 'running' }));
      const files = await this.filesInfoRepository.findAll();
      const { products, filesInfo } = await this.foodInfoProvider.getFoodFactsInfo(files);

      if (!products.length) {
        console.log('NOTHING TO INSERT');
        await this.cronRepository.update(cron.id, 'success');
        return;
      }
      
      await this.productRepository.insertAll(products);
      await this.saveFilesInfo(filesInfo);
      await this.cronRepository.update(cron.id, 'success');
    } catch (err) {
      console.log('[execute][err]', err);
      if (!!cron) {
        await this.cronRepository.update(cron.id, 'error');
      }
    }

  }
}