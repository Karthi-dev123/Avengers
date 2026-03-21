const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Placeholder — Member 2 will give you the real hedera.js
const { anchorToHCS, mintCredit, retireCredit } = require('./hedera');

// ---- DUMMY DATA (Member 1 can start building against this) ----
const dummyCredits = [
  { id: 'CRD001', project: 'Solar Farm Chennai', tonnes: 500, status: 'Minted', confidence: 88 },
  { id: 'CRD002', project: 'Wind Energy Rajasthan', tonnes: 1200, status: 'Pending', confidence: 72 },
  { id: 'CRD003', project: 'Mangrove Restoration', tonnes: 300, status: 'Retired', confidence: 91 },
];

const pendingApplications = [];

// ---- ENDPOINTS ----

const { uploadToIPFS } = require('./ipfs');

app.post('/sensor-data', async (req, res) => {
  try {
    const sensorData = req.body;
    const cid = await uploadToIPFS(sensorData, `sensor-${Date.now()}`);
    console.log('Uploaded to IPFS:', cid);
    res.json({ message: 'Received and stored', cid, hcsSequence: 1 }); // hcsSequence real on Day 3
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'IPFS upload failed' });
  }
});

app.post('/apply-credit', async (req, res) => {
  const { projectName, tonnes, gps, evidence } = req.body;
  
  const newApplication = {
    id: 'APP-' + Date.now(),
    project: projectName,
    tonnes: tonnes,
    gps: gps,
    evidence: evidence,
    status: 'Pending',
    aiScore: null,
    timestamp: new Date().toISOString()
  };

  pendingApplications.push(newApplication); // saves to array
  console.log('New application saved:', newApplication.id);
  
  res.json({ 
    message: 'Application submitted', 
    applicationId: newApplication.id 
  });
});


app.post('/approve-credit', async (req, res) => {
  try {
    const { applicationId } = req.body;

    // Find the application in pending list
    const appIndex = pendingApplications.findIndex(a => a.id === applicationId);
    
    if (appIndex === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const application = pendingApplications[appIndex];

    // Call Member 4's AI service
    const aiResponse = await axios.post('http://localhost:5001/score', {
      claimed_tonnes: parseFloat(application.tonnes),
      avg_co2_ppm: 400
    });

    const { confidence_score } = aiResponse.data;

    // Update status
    application.status = confidence_score > 70 ? 'Approved' : 'Rejected';
    application.aiScore = confidence_score;

    // Remove from pending
    pendingApplications.splice(appIndex, 1);

    // Add to credits list
    dummyCredits.push({
      id: application.id,
      project: application.project,
      tonnes: application.tonnes,
      status: application.status,
      confidence: confidence_score
    });

    await mintCredit(parseInt(application.tonnes));
    await anchorToHCS({ event: 'CREDIT_MINTED', id: application.id, tonnes: application.tonnes });


    res.json({
      message: `Credit ${application.status}!`,
      confidence_score,
      status: application.status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service not reachable - make sure app.py is running!' });
  }
});

app.get('/credits', async (req, res) => {
  res.json(dummyCredits); // real data replaces this on Day 3
});

app.post('/retire-credit', async (req, res) => {
  try {
    const { creditId } = req.body;
    const credit = dummyCredits.find(c => c.id === creditId);
    
    if (!credit) {
      return res.status(404).json({ error: 'Credit not found' });
    }

    await retireCredit(parseInt(credit.tonnes));
    await anchorToHCS({ event: 'CREDIT_RETIRED', id: creditId });

    credit.status = 'Retired';
    const cid = await uploadToIPFS({ creditId, status: 'Retired', timestamp: new Date().toISOString() }, `cert-${creditId}`);

    res.json({ message: 'Credit retired', certificateIpfs: `https://ipfs.io/ipfs/${cid}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
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

app.get('/pending-applications', async (req, res) => {
  res.json(pendingApplications);
});