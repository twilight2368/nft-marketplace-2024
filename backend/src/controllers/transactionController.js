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
