import { Response } from "express";
import { CreateNewBookSale } from "../../domain/usecase/book/create-new-book-sale";
import { GetBookSale } from "../../domain/usecase/book/get-book-sale";
import { UpdateBookSale } from "../../domain/usecase/book/update-book-sale";
import { DeleteBookSale } from "../../domain/usecase/book/delete-book-sale";
import { IBookRepository } from "../../domain/repository/ibook-sale-repository";
import { CustomError } from "../../domain/error/custom-error";
import { AuthRequest } from "../middleware/auth-middleware";
import { IUserProfileRepository } from "../../domain/repository/iuser-profile-repository";

export class BookController {
  private createBookSale: CreateNewBookSale;
  private getBookSale: GetBookSale;
  private updateBookSale: UpdateBookSale;
  private deleteBookSale: DeleteBookSale;

  constructor(
    bookRepo: IBookRepository,
    userProfileRepo: IUserProfileRepository
  ) {
    this.createBookSale = new CreateNewBookSale(bookRepo, userProfileRepo);
    this.getBookSale = new GetBookSale(bookRepo);
    this.updateBookSale = new UpdateBookSale(bookRepo);
    this.deleteBookSale = new DeleteBookSale(bookRepo);
  }

  async postBookSale(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const userUid = req.auth?.userId;
      const bookSale = await this.createBookSale.execute({
        ...data,
        seller_uid: userUid,
      });

      res.status(201).json(bookSale);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async getBookSaleByUid(req: AuthRequest, res: Response) {
    try {
      const { uid } = req.params;
      if (!uid) {
        return res
          .status(400)
          .json({ message: "Book sale id required in path" });
      }
      const bookSale = await this.getBookSale.execute(uid);

      res.status(200).json(bookSale);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async patchBookSaleByUid(req: AuthRequest, res: Response) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const userUid = req.auth?.userId;
      if (!uid) {
        return res
          .status(400)
          .json({ message: "Book sale id required in path" });
      }
      const bookSale = await this.updateBookSale.execute(uid, userUid!, data);
      console.log(bookSale);

      res.status(200).json(bookSale);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async deleteBookSaleByUid(req: AuthRequest, res: Response) {
    try {
      const { uid } = req.params;
      const userUid = req.auth?.userId;
      if (!uid) {
        return res
          .status(400)
          .json({ message: "Book sale id required in path" });
      }
      const bookSale = await this.deleteBookSale.execute(uid, userUid!);

      res.status(200).json(bookSale);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
