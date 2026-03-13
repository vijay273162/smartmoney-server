const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const DHAN_CLIENT_ID = process.env.DHAN_CLIENT_ID;
const DHAN_ACCESS_TOKEN = process.env.DHAN_ACCESS_TOKEN;

const DHAN_HEADERS = {
  "Content-Type": "application/json",
  "access-token": DHAN_ACCESS_TOKEN,
  "client-id": DHAN_CLIENT_ID,
};

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Smart Money Server is running ✅" });
});

// Live LTP prices
app.post("/ltp", async (req, res) => {
  try {
    const response = await fetch("https://api.dhan.co/v2/marketfeed/ltp", {
      method: "POST",
      headers: DHAN_HEADERS,
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch LTP", detail: err.message });
  }
});

// Historical data
app.post("/historical", async (req, res) => {
  try {
    const response = await fetch("https://api.dhan.co/v2/charts/historical", {
      method: "POST",
      headers: DHAN_HEADERS,
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch historical data", detail: err.message });
  }
});

// Market quote (full)
app.post("/quote", async (req, res) => {
  try {
    const response = await fetch("https://api.dhan.co/v2/marketfeed/quote", {
      method: "POST",
      headers: DHAN_HEADERS,
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote", detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Smart Money server running on port ${PORT}`));
