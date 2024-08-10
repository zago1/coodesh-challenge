import FoodFileInfo from "../entities/FoodFileInfo";


export default interface IFilesInfoRepository {
  findAll(): Promise<FoodFileInfo[]>;
  findByCode(code: string): Promise<FoodFileInfo>;
  save(product: FoodFileInfo): Promise<void>;
  saveAll(products: FoodFileInfo[]): Promise<void>;
}