const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Placeholder — Member 2 will give you the real hedera.js
// const { anchorToHCS, mintCredit, retireCredit } = require('./hedera');

// ---- DUMMY DATA (Member 1 can start building against this) ----
const dummyCredits = [
  { id: 'CRD001', project: 'Solar Farm Chennai', tonnes: 500, status: 'Minted', confidence: 88 },
  { id: 'CRD002', project: 'Wind Energy Rajasthan', tonnes: 1200, status: 'Pending', confidence: 72 },
  { id: 'CRD003', project: 'Mangrove Restoration', tonnes: 300, status: 'Retired', confidence: 91 },
];

// ---- ENDPOINTS ----

app.post('/sensor-data', async (req, res) => {
  console.log('Sensor data received:', req.body);
  res.json({ message: 'Received', cid: 'dummy-cid-123', hcsSequence: 1 });
});

app.post('/apply-credit', async (req, res) => {
  console.log('Credit application:', req.body);
  res.json({ message: 'Application submitted', applicationId: 'APP-' + Date.now() });
});

app.post('/approve-credit', async (req, res) => {
  console.log('Approving credit:', req.body);
  res.json({ message: 'Credit approved and minted', tokenId: 'dummy-token-001' });
});

app.get('/credits', async (req, res) => {
  res.json(dummyCredits); // real data replaces this on Day 3
});

app.post('/retire-credit', async (req, res) => {
  console.log('Retiring credit:', req.body);
  res.json({ message: 'Credit retired', certificateIpfs: 'https://ipfs.io/ipfs/dummy-cert' });
});

app.get('/audit/:creditId', async (req, res) => {
  res.json({
    creditId: req.params.creditId,
    trail: [
      { step: 'Sensed', timestamp: new Date().toISOString() },
      { step: 'Anchored to HCS', timestamp: new Date().toISOString() },
      { step: 'AI Verified', timestamp: new Date().toISOString() },
      { step: 'Approved', timestamp: new Date().toISOString() },
      { step: 'Minted', timestamp: new Date().toISOString() },
    ]
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Backend running on port ${process.env.PORT || 3001}`);
});
