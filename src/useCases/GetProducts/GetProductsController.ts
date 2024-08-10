import { Request, Response } from "express";
import GetProductsUseCase from "./GetProductsUseCase";

export default class GetProductsController {
  
  constructor(
    private getProductsUseCase: GetProductsUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const page = !!request.query.page 
        ? parseInt(request.query.page as string) 
        : undefined;

      const pageSize = !!request.query.pageSize 
        ? parseInt(request.query.pageSize as string) 
        : undefined;

      const { status, value, metadata } = await this.getProductsUseCase.execute(page, pageSize);

      if (status) {
        return response.status(200).send({ 
          metadata: {
            ...(metadata ?? { totalRows: 0 }),
            page,
            pageSize
          },
          products: value,
        });
      }
      
    } catch (err) {
      console.log('[err]', err);
      return response.sendStatus(500);
    }
  }
}