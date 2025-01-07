import { IBook, ICart } from "../types/db_types";

export function calcCartPrices(
  cart: (ICart & IBook)[],
  free_delivery_fees: number,
  delivery_fees_settings: number,
  borrow_method: "pick_up" | "delivery"
) {
  let delivery_fees = 0;
  let sub_total = 0;
  let total = 0;
  cart.map((cart_item) => {
    sub_total +=
      (+cart_item.borrow_fees + +cart_item.deposit) * +cart_item.quantity;
  });

  total = sub_total;

  if (borrow_method == "delivery" && sub_total < free_delivery_fees) {
    delivery_fees = delivery_fees_settings;
    total = sub_total + +delivery_fees_settings;
  }
  return { total, sub_total, delivery_fees };
}
