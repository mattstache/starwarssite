var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProductImage = require('../model/ProductImage.model');


var productSchema = new Schema({
	name: {type: String, required: true},
  ASIN: {type: String, required: true, unique: true},
  description: {type: String},
	price: {type: Double},
  images: [ProductImage],
  amazon_url: {type: String},
  tags: [{type: string}],
  categories: [{type: string}],
  created_date: {type: Date, required: true},
  last_updated_date: {type: Date, required: true},
  in_stock: {type: boolean}
});



module.exports = mongoose.model('Product', productSchema);