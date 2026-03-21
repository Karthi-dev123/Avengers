const { Client, TopicCreateTransaction, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

async function createTopic() {
  try {
    console.log('Connecting to Hedera testnet...');
    
    const client = Client.forTestnet();
    const privateKey = PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY);
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, privateKey);
    
    // Try different node
    client.setMaxAttempts(3);
    client.setMaxNodeAttempts(1);
    client.setRequestTimeout(60000);

    console.log('Creating topic...');
    const tx = await new TopicCreateTransaction()
      .setTransactionValidDuration(180)
      .setMaxTransactionFee(new (require('@hashgraph/sdk').Hbar)(2))
      .execute(client);
    const receipt = await tx.getReceipt(client);
    console.log('Topic ID:', receipt.topicId.toString());
    client.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createTopic();
