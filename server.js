const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const searchUrl =
      "https://sa.pricena.com/ar/search/?s=" +
      encodeURIComponent(q);

    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);

    const results = [];

    $("article, .product, .item").each((i, el) => {
      const name = $(el).find("h2,h3,a").first().text().trim();

      const price = $(el)
        .text()
        .match(/\d+[,.]?\d*/);

      const link =
        $(el).find("a").first().attr("href") || "";

      if (name) {
        results.push({
          name,
          price: price ? price[0] : "",
          url: link.startsWith("http")
            ? link
            : `https://sa.pricena.com${link}`
        });
      }
    });

    res.json({
      query: q,
      results
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Offerha API Running");
});
