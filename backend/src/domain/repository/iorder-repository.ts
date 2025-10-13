import { Order, OrderCreate } from "../entity/order";

export interface IOrderRepository {
  createOrder(orderData: OrderCreate): Promise<Order>;
  getOrderByUid(uid: string): Promise<Order | null>;
  updateOrderByUid(uid: string): Promise<Order | null>;
  deleteOrderByUid(uid: string): Promise<Order | null>;
  listOrderBySellerUid(sellerUid: string): Promise<Order[]>;
  listOrderByBuyerUid(sellerUid: string): Promise<Order[]>;
  listOrderByDeliveryPartnerUid(sellerUid: string): Promise<Order[]>;
}
