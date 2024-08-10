import { Router } from "express";
import { getProductByCodeController } from "./useCases/GetProductByCode";

const router = Router();

router.get("/", (request, response) => {
  return response.status(201).send("OK!");
});

router.get("/products/:code", (request, response) => {
  return getProductByCodeController.handle(request, response);
})

export default router;
