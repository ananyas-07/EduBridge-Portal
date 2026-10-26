const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health & Mutual Promotion Tracking Endpoint
app.post('/api/promote', (req, res) => {
  const { title, provider, promoCode } = req.body;
  res.json({
    status: "success",
    message: `Course '${title}' by ${provider} is now boosted with mutual promo code ${promoCode}!`
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`EduBridge Unified Portal running at http://localhost:${PORT}`);
});