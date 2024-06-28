const env = require("dotenv");
const pool = require("../connection/database");
const { json } = require("express");
env.config();

module.exports.nft_get = async (req, res) => {
  try {
    const data = await pool.query(
      "select nft_id, nft_name, image_url, price from nfts"
    );
    //console.log(data.rows);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Data not found",
    });
  }
};

module.exports.one_nft_get = async (req, res) => {
  //console.log(req.params);

  try {
    const data = await pool.query(
      "select nft_id, nfts.nft_name, nfts.description, nfts.sale_status, nfts.price, nfts.token_url, nfts.image_url ,users.user_name, mint_transactions.transaction_hash  from (nfts join users on (nfts.creator = users.user_id) join mint_transactions on (mint_transactions.mint_transaction_id = nfts.mint_transaction)) where nft_id = $1",
      [req.params["id"]]
    );
    console.log(data);
    if (data.rowCount === 0) {
      throw new Error("Not found");
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports.user_get = async (req, res) => {
  const userid = req.params["id"];
  //console.log(userid);
  try {
    if (userid !== undefined) {
      const data = await pool.query("select * from users where user_id = $1", [
        userid,
      ]);

      if (data.rowCount === 0) {
        throw new Error("Not found");
      }

      res.status(200).json(data.rows[0]);
    } else {
      res.status(404).json({
        message: "Bad dog",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports.get_artist = async (req, res) => {
  //do something
};
