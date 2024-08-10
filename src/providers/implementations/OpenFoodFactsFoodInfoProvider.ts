import FoodFileInfo from "../../entities/FoodFileInfo";
import Product from "../../entities/Product";
import { MAX_LINES } from "../../enums";
import { convertToProduct, downloadFile, readFileLines, readJsonFileLines, unlinkFile, unzipFile } from "../../utils";
import IFoodInfoProvider, { IFoodFactsInfo } from "../IFoodInfoProvider";

const BASE_FILE_URL = 'https://challenges.coode.sh/food/data/json';
const BASE_FILE_NAME = 'index.txt';

export default class OpenFoodFactsFoodInfoProvider implements IFoodInfoProvider {

  private files: FoodFileInfo[];

  constructor() {}

  private async getFileInfo(filePath: string): Promise<Product[]> {
    try {
      const url = `${BASE_FILE_URL}/${filePath}`;
      await downloadFile(url, filePath);
      
      const fileName = filePath.split('.').slice(0, 2).join('.');
      await unzipFile(filePath, fileName);
      unlinkFile(filePath);

      const fileInfoIdx = this.findFileInfoIdx(fileName);
      
      const startLine = fileInfoIdx >= 0 
      ? this.files[fileInfoIdx].startLine : 0;
      const lines = await readJsonFileLines(fileName, 
        {
          startLine,
          maxLines: startLine + MAX_LINES 
        }
      );
      
      unlinkFile(fileName);

      this.updateFileInfoStartLine(fileInfoIdx, fileName);

      return lines.map(line => convertToProduct(line))
    } catch (error) {
      console.log('[ERROR][GET FILE INFO]', error);
    }
  }

  private updateFileInfoStartLine(idx: number, fileName: string) {
    if (idx < 0) {
      this.files.push(new FoodFileInfo({
        lastUpdate: '',
        name: fileName,
        startLine: 0
      }));

      idx = this.files.length - 1;
    }

    this.files[idx].startLine += MAX_LINES;
    this.files[idx].lastUpdate = (new Date()).toISOString();
  }

  private findFileInfoIdx(fileName: string) {
    const fileInfoIdx = this.files.findIndex(fInfo => fInfo.name === fileName);

    return fileInfoIdx;
  }

  async getFoodFactsInfo(files: FoodFileInfo[]): Promise<IFoodFactsInfo> {
    this.files = files;
    await downloadFile(`${BASE_FILE_URL}/${BASE_FILE_NAME}`, BASE_FILE_NAME);
    const fileLines = await readFileLines(BASE_FILE_NAME, { limit: false });
    unlinkFile(BASE_FILE_NAME);

    const products: Product[] = [];
    for await (const filename of fileLines) {
      const p = await this.getFileInfo(filename);
      products.push(...p);
    }
    return { products, filesInfo: this.files };
  }
}