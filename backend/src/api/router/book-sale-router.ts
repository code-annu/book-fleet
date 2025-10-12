import { Router } from "express";
import { BookSaleController } from "../controller/book-sale-controller";
import { BookRepository } from "../../infrastructure/repository/book-repository";
import { validateRequestBody } from "../middleware/validate-request-body";
import { bookCreateSchema, bookUpdateSchema } from "../schema/book-schema";
import { UserProfileRepository } from "../../infrastructure/repository/user-profile-repository";

export const bookSaleRouter = Router();
const bookSaleController = new BookSaleController(
  new BookRepository(),
  new UserProfileRepository()
);

bookSaleRouter.post(
  "/",
  validateRequestBody(bookCreateSchema),
  bookSaleController.postBookSale.bind(bookSaleController)
);

bookSaleRouter.get(
  "/:uid",
  bookSaleController.getBookSaleByUid.bind(bookSaleController)
);

bookSaleRouter.patch(
  "/:uid",
  validateRequestBody(bookUpdateSchema),
  bookSaleController.patchBookSaleByUid.bind(bookSaleController)
);

bookSaleRouter.delete(
  "/:uid",
  bookSaleController.deleteBookSaleByUid.bind(bookSaleController)
);
