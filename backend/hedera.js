const { 
  Client, 
  TopicMessageSubmitTransaction,
  TokenMintTransaction,
  TokenBurnTransaction
} = require('@hashgraph/sdk');
require('dotenv').config();

const client = Client.forTestnet();
const { PrivateKey } = require('@hashgraph/sdk');
const privateKey = PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY);
client.setOperator(process.env.HEDERA_ACCOUNT_ID, privateKey);

// Anchor any event to HCS (tamper-proof timestamp)
async function anchorToHCS(message) {
  const tx = await new TopicMessageSubmitTransaction({
    topicId: process.env.HEDERA_TOPIC_ID,
    message: JSON.stringify(message)
  }).execute(client);
  const receipt = await tx.getReceipt(client);
  console.log('HCS sequence:', receipt.topicSequenceNumber.toString());
  return receipt.topicSequenceNumber.toString();
}

// Mint a carbon credit token
async function mintCredit(amount) {
  const tx = await new TokenMintTransaction()
    .setTokenId(process.env.HEDERA_TOKEN_ID)
    .setAmount(amount)
    .execute(client);
  const receipt = await tx.getReceipt(client);
  console.log('Minted:', amount, 'VCC tokens');
  return receipt;
}

// Retire (burn) a carbon credit token
async function retireCredit(amount) {
  const tx = await new TokenBurnTransaction()
    .setTokenId(process.env.HEDERA_TOKEN_ID)
    .setAmount(amount)
    .execute(client);
  const receipt = await tx.getReceipt(client);
  console.log('Retired:', amount, 'VCC tokens');
  return receipt;
}

module.exports = { anchorToHCS, mintCredit, retireCredit };
