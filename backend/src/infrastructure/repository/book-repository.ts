import {
  BookCreate,
  Book,
  BookUpdate,
} from "../../domain/entity/book";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IBookRepository } from "../../domain/repository/ibook-sale-repository";
import { BaseRepository } from "./base-repository";

const BOOKS_TABLE = "books";
export class BookRepository extends BaseRepository implements IBookRepository {
  constructor() {
    super(BOOKS_TABLE);
  }

  async createBook(bookSaleCreate: BookCreate): Promise<Book> {
    const { data, error } = await super.insert(bookSaleCreate);
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Book;
  }

  async getBook(uid: string): Promise<Book | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Book;
  }

  async updateBook(
    uid: string,
    updates: BookUpdate
  ): Promise<Book | null> {
    const { data, error } = await super.update(uid, updates);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Book;
  }

  async deleteBook(uid: string): Promise<Book | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Book;
  }
}
