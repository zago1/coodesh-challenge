import { Router } from "express";

const router = Router();

router.get("", (request, response) => {
  return response.status(201).send("OK!");
});

export default router;
