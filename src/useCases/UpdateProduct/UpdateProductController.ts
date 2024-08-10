import { Request, Response } from "express";
import UpdateProductUseCase from "./UpdateProductUseCase";
import { RESPONSE_ERROR_MESSAGES } from "../../enums";

export default class UpdateProductController {

  constructor(
    private updateProductUseCase: UpdateProductUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { product } = request.body;
      const { code } = request.params;
      const { status, value } = await this.updateProductUseCase.execute(code, product);

      if (status) {
        return response.status(200).send(value);
      }

      return response.status(400).send(RESPONSE_ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    } catch (err) {
      console.log('[err]', err);
      return response.sendStatus(500);
    }
  }
}