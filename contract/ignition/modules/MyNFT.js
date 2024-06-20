const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require('dotenv').config()

module.exports = buildModule("MyNFT", (m) => {
  const nft_contract = m.contract("MyNFT", [process.env.PUBLIC_KEY]);

  return { nft_contract };
});