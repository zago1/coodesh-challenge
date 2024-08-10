import IProductsRepository from "../../repositories/IProductsRepository";

export default class DeleteProductUseCase {
  constructor(
    private productsRepository: IProductsRepository
  ) {}

  async execute(code: string) {
    await this.productsRepository.delete(code);
  }
}