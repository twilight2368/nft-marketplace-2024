const express = require("express");
const env = require("dotenv");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const ether = require("ethers");
const fs = require("fs");
const FormData = require("form-data");

const abiJSON = require("../JSON/MyNFT#MyNFT.json");

env.config();

const minting_route = express();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

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

minting_route.post("/minting", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

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
      description: req.body.NFTdescription,
      image: "https://ipfs.io/ipfs/" + imagePinResponse.data.IpfsHash,
    };

    const metadataFileName = `${Date.now()}-${uuidv4()}-metadata.json`;
    const metadataFilePath = `${
      path.join(__dirname, "../assets/meta/") + metadataFileName
    }`;
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));
    //todo: Pin metadata to pinata ipfs
    const meatadataPinResponse = await pinFiletoPinata(
      metadataFilePath,
      metadataFileName,
      process.env.PINATA_JWT
    );

    console.log(meatadataPinResponse.data);
    //todo: Minting using smart contract with token URI

    //todo: Saving data to database
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
});

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

module.exports = minting_route;
