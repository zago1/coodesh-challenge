import FoodFileInfo from "../entities/FoodFileInfo";
import Product from "../entities/Product";

export interface IFoodFactsInfo {
  products: Product[];
  filesInfo: FoodFileInfo[]
}

export default interface IFoodInfoProvider {
  getFoodFactsInfo(files: FoodFileInfo[]): Promise<IFoodFactsInfo>;
}