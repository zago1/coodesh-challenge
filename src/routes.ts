import { Router } from "express";
import cron from 'node-cron';

import { getProductByCodeController } from "./useCases/GetProductByCode";
import { deleteProductController } from "./useCases/DeleteProduct";
import { updateProductController } from "./useCases/UpdateProduct";
import { getProductsController } from "./useCases/GetProducts";
import { dateTimeValue, cronFunction } from "./cronScheduleConfig"

const router = Router();

router.get("/", (request, response) => {
  return response.status(201).send("OK!");
});

router.get("/products", (request, response) => {
  return getProductsController.handle(request, response);
});

router.get("/products/:code", (request, response) => {
  return getProductByCodeController.handle(request, response);
});

router.delete("/products/:code", (request, response) => {
  return deleteProductController.handle(request, response);
})

router.put("/products/:code", (request, response) => {
  return updateProductController.handle(request, response);
});

cron.schedule(dateTimeValue, cronFunction);
// cronFunction();


export default router;
