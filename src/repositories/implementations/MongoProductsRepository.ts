import Product from "../../entities/Product";
import IProductsRepository from "../IProductsRepository";
import prismaClient from "../../prisma";
import { convertToProduct } from "../../utils";
import { PRODUCT_STATUS } from "../../Enums";

export default class MongoProductsRepository implements IProductsRepository {

  private convertToMongoDBProduct(product: Product) {
    return {
      code: product.code,
      status: product.status,
      imported_t: product.importedAt,
      url: product.url,
      creator: product.creator,
      created_t: product.createdAt,
      last_modified_t: product.lastModifiedAt,
      product_name: product.productName,
      quantity: product.quantity,
      brands: product.brands,
      categories: product.categories,
      labels: product.labels,
      cities: product.cities,
      purchase_places: product.purchasePlaces,
      stores: product.stores,
      ingredients_text: product.ingredientsText,
      traces: product.traces,
      serving_size: product.servingSize,
      serving_quantity: product.servingQuantity,
      nutriscore_score: product.nutriscoreScore,
      nutriscore_grade: product.nutriscoreGrade,
      main_category: product.mainCategory,
      image_url: product.imageUrl,
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await prismaClient.products.findMany();

    return products.map((product) => convertToProduct(product));
  }

  async findByCode(code: string): Promise<Product> {
    const product = await prismaClient.products.findFirst({ where: { code } });
    return convertToProduct(product);
  }

  async insert(product: Product): Promise<void> {
    await prismaClient.products.create({
      data: this.convertToMongoDBProduct(product),
    });
  }

  async insertAll(products: Product[]): Promise<void> {
    const data = products.map(product => this.convertToMongoDBProduct(product));
    await prismaClient.products.createMany({ data });
  }

  async update(product: Product): Promise<Product> {
    const data = this.convertToMongoDBProduct(product);
    const updatedProduct = await prismaClient.products.update({
      data,
      where: {
        code: data.code
      }
    });

    return convertToProduct(updatedProduct);
  }

  async delete(code: string): Promise<void> {
    await prismaClient.products.update({
      data: { status: PRODUCT_STATUS.trash },
      where: { code }
    })
  }

}