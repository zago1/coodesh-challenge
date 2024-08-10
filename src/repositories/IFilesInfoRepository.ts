import FoodFileInfo from "../entities/FoodFileInfo";


export default interface IFilesInfoRepository {
  findAll(): Promise<FoodFileInfo[]>;
  findById(id: string): Promise<FoodFileInfo>;
  insert(fileInfo: FoodFileInfo): Promise<void>;
  insertAll(fileInfos: FoodFileInfo[]): Promise<void>;
  update(fileInfo: FoodFileInfo): Promise<FoodFileInfo>;
}