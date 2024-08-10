import IProductsRepository from "../../repositories/IProductsRepository";

export default class GetProductByCodeUseCase {

  constructor(
    private productRepository: IProductsRepository
  ) {}

  async execute(code: string) {
    const product = await this.productRepository.findByCode(code);

    return product;
  }
}