import { Book, BookCreate } from "../../entity/book";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";

export class CreateNewBookSale {
  constructor(
    private readonly bookRepo: IBookRepository,
    private readonly profileRepo: IUserProfileRepository
  ) {}

  async execute(bookSaleCreate: BookCreate): Promise<Book> {
    const userProfile = await this.profileRepo.getUserProfile(
      bookSaleCreate.seller_uid
    );
    if (userProfile == null) {
      throw new CustomError(
        "You need to create profile before creating sale for book.",
        ErrorType.FORBIDDEN
      );
    }
    return this.bookRepo.createBook(bookSaleCreate);
  }
}
