import { Book, BookCreate, BookUpdate } from "../entity/book";

export interface IBookRepository {
  createBook(
    bookSaleCreate: BookCreate
  ): Promise<Book>;

  getBook(uid: string): Promise<Book | null>;

  updateBook(
    uid: string,
    updates: BookUpdate
  ): Promise<Book | null>;

  deleteBook(uid: string): Promise<Book | null>;
}
