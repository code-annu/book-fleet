import { Router } from "express";
import { BookSaleController } from "../controller/book-sale-controller";
import { BookRepository } from "../../infrastructure/repository/book-repository";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  bookSaleCreateSchema,
  bookSaleUpdateSchema,
} from "../schema/book-sale-schema";

export const bookSaleRouter = Router();
const bookSaleController = new BookSaleController(new BookRepository());

bookSaleRouter.post(
  "/",
  validateRequestBody(bookSaleCreateSchema),
  bookSaleController.postBookSale.bind(bookSaleController)
);

bookSaleRouter.get(
  "/:uid",
  bookSaleController.getBookSaleByUid.bind(bookSaleController)
);

bookSaleRouter.patch(
  "/:uid",
  validateRequestBody(bookSaleUpdateSchema),
  bookSaleController.patchBookSaleByUid.bind(bookSaleController)
);

bookSaleRouter.delete(
  "/:uid",
  bookSaleController.deleteBookSaleByUid.bind(bookSaleController)
);
