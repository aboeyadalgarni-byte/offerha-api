const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const results = [
    {
      store: "جرير",
      price: 4199,
      url: "https://www.jarir.com"
    },
    {
      store: "نون",
      price: 4149,
      url: "https://www.noon.com"
    },
    {
      store: "أمازون",
      price: 4249,
      url: "https://www.amazon.sa"
    }
  ];

  res.json({
    query: q,
    results
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Offerha API Running");
});
