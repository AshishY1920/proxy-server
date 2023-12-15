const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });

    res.writeHead(200, {
      "Content-Type": response.headers["content-type"],
      "Access-Control-Allow-Origin": "*",
    });
    res.end(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
