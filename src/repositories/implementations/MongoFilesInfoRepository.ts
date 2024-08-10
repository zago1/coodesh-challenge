import FoodFileInfo from "../../entities/FoodFileInfo";
import IFilesInfoRepository from "../IFilesInfoRepository";
import prismaClient from "../../prisma";
import { convertToFoodFileInfo } from "../../utils";

export default class MongoFilesInfoRepository implements IFilesInfoRepository {

  private convertToMongoDBFileInfo(fileInfo: FoodFileInfo) {
    return {
      id: fileInfo.id,
      name: fileInfo.name,
      start_line: fileInfo.startLine,
      last_update: fileInfo.lastUpdate,
    }
  }

  async findAll(): Promise<FoodFileInfo[]> {
    const fileInfos = await prismaClient.filesInfo.findMany();

    return fileInfos.map((fileInfo) => convertToFoodFileInfo(fileInfo));
  }

  async findById(id: string): Promise<FoodFileInfo> {
    const fileInfo = await prismaClient.filesInfo.findFirst({ where: { id } });

    return convertToFoodFileInfo(fileInfo);

  }

  async insert(fileInfo: FoodFileInfo): Promise<void> {
    const data = this.convertToMongoDBFileInfo(fileInfo);

    await prismaClient.filesInfo.create({ data });
  }

  async insertAll(fileInfos: FoodFileInfo[]): Promise<void> {
    const data = fileInfos.map((fileInfo) => this.convertToMongoDBFileInfo(fileInfo));

    await prismaClient.filesInfo.createMany({ data });
  }

  async update(fileInfo: FoodFileInfo): Promise<FoodFileInfo> {
    const data = this.convertToMongoDBFileInfo(fileInfo);
    const updatedFileInfo = await prismaClient.filesInfo.update({ 
      data: {
        last_update: data.last_update,
        start_line: data.start_line
      }, 
      where: { id: data.id } 
    });

    return convertToFoodFileInfo(updatedFileInfo);
  }
  
}