import { Order, OrderStatus } from "../../entity/order";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IBookRepository } from "../../repository/ibook-sale-repository";
import { IOrderRepository } from "../../repository/iorder-repository";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";

export class GetOrder {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly bookRepo: IBookRepository,
    private readonly profileRepo: IUserProfileRepository
  ) {}
}
