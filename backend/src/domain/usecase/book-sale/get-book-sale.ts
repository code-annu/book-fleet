import { BookSale } from "../../entity/book-sale";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class GetBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(uid: string): Promise<BookSale> {
    const bookSale = await this.bookRepository.getBookSale(uid);
    if (bookSale == null) {
      throw new CustomError("Book sale not found!", ErrorType.NOT_FOUND);
    }
    return bookSale;
  }
}
