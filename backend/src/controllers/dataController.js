const env = require("dotenv");
const pool = require("../connection/database");
const bcrypt = require("bcrypt");
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
  console.log(req.params["id"]);

  try {
    const data = await pool.query(
      "select nft_id, nfts.nft_name, nfts.description, nfts.sale_status, nfts.price, nfts.token_url, nfts.image_url, nfts.creator ,users.user_name, mint_transactions.transaction_hash  from (nfts join users on (nfts.creator = users.user_id) join mint_transactions on (mint_transactions.mint_transaction_id = nfts.mint_transaction)) where nft_id = $1",
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

module.exports.artist_get = async (req, res) => {
  //do something

  const artist_id = req.params.id;

  try {
    const data_1 = await pool.query(
      "select user_name, account_name, gender, age, email from users where user_id = $1",
      [artist_id]
    );

    if (data_1.rowCount === 0) {
      throw new Error("No user found");
    }

    const data_2 = await pool.query(
      "select nft_id, nft_name, image_url, price from nfts where creator = $1",
      [artist_id]
    );

    const data_3 = await pool.query(
      "select nft_id, nft_name, image_url, price from nfts where owner = $1",
      [artist_id]
    );

    res.status(200).json({
      user_data: data_1.rows[0],
      created_nfts: data_2.rows,
      owned_nft: data_3.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.messages,
    });
  }
};

module.exports.user_dashboard_get = async (req, res) => {
  const userid = req.params.id;

  try {
    const data_1 = await pool.query(
      "select nft_id, nft_name, iamge_url, price from nfts where owner = $1",
      [userid]
    );

    const data_2 = await pool.query(
      "select nft_id, nft_name, iamge_url, price from nfts where creator = $1",
      [userid]
    );

    res.status(200).json({
      created_nfts: data_2.rows,
      owned_nfts: data_1.rows,
    });
  } catch (error) {
    re.status(400).json({
      message: "Bad request",
    });
  }
};

module.exports.change_username_post = async (req, res) => {
  console.log(req.body);

  const new_username = req.body.username;
  const userid = req.body.userid;

  try {
    const update = await pool.query(
      "update users set (user_name = $1) where user_id = $2 returning user_name",
      [new_username, userid]
    );

    console.log(update);

    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.messages,
    });
  }
};

module.exports.change_password_post = async (req, res) => {
  console.log(req.body);
  try {
    const userid = req.body.userid;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);

    const update = await pool.query(
      "update users set (password = $1) where user_id = $2",
      [hashpass, userid]
    );

    //console.log(update);

    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "bad request" });
  }
};

module.exports.change_gender_age_post = async (req, res) => {
  console.log(req.body);

  const userid = req.body.userid;
  const user_age = req.body.age;
  const gender = req.body.gender;

  try {
    if (user_age <= 13 || !(gender === 0 || gender === 1)) {
      throw new Error("Bad request");
    }

    const update = await pool.query(
      "update users set (age = $1, gender = $2) where user_id = $3",
      [user_age, gender, userid]
    );

    res.status(200).json({
      message: "Update successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.messages,
    });
  }
};

module.exports.change_email_post = async (req, res) => {
  console.log(req.body);

  const new_email = req.body.email;
  const userid = req.body.userid;

  try {
    const update = await pool.query(
      "update users set (email = $1) where user_id = $2 returning email",
      [new_email, userid]
    );

    console.log(update);

    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.messages,
    });
  }
};

module.exports.change_nft_sale_post = async (req, res) => {
  const nft_id = req.body.nft_id;

  try {
    const update = pool.query("update nfts set (sale = t) where nft_id = $1", [
      nft_id,
    ]);

    res.status(200).json({
      message: "Updated successful",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

module.exports.nft_not_sale_user_get = async (req, res) => {
  console.log(req.params["userid"]);
  const user_id = req.params["userid"];
  try {
    const data = await pool.query(
      "select nft_id, nft_name, image_url, price from nfts where owner = $1 and sale = 0",
      [user_id]
    );

    res.status(200).json(data.rows);
  } catch (error) {
    res.status(400).json({
      message: error.messages,
    });
  }
};

module.exports.sale_nft_by_users_get = async (req, res) => {
  const userid = req.params["userid"];

  try {
    const data = await pool.query(
      "select nft_id, nft_name, image_url, price from nfts where sale = 1 and owner = $1",
      [userid]
    );

    res.json(data.rows);
  } catch (error) {
    res.status(400).json({
      message: error.messages,
    });
  }
};

module.exports.price_get = async (req, res) => {
  try {
    const data = await pool.query("select * from coin");

    if (data.rowCount === 0) {
      throw new Error("Some thing went wrong")
    }

    console.log(data.rows[0]);

    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({
      messages: error.messages,
    });
  }
};
