import CreateProductUseCase from "./CreateProductsUseCase";

export default class CreateProductsController {

  constructor(
    private createProductsUseCase: CreateProductUseCase
  ) {}

  async handle() {
    await this.createProductsUseCase.execute();
  }
}
