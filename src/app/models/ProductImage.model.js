var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productImageSchema = new Schema({
  type: {type: String, required: true},
  url: {type: String, required: true}
})

module.exports = mongoose.model('ProductImage', productImageSchema);