const pool = require("../connection/database");
const env = require("dotenv");
const Stripe = require("stripe");

env.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports.create_intendent = async (req, res) => {
  try {
    console.log(req.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports.handle_success_transaction = async (req, res) => {
  console.log(req.body);
  try {
    const insert = await pool.query(
      "insert into coin_transactions (user_id, amount_coin, transaction_date) values ($1, $2, now())",
      [req.body.userId, req.body.total_coin]
    );

    const udpate = await pool.query(
      "update users set amount = amount + $1 where user_id = $2",
      [req.body.total_coin, req.body.userId]
    );

    res.status(200).json({
      messages: "Ok!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messages: "something went wrong",
    });
  }
};

module.exports.make_transaction_nft_post = async (req, res) => {
  try {
    const to = req.destination_id;
    const from = req.body.userid;
    const nftid = req.body.nftid;
    const price = req.price_nft;

    console.log(to);
    console.log(from);
    console.log(nftid);
    console.log(price);

    const insert = await pool.query(
      "insert into tranactions (from_user, to_user, nft_id ,transaction_date, amount) values ($1, $2, $3, now(), $4)",
      [from, to, nftid, price]
    );

    const update_1 = await pool.query(
      "update users set amount = amount - price where userid = $1",
      [from]
    );
    const update_2 = await pool.query(
      "update users set amount = amount + price where userid = $1",
      [to]
    );

    res.status(200).json({
      messages: "Done!",
    });
  } catch (error) {
    res.status.json({
      messages: "something went wrong",
    });
  }
};
