import { Link } from "react-router-dom";

const CheckWallet = () => {
  return (
    <Link to="/wallet">
      <button className="btn-primary fixed bottom-8 right-8 w-44 py-5">
        Check Wallet
      </button>
    </Link>
  );
};

export default CheckWallet;
