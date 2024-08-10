import https from 'https';
import fs from 'fs';
import readline from 'readline';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream';
import Product from '../entities/Product';
import FoodFileInfo from '../entities/FoodFileInfo';
import { MAX_LINES, PRODUCT_STATUS } from '../enums';

type readFileLinesOptions = {
  limit?: boolean;
  startLine?: number;
  maxLines?: number;
} | undefined

export async function readJsonFileLines(path: string, options?: readFileLinesOptions | undefined) {
  const lines = await readFileLines(path, options);

  return lines.map(line => JSON.parse(line));
}

export async function readFileLines(path: string, options: readFileLinesOptions): Promise<string[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const limit = options.limit ?? true;
  const startLine = options.startLine ?? 0;
  const maxLines = options.maxLines ?? MAX_LINES;

  console.log(limit, startLine, maxLines);

  let count = 0;
  const lines: string[] = [];
  for await (const line of rl) {
    if (limit && count < startLine) { count++; continue; }
    if (limit && (count >= maxLines)) { break; }
    count++;
    lines.push(line);
  }

  fileStream.close();

  return lines;
}

export async function downloadFile(path: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(destination);
  
    https.get(path, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve());
      });
    }).on('error', (err) => {
      unlinkFile(destination, () => reject(err));
    })
  })
}

export function unlinkFile(path: string, cb?: () => void) {
  const func = () => {};
  fs.unlink(path, cb ?? func);
}

export async function unzipFile(path: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const unzip = zlib.createUnzip();
    const input = fs.createReadStream(path);
    const output = fs.createWriteStream(destination);

    pipeline(input, unzip, output, (err) => {
      unlinkFile(path);
      if (err) { return reject(err); }

      return resolve();
    })
  })
}

export function convertToProduct(obj) {
  const product = new Product({ 
    code: obj.code,
    status: obj.status ?? PRODUCT_STATUS.draft,
    importedAt: obj.imported_t ?? new Date().toISOString(),
    url: obj.url,
    creator: obj.creator,
    createdAt: obj.created_t,
    lastModifiedAt: obj.last_modified_t,
    productName: obj.product_name,
    quantity: obj.quantity,
    brands: obj.brands,
    categories: obj.categories,
    labels: obj.labels,
    cities: obj.cities,
    purchasePlaces: obj.purchase_places,
    stores: obj.stores,
    ingredientsText: obj.ingredients_text,
    traces: obj.traces,
    servingSize: obj.serving_size,
    servingQuantity: !!obj.serving_quantity ? parseFloat(obj.serving_quantity) : 0.0,
    nutriscoreScore: !!obj.nutriscore_score ? parseInt(obj.nutriscore_score) : 0,
    nutriscoreGrade: obj.nutriscore_grade,
    mainCategory: obj.main_category,
    imageUrl: obj.image_url,
  }, obj.id);

  return product;
}

export function convertToFoodFileInfo(obj) {
  const foodFileInfo: FoodFileInfo = {
    id: obj.id,
    lastUpdate: obj.last_update?.toISOString(),
    name: obj.name,
    startLine: obj.start_line
  };
  return foodFileInfo;
}