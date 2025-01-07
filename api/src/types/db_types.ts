export type ERoleType = "super_admin" | "admin" | "courier" | "user";
export type EPaymentMethod = "cash" | "wallet";

export type EBorrowStatus =
  | "wait_for_pickup_approval"  // added
  | "picked_up"
  | "not_delivered_yet"         // added
  | "borrow_problem"
  | "delivered"
  | "return_delivery_created"
  | "wait_for_return_approval"  // added
  | "returned"
  | "return_problem";

export type ENotificationStatus =
  | "wait_for_pickup_approval" // added
  | "wallet_payment_approved" // added
  | "wallet_payment_rejected" // added
  | "borrow_started" //
  | "borrow_delivery_created" // added
  | "borrow_delivery_on_the_way"
  | "borrow_delivery_problem"
  | "borrow_problem"
  | "wait_for_return_approval" // added
  | "return_approved"
  | "return_problem"
  | "return_delivery_created" // added
  | "return_delivery_problem";

export type EOrderStatus = "not_delivered_yet" | "delivered" | "problem";

export type EDeliveryTask = "borrow" | "return";

export interface IUser {
  id: number;
  created_at: Date;
  updated_at: Date;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  wallet: number;
  picture: string | null;
  cloudinary_public_id: string | null;
  role: ERoleType;
}

export interface IToken {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  refresh_token: string;
}

export interface ISetting {
  id: number;
  created_at: Date;
  updated_at: Date;
  borrow_days: number;
  delay_fees_per_day: number;
  delivery_fees: number;
  free_delivery_fees: number;
}

export interface INotification {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  notification: string;
  seen: boolean;
  status: ENotificationStatus;
}

export interface IAuthor {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}

export interface ICategory {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}

export interface IBook {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string | null;
  all_copies: number;
  copies_in_stock: number;
  borrow_fees: number;
  deposit: number;
  picture: string | null;
  cloudinary_public_id?: string | null;
  publish_year: number | null;
  author_id: number;
  category_id: number;
}

export interface IBorrow {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  sub_total: number;
  is_paid: boolean;
  payment_method: EPaymentMethod;
}

export interface IReturn {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  return_payment_method: EPaymentMethod;
}

export interface IBorrowBook {
  id: number;
  created_at: Date;
  updated_at: Date;
  borrow_id: number;
  book_id: number;
  return_id: number | null;
  borrow_fees: number;
  deposit: number;
  quantity: number;
  start_date: Date | null;
  return_date: Date | null;
  borrow_status: EBorrowStatus;
}

export interface IDelivery {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  delivery_task: EDeliveryTask;
  borrow_id: number | null;
  return_id: number | null;
  address: string;
  delivery_fees: number;
  order_status: EOrderStatus;
}

export interface IWishlist {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  book_id: number;
}

export interface ICart {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  book_id: number;
  quantity: number;
}

export interface IStripeSession {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  session_id: string;
}
