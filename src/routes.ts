import { Router } from "express";
import { getProductByCodeController } from "./useCases/GetProductByCode";
import { deleteProductController } from "./useCases/DeleteProduct";
import { updateProductController } from "./useCases/UpdateProduct";

const router = Router();

router.get("/", (request, response) => {
  return response.status(201).send("OK!");
});

router.get("/products/:code", (request, response) => {
  return getProductByCodeController.handle(request, response);
});

router.delete("/products/:code", (request, response) => {
  return deleteProductController.handle(request, response);
})

router.put("/products/:code", (request, response) => {
  return updateProductController.handle(request, response);
})

export default router;
