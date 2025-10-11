import { BookSale, BookSaleCreate } from "../../entity/book-sale";
import { IBookRepository } from "../../repository/ibook-sale-repository";

export class CreateNewBookSale {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookSaleCreate: BookSaleCreate): Promise<BookSale> {
    return this.bookRepository.createBookSale(bookSaleCreate);
  }
}
