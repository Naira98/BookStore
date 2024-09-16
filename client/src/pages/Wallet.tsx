import { useSelector } from "react-redux";
import { ReduxState } from "../redux/authSlice";
import { formatCurrency } from "../utils/helpers";
import { useState } from "react";
import { useAddMoney } from "../hooks/useAddMoney";
import SpinnerMini from "../components/SpinnerMini";

const Wallet = () => {
  const { wallet } = useSelector((state: ReduxState) => state.user)!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");

  const { addMoney, isPending } = useAddMoney();

  return (
    <>
      <div className="flex flex-col gap-4 px-20 py-16">
        <h1 className="text-xl">Your Credit: </h1>
        <h1 className="ml-24 text-2xl font-bold">{formatCurrency(wallet)}</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary mt-4 w-44"
        >
          Add Credit
        </button>
        {isOpen && (
          <div className="mt-6 flex gap-6">
            <select
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="rounded-md px-4 py-2 shadow-md outline-none"
            >
              <option disabled value="0">
                Select Amount
              </option>
              <option value="10">$10</option>
              <option value="25">$25 </option>
              <option value="50">$50</option>
              <option value="100">$100</option>
            </select>
            <button
              onClick={() => {
                addMoney(amount);
              }}
              className={`btn-secondary px-10 ${amount === "0" && "cursor-not-allowed"}`}
              disabled={amount == "0"}
            >
              {isPending && <SpinnerMini />}
              Pay
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallet;
