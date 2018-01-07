'use strict';

const _ = require("lodash");
const Piranhax = require("piranhax");
const client = new Piranhax(process.env.AWS_ACCESS_KEY_ID, process.env.AMAZON_SECRET_KEY, process.env.AMAZON_ASSOCIATE_TAG);


/* schema setup
customer:
  -cart id

cart:
  -product

product
  ASIN
  name
  price
  amazon_url
  -tags
  -categories

tags

categories




*/




var searchResult = {
  Item: {
    ASIN: '',
    DetailPageURL: '',
    ItemLinks: [
      {
        ItemLink:
        {
          Description: '',
          URL: ''
        }
      }
    ],
    ItemAttributes: {

    }
  },
  MoreSearchResultsURL: '', //  The URL that displays the complete search results. Use these URLs to link back to the item on Amazon. Each URL is tagged with your Associate tag and contains tracking information to increase your hourly request limit as the sales you generate increase.
  TotalPages: '',
  TotalResults: '',
  SearchResultsMap: [
    {
      SearchIndex:{
        IndexName: '',
        Results: '',
        Pages: '',
        RelevanceRank: '',
        ASIN: ['']
      }
    }
  ]
}


var product = {
  name: '',
  description: '',
  price: '',
  amazonUrl:'',
  ASIN: '',
  inStock: '',
  featured: '',
  createdDate: '',
  productType: '',
  tags: [],
  categories: [],
  images: {
    small:{
      url: '',
      type: ''
    },
    medium: {
      url: '',
      type: ''
    }
  }
}


function searchProducts(searchIndex, keywords){
  //https://docs.aws.amazon.com/AWSECommerceService/latest/DG/ItemSearch.html
  var products = client.ItemSearch(searchIndex, {
    Keywords: keywords,
    ResponseGroup: ['OfferListings', 'Images', 'PromotionSummary']
  }).then(results => {
      console.log('==SEARCH RESPONSE==')
      console.log(results.get("Item[0]"))
      let Item = results.get("Item")
      let OfferListingIds = getOfferListingIdsFromItem(Item);
   
      // map OfferListingId 
      let AddToCartItems = getCartItems(OfferListingIds);
   
      // create request 
      return createAmazonCart(AddToCartItems)
  }).then(result => {
    // get CartId 
    let CartId = result.get("CartId")
 
    // get HMAC and one of CartItemId 
    let HMAC = result.get("HMAC")
    let CartItemId = result.get("CartItems.CartItem[0].CartItemId")

    console.log(result)
  })
  .catch(err => {
      console.log("Why error?", err)
  })

  return products;
}

function addItemsToAmazonCart(items){
  let cartExists = false;

  return cartExists ? createAmazonCart(items) : addItemsToExistingAmazonCart(items);
}

function addItemsToExistingAmazonCart(items){
  // make sure you do getCartItems first
  // get cartId from cookie and HMAC
  //return client.CartAdd(items, CartId, HMAC)
}

function getCartItems(offerListingIds){
  return _.map(offerListingIds, id => {
      let item = client.CreateCartItem("OfferListingId", id, 1)
      return item
  })
}

function getOfferListingIdsFromItem(item){
  return _.map(item, i =>
  _.get(i, "Offers.Offer.OfferListing.OfferListingId"))
  .filter(i => i !== undefined)
}

function createAmazonCart(items){
  //set cartId and HMAC from this return in cookie
  return client.CartCreate(items)
}

exports.search = function(req, res) {
  var query = req.query.searchQuery;

  searchProducts("Books", "Star Wars");

  res.send("Search query: " + query);
  console.log("Search query: " + query)
};