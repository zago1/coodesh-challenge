import Product from "../entities/Product";
import IRepositoryResponse from "./IRepositoryResponse";

export default interface IProductsRepository {
  findAll(skip: number, take: number): Promise<IRepositoryResponse<Product[]>>;
  findByCode(code: string): Promise<IRepositoryResponse<Product>>;
  insert(product: Product): Promise<void>;
  insertAll(products: Product[]): Promise<void>;
  update(code: string, product: Product): Promise<IRepositoryResponse<Product>>;
  delete(code: string): Promise<void>;
}