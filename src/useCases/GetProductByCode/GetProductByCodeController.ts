import { Request, Response } from "express";
import GetProductByCodeUseCase from "./GetProductByCodeUseCase";
import { RESPONSE_ERROR_MESSAGES } from "../../enums";

export default class GetProductByCodeController {
  constructor(
    private getProductByCodeUseCase: GetProductByCodeUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { code } = request.params;

      const { status, value } = await this.getProductByCodeUseCase.execute(code as string);

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