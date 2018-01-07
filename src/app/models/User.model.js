var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

var userSchema = new Schema({
	email: {type: String, required: false, unique: true},
  username: {type: String, required: true, unique: true},
	stocks: [{
			symbol: String,
			latestPrice: String,
			news: [{
				datetime: Date,
				headline: String,
				source: String,
				summary: String,
				url: String
			}]
		}],
	isAdmin: Boolean,
	hash: String,
	token: String
});

userSchema.pre('save', function(callback){
	if(this.isModified('hash')){
		this.hash = bcrypt.hashSync(this.hash);
	}

	callback();
});

userSchema.methods.checkPassword = function(pw, next){
	bcrypt.compare(pw, this.hash, function(err, isMatch){
		if(err){
			return next(err);
		}

		next(null, isMatch);
	});
}

// // add stock for user
// userSchema.methods.addStock = function(stock){
// 	if(this.stocks.indexOf(stock) == -1){
// 		this.stocks.push(stock);
// 	}

// 	return this.stocks;
// }

// // delete stock from user
// userSchema.methods.deleteStock = function(symbol){
// 	for(var i = 0; i < this.stocks.length; i++) {
// 	    if(this.stocks[i].symbol == symbol) {
// 	        this.stocks.splice(i, 1);
// 	        break;
// 	    }
// 	}

// 	return this.stocks;
// }

module.exports = mongoose.model('User', userSchema);