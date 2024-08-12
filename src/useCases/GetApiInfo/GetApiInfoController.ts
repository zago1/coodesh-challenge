import { Request, Response } from "express";
import GetApiInfoUseCase from "./GetApiInfoUseCase";

export default class GetApiInfoController {
  constructor(
    private getApiInfoUseCase: GetApiInfoUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = await this.getApiInfoUseCase.execute();
      
      response.status(200).send(data);
    } catch (err) {
      console.log('[err]', err);
      response.sendStatus(500);
    }
  }
}