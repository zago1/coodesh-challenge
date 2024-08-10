import Product from "../entities/Product";

export default interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findByCode(code: string): Promise<Product>;
  save(product: Product): Promise<void>;
  saveAll(products: Product[]): Promise<void>;
}