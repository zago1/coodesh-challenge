import Product from "../entities/Product";

export default interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findByCode(code: string): Promise<Product>;
  insert(product: Product): Promise<void>;
  insertAll(products: Product[]): Promise<void>;
  update(product: Product): Promise<Product>;
  delete(code: string): Promise<void>;
}