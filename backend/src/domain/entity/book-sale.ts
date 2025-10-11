export interface BookSale {
  uid: string;
  title: string;
  seller_uid: string;
  price: string;
  thumbnail_url: string;
  pickup_address: string;
  description: string;
  book_condition: BookCondition;
  sold_out: boolean;
  created_at: string;
}

export enum BookCondition {
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export interface BookSaleCreate
  extends Pick<
    BookSale,
    | "title"
    | "seller_uid"
    | "price"
    | "thumbnail_url"
    | "pickup_address"
    | "description"
    | "book_condition"
    | "sold_out"
  > {}

export interface BookSaleUpdate extends Partial<BookSaleCreate> {}
