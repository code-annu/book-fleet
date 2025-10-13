export enum OrderStatus {
  CONFIRMED = "confirmed", // Order has been confirmed by the buyer.
  SHIPPED = "shipped", // Order is packed and prepared for dispatch by the seller.
  DISPATCHED = "dispatched", // Order is picked from seller by the delivery agent. (Now it's delivery to out for delivery the order)
  OUT_FOR_DELIVERY = "out_for_delivery", // Order is order for delivery by the agent
  DELIVERED = "delivered", // Order is delivered by to buyer by the delivery agent
  CANCELLED = "cancelled", // Order is cancelled
}

export interface Order {
  uid: string;
  seller_uid: string;
  buyer_uid: string;
  delivery_partner_uid?: string;
  book_uid: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderCreate
  extends Pick<Order, "seller_uid" | "buyer_uid" | "book_uid" | "status"> {}

export interface OrderUpdate
  extends Partial<
    Pick<Order, "delivery_partner_uid" | "status" | "updated_at">
  > {}
