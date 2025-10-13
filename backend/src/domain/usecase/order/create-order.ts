import { Order, OrderCreate, OrderStatus } from "../../entity/order";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";
import { IOrderRepository } from "../../repository/iorder-repository";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";

export class CreateOrder {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly bookRepo: IBookRepository,
    private readonly profileRepo: IUserProfileRepository
  ) {}

  async execute(creatorUid: string, bookUid: string): Promise<Order> {
    const orderCreator = await this.profileRepo.getUserProfile(creatorUid);
    if (orderCreator == null) {
      throw new CustomError(
        "You need to create profile before placing an order",
        ErrorType.FORBIDDEN
      );
    }
    const book = await this.bookRepo.getBook(bookUid);
    if (book == null) {
      throw new CustomError("Book not found", ErrorType.NOT_FOUND);
    }
    if (book.seller_uid == creatorUid) {
      throw new CustomError(
        "A seller cannot create order for it's own book",
        ErrorType.FORBIDDEN
      );
    }
    const order = await this.orderRepo.createOrder({
      seller_uid: book.seller_uid,
      buyer_uid: creatorUid,
      status: OrderStatus.CONFIRMED,
      book_uid: bookUid,
    });

    return order;
  }
}
