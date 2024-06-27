const express = require("express");
const env = require("dotenv");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { ethers, JsonRpcProvider } = require("ethers");
const fs = require("fs");
const FormData = require("form-data");
const pool = require("../connection/database");

const abiJSON = require("../JSON/MyNFT#MyNFT.json");
const requireAuth = require("../middlewares/authRequire");

env.config();

const minting_route = express();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

minting_route.post(
  "/minting",
  requireAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      if (file === undefined) {
        throw new Error("No file");
      }

      // Log the request data to see how it is structured
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);

      //todo: Pin image to pinata ipfs
      const imagePinResponse = await pinFiletoPinata(
        file.path,
        file.filename,
        process.env.PINATA_JWT
      );

      console.log(imagePinResponse.data);
      //todo: Write METADATA file to local storage
      const metadata = {
        name: req.body.NFTname,
        artist: req.body.NFTArtist,
        description: req.body.NFTdescription,
        image: "https://ipfs.io/ipfs/" + imagePinResponse.data.IpfsHash,
      };

      const metadataFileName = `${Date.now()}-${uuidv4()}-metadata.json`;
      const metadataFilePath = `${
        path.join(__dirname, "../assets/meta/") + metadataFileName
      }`;
      fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));
      //todo: Pin metadata to pinata ipfs
      const metadataPinResponse = await pinFiletoPinata(
        metadataFilePath,
        metadataFileName,
        process.env.PINATA_JWT
      );

      console.log(metadataPinResponse.data);
      //todo: Minting using smart contract with token URI
      const dataMint = await mintNFT(metadataPinResponse.data.IpfsHash);

      console.log(dataMint);

      if (dataMint.code !== 0) {
        throw new Error("Minting problems");
      }

      const insertTransaction = await pool.query(
        "insert into mint_transactions (block_number, transaction_hash, transaction_fee, creator) values ($1 , $2, $3, $4) returning mint_transaction_id",
        [dataMint.blocknumber, dataMint.tx, 0, req.body.NFTUserID]
      );

      if (insertTransaction.rowCount === 0) {
        throw new Error("Opp! fail insert but still minted");
      }

      const insertNFT = await pool.query(
        "insert into nfts (nft_name, owner, creator, description, token_url, imagePath, mint_transaction, sale_status, price) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          req.body.NFTname,
          req.body.NFTUserID,
          req.body.NFTUserID,
          req.body.NFTdescription,
          metadataPinResponse.data.IpfsHash,
          file.path,
          insertTransaction.rows[0]["mint_transaction_id"],
          req.body.NFTsale,
          req.body.NFTPrice,
        ]
      );

      if (insertNFT.rowCount === 0) {
        throw new Error("Opp! fail insert but still minted");
      }

      console.log("Done successfully");

      res.status(200).json({
        message: "Successfully minted",
        name: req.body.NFTname,
        artist: req.body.NFTUserID,
        description: req.body.NFTdescription,
        ipfs: metadataPinResponse.data.IpfsHash,
        transaction: dataMint.tx,
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  }
);

//todo: Pin file to pinata ipfs
const pinFiletoPinata = async (filepath, filename, JWT) => {
  try {
    const formData = new FormData();

    const file = fs.createReadStream(filepath);
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: filename,
    });

    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          maxContentLength: "Infinity", // this is needed to prevent axios from erroring out with large files
          maxBodyLength: "Infinity",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Minting using smart contract with token URI
async function mintNFT(metadataIPFS) {
  try {
    const provider = new JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    );
    //console.log('Provider:', provider);

    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    //console.log('Wallet:', wallet);

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abiJSON["abi"],
      wallet
    );
    //console.log('Contract:', contract);

    // Minting logic here
    const tokenURI = `ipfs://${metadataIPFS}`;
    const tx = await contract.safeMint(wallet.address, tokenURI);
    //console.log(tx);
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(receipt);
    return {
      code: 0,
      message: "Successfully minted",
      tx: receipt.hash,
      blocknumber: receipt.blockNumber,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      code: 1,
      message: "Fail on minting",
      tx: undefined,
    };
  }
}

module.exports = minting_route;
