export interface Book {
  uid: string;
  title: string;
  seller_uid: string;
  price: string;
  thumbnail_url: string;
  pickup_address: string;
  description: string;
  book_condition: BookCondition;
  sold_out: boolean;
  available: boolean;
  created_at: string;
}

export enum BookCondition {
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export interface BookCreate
  extends Pick<
    Book,
    | "title"
    | "seller_uid"
    | "price"
    | "thumbnail_url"
    | "pickup_address"
    | "description"
    | "book_condition"
  > {}

export interface BookUpdate extends Partial<BookCreate> {
  sold_out: boolean;
  available: boolean;
}
