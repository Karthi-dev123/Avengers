const pinataSDK = require('@pinata/sdk');
require('dotenv').config();

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);

async function uploadToIPFS(data, name) {
  const result = await pinata.pinJSONToIPFS(data, {
    pinataMetadata: { name }
  });
  return result.IpfsHash; // this is the CID
}

module.exports = { uploadToIPFS };