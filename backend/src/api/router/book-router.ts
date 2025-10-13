import { Router } from "express";
import { BookController } from "../controller/book-controller";
import { BookRepository } from "../../infrastructure/repository/book-repository";
import { validateRequestBody } from "../middleware/validate-request-body";
import { bookCreateSchema, bookUpdateSchema } from "../schema/book-schema";
import { UserProfileRepository } from "../../infrastructure/repository/user-profile-repository";

export const bookRouter = Router();
const bookController = new BookController(
  new BookRepository(),
  new UserProfileRepository()
);

bookRouter.post(
  "/",
  validateRequestBody(bookCreateSchema),
  bookController.postBookSale.bind(bookController)
);

bookRouter.get(
  "/:uid",
  bookController.getBookSaleByUid.bind(bookController)
);

bookRouter.patch(
  "/:uid",
  validateRequestBody(bookUpdateSchema),
  bookController.patchBookSaleByUid.bind(bookController)
);

bookRouter.delete(
  "/:uid",
  bookController.deleteBookSaleByUid.bind(bookController)
);
