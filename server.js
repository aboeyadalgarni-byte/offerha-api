const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const products = {
  "iphone 16": {
    price: 4199,
    store: "جرير",
    url: "https://www.jarir.com"
  },
  "ps5": {
    price: 1799,
    store: "نون",
    url: "https://www.noon.com"
  },
  "galaxy s25 ultra": {
    price: 4999,
    store: "اكسترا",
    url: "https://www.extra.com"
  }
};

app.get("/", (req, res) => {
  res.send("Offerha API Running");
});

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  if (products[q]) {
    return res.json(products[q]);
  }

  return res.json({
    error: "المنتج غير موجود"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
