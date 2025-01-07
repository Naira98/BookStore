import { ISetting } from "../types/db_types";

export const calcStartEndDates = (borrow_days: ISetting["borrow_days"]) => {
  const start_date = new Date();

  const return_date = new Date(
    start_date.getTime() + 1000 * 60 * 60 * 24 * borrow_days
  );
  return { start_date, return_date };
};
