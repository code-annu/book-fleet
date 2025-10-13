import { Book } from "../../entity/book";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class GetBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(uid: string): Promise<Book> {
    const bookSale = await this.bookRepository.getBook(uid);
    if (bookSale == null) {
      throw new CustomError("Book sale not found!", ErrorType.NOT_FOUND);
    }
    return bookSale;
  }
}
