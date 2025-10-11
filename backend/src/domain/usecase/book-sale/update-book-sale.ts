import { BookSale, BookSaleUpdate } from "../../entity/book-sale";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class UpdateBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(
    uid: string,
    userUid: string,
    updates: BookSaleUpdate
  ): Promise<BookSale> {
    const bookSale = await this.bookRepository.getBookSale(uid);
    if (bookSale == null) {
      throw new CustomError("Book sale not found!", ErrorType.NOT_FOUND);
    }
    if (bookSale.seller_uid !== userUid) {
      throw new CustomError(
        "You are not allowed to update this book sale.",
        ErrorType.FORBIDDEN
      );
    }

    const updatedBookSale = await this.bookRepository.updateBookSale(
      uid,
      updates
    );
    return updatedBookSale!!;
  }
}
