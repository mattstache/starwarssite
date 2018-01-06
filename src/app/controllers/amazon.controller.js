'use strict';

const Piranhax = require("piranhax")
const client = new Piranhax(process.env.AWS_ACCESS_KEY_ID, process.env.AMAZON_SECRET_KEY, process.env.AMAZON_ASSOCIATE_TAG)


function searchProducts(searchIndex, keywords){
  var products = client.ItemSearch(searchIndex, {
    Keywords: keywords
  }).then(results => {
      // results is a response object, see below for further information.
      console.log(results.data())

      // get first item ASIN
      console.log(results.get("Item[0].ASIN"))
  }).catch(err => {
      console.log("Why error?", err)
  })

  return products;
}

exports.search = function(req, res) {
  var query = req.query.searchQuery;

  searchProducts("Books", "Star Wars");

  res.send("Search query: " + query);
  console.log("Search query: " + query)
};