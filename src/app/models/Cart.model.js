var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Product = require('../model/Product.model');

var cartSchema = new Schema({
	products: [
    {
      product: Product,
      quantity: {type: Number}
    }
  ]
});



module.exports = mongoose.model('Cart', cartSchema);