import { BookSale } from "../../entity/book-sale";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class DeleteBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(uid: string, userUid: string): Promise<BookSale> {
    const bookSale = await this.bookRepository.getBookSale(uid);
    if (bookSale == null) {
      throw new CustomError("Book sale not found!", ErrorType.NOT_FOUND);
    }
    if (bookSale.seller_uid !== userUid) {
      throw new CustomError(
        "You are not allowed to delete this book sale.",
        ErrorType.FORBIDDEN
      );
    }

    const updatedBookSale = await this.bookRepository.deleteBookSale(uid);

    return updatedBookSale!!;
  }
}
