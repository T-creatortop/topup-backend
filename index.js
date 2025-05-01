const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/topup', async (req, res) => {
  const { user_id, zone_id, item_id, sku_code } = req.body;
  const url = 'https://api.digiflazz.com/v1/transaction'; // contoh endpoint API
  const payload = {
    partner_id: process.env.PARTNER_ID,
    apikey: process.env.API_KEY,
    user_id,
    zone_id,
    item_id,
    sku_code
  };

  try {
    const response = await axios.post(url, payload);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghubungi API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});