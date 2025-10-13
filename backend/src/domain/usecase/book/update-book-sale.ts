import { Book, BookUpdate } from "../../entity/book";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class UpdateBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(
    uid: string,
    userUid: string,
    updates: BookUpdate
  ): Promise<Book> {
    const bookSale = await this.bookRepository.getBook(uid);
    if (bookSale == null) {
      throw new CustomError("Book sale not found!", ErrorType.NOT_FOUND);
    }
    if (bookSale.seller_uid !== userUid) {
      throw new CustomError(
        "You are not allowed to update this book sale.",
        ErrorType.FORBIDDEN
      );
    }

    const updatedBookSale = await this.bookRepository.updateBook(
      uid,
      updates
    );
    return updatedBookSale!!;
  }
}
