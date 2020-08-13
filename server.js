const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const animeRoute = require("./routes/anime");

const port = 5000;
app.use(bodyParser.json());
app.use("/anime", animeRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
