const express = require("express");
const bodyParser = require("body-parser");
const SoldPrice = require("./SoldPrice");

const app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/../dist/mean-app/";
console.log(distDir);
app.use(express.static(distDir));


// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/"
 *    GET: finds all
 */
app.get("/api/sold-price", function(req, res) {
  const oSoldPrice = new SoldPrice();
  oSoldPrice.getDataSet("sold-price-data.txt", (soldPriceDataset) => {
    res.status(200).json(soldPriceDataset);
  });
});
