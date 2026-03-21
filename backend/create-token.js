const { Client, TokenCreateTransaction, TokenType, PrivateKey, Hbar } = require('@hashgraph/sdk');
require('dotenv').config();

async function createToken() {
  try {
    console.log('Connecting to Hedera testnet...');
    
    const client = Client.forTestnet();
    const privateKey = PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY);
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, privateKey);
    client.setRequestTimeout(60000);

    console.log('Creating token...');
    const tx = await new TokenCreateTransaction()
      .setTokenName('VeriDiChain Carbon Credit')
      .setTokenSymbol('VCC')
      .setTokenType(TokenType.FungibleCommon)
      .setInitialSupply(0)
      .setDecimals(0)
      .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
      .setMaxTransactionFee(new Hbar(10))
      .freezeWith(client)
      .sign(privateKey);

    const txResponse = await tx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    console.log('Token ID:', receipt.tokenId.toString());
    client.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createToken();