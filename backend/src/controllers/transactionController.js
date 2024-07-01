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
      "insert into coin_transactions (user_id, amount_coin, indent_id, currency ,transaction_date) values ($1, $2, $3, $4, now())",
      [
        req.body.userId,
        req.body.total_coin,
        req.body.paymentIntentId,
        req.body.currency,
      ]
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
      "insert into transactions (from_user, to_user, nft_id ,transaction_date, amount) values ($1, $2, $3, now(), $4)",
      [from, to, nftid, price]
    );

    const update_1 = await pool.query(
      "update users set amount = amount - $1 where user_id = $2",
      [price, from]
    );
    const update_2 = await pool.query(
      "update users set amount = amount + $1 where user_id = $2",
      [price, to]
    );

    const update_3 = await pool.query(
      "update nfts set owner = $1, sale_status = false where nft_id = $2",
      [from, nftid]
    );

    res.status(200).json({
      messages: "Done!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messages: "Something went wrong",
    });
  }
};

module.exports.coin_transaction_by_user_get = async (req, res) => {
  const userid = req.params.id;

  try {
    const data = await pool.query(
      "select * from coin_transactions where user_id = $1",
      [userid]
    );

    res.json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messages: "Bad request",
    });
  }
};

module.exports.nfts_transaction_by_user_get = async (req, res) => {
  const userid = req.params.id;

  try {
    const data = await pool.query(
      "select * from transactions where from_user = $1 or to_user = $1", [userid]
    );

    res.json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messages: "Bad request",
    });
  }
};
