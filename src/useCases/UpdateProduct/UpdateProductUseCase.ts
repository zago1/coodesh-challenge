import Product from "../../entities/Product";
import IProductsRepository from "../../repositories/IProductsRepository";
import UpdateProductDTO from "./UpdateProductDTO";

export default class UpdateProductUseCase {

  constructor(
    private productsRepository: IProductsRepository
  ) {}

  async execute(code:string, product: UpdateProductDTO) {
    const productToUpdate = new Product(product)

    return await this.productsRepository.update(code, productToUpdate);
  }
}