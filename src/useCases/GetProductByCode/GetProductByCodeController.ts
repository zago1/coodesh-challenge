import { Request, Response } from "express";
import GetProductByCodeUseCase from "./GetProductByCodeUseCase";

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

      return response.status(400).send("PRODUCT_NOT_FOUND");

    } catch (err) {
      console.log('[err]', err);
      return response.status(500).send("SOMETHING_WENT_WRONG");
    }


  }
}