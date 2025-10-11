import {
  BookSaleCreate,
  BookSale,
  BookSaleUpdate,
} from "../../domain/entity/book-sale";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IBookRepository } from "../../domain/repository/ibook-sale-repository";
import { BaseRepository } from "./base-repository";

const BOOKS_TABLE = "books";
export class BookRepository extends BaseRepository implements IBookRepository {
  constructor() {
    super(BOOKS_TABLE);
  }

  async createBookSale(bookSaleCreate: BookSaleCreate): Promise<BookSale> {
    const { data, error } = await super.insert(bookSaleCreate);
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as BookSale;
  }

  async getBookSale(uid: string): Promise<BookSale | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as BookSale;
  }

  async updateBookSale(
    uid: string,
    updates: BookSaleUpdate
  ): Promise<BookSale | null> {
    const { data, error } = await super.update(uid, updates);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as BookSale;
  }

  async deleteBookSale(uid: string): Promise<BookSale | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as BookSale;
  }
}
