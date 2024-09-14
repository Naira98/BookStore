import { Box } from "@mui/material";

const About = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <Box className="w-[40%] rounded-xl border-8 border-orange bg-amber-secondary px-4 py-4 shadow-lg">
        <h1 className="py-2 text-center text-3xl font-black text-orange">
          About US
        </h1>
        <h1>
          <span className="font-bold text-orange">The Bookshelf</span> is an
          online bookstore , We are passionate about making reading more
          accessible and affordable for everyone. Whether you're an avid reader
          or just getting started, our platform provides an extensive collection
          of books across various genres.{" "}
        </h1>
        <br />
        <h1>
          We believe that great stories should shared, not just owned. That's
          why we offer a convenient, eco-friendly, and budget-friendly way to
          enjoy your favorite books without the need to purchase. Simply browse
          our catalog, borrow the titles you love.
        </h1>
        <br />
        <h1>
          We make borrowing books easy, with affordable rates, and a
          user-friendly interface that ensures you can find and borrow books
          with just a few clicks. Our goal is to build a community of book
          lovers who want to explore new stories, share recommendations, and
          fall in love with reading all over again. Happy Reading! The Bookshelf
          Team
        </h1>
      </Box>
      <Box className="w-[40%] rounded-xl border-8 border-orange bg-amber-secondary px-4 py-4 shadow-lg">
        <h1 className="py-2 text-center text-3xl font-black text-orange">
          Borrowing Policy
        </h1>

        <h1>
          <span className="font-bold text-orange">
            Membership Requirements:{" "}
          </span>
          Provide accurate personal information, including a valid email address
          and contact number.
        </h1>
        <br />

        <h1>
          <span className="font-bold text-orange">Store Wallet System: </span>
          All borrowing fees must be paid through your store wallet. We do not
          accept cash, credit, or debit payments directly.
        </h1>
        <br />
        <h1>
          <span className="font-bold text-orange">Borrowing Deposit: </span>A
          refundable deposit is required for each book borrowed. The deposit
          amount will be clearly indicated at checkout.
        </h1>
        <br />

        <h1>
          <span className="font-bold text-orange">Borrowing Period: </span>
          The standard borrowing period is{" "}
          <span className="font-bold text-orange underline">14 days</span>. You
          are responsible for returning the book by the due date.
        </h1>
        <br />
        <h1>
          <span className="font-bold text-orange">Returning the Book: </span>
          When you return the book in good condition, your deposit will be fully
          refunded to your store wallet.
        </h1>
        <br />

        <h1>
          <span className="font-bold text-orange">Late Returns: </span>A late
          fee of{" "}
          <span className="font-bold text-orange underline">
            10% of book price
          </span>{" "}
          will be charged for each day a book is overdue. If the deposit does
          not cover the full late fee, additional charges will be applied to
          your store wallet.
        </h1>
        <br />
      </Box>
    </div>
  );
};

export default About;
