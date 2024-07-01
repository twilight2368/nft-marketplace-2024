const pool = require("../connection/database");

async function ownerRequire(req, res, next) {
  try {
    const userid = req.body.userid;
    const nftid = req.body.nftid;

   

    const data = await pool.query("select owner from nfts where nft_id = $1", [
      nftid,
    ]);

    if (data.rowCount === 0) {
      throw new Error("No data found");
    }


    if (data.rows[0].owner !== parseInt(userid)) {
      throw new Error("Not owner");
    }

    next();
  } catch (error) {
    res.status(400).json({
      messages: error.messages,
    });
  }
}

module.exports = ownerRequire;