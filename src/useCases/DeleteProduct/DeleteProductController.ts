import { Request, Response } from "express";
import DeleteProductUseCase from "./DeleteProductUseCase";
import { RESPONSE_ERROR_MESSAGES } from "../../Enums";

export default class DeleteProductController {
  constructor(
    private deleteProducUseCase: DeleteProductUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { code } = request.params;
      await this.deleteProducUseCase.execute(code);

      return response.status(200).send();
    } catch (err) {
      console.log('[err]', err);
      return response.sendStatus(500)
    }
  }
}