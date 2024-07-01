const pool = require("../connection/database");

async function balanceRequire(req, res, next) {
  try {
    const userid = req.body.userid;
    const nftid = req.body.nftid;

    const balance = await pool.query(
      "select amount from users where user_id = $1",
      [userid]
    );

    const price = await pool.query("select price from nfts where nft_id = $1", [
      nftid,
    ]);

    if (balance.rowCount === 0 || price.rowCount === 0) {
      throw new Error("No data found");
    }

    if (balance.rows[0].amount < price.rows[0].price) {
      throw new Error("No enough coin");
    }

    req.price_nft = price.rows[0].price;
    
    next();
  } catch (error) {
    res.status(400).json({
      messages: error.messages,
    });
  }
}

module.exports = balanceRequire;
