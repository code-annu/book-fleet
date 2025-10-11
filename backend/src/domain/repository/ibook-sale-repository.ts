import { BookSale, BookSaleCreate, BookSaleUpdate } from "../entity/book-sale";

export interface IBookRepository {
  createBookSale(
    bookSaleCreate: BookSaleCreate
  ): Promise<BookSale>;

  getBookSale(uid: string): Promise<BookSale | null>;

  updateBookSale(
    uid: string,
    updates: BookSaleUpdate
  ): Promise<BookSale | null>;

  deleteBookSale(uid: string): Promise<BookSale | null>;
}
