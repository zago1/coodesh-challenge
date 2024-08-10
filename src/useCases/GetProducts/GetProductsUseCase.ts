import IProductsRepository from "../../repositories/IProductsRepository";

export default class GetProductsUseCase {

  constructor(
    private productsRepository: IProductsRepository
  ) {}

  async execute(page: number = 1, pageSize: number = 50) {
    const skip = (page - 1) * pageSize;
    const response = await this.productsRepository.findAll(skip, pageSize);

    return response;
  }
}