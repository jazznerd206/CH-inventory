var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ColorSchema = new Schema({
  companyCode: {type: String, required:true },
  colorCode: { type: String, required:true },
  weight: { type: Number, required:true },
  type: { type: String, required: true},
  price: { type: Number, required:false },
  timestamp: { type: Date, default:Date.now(), required:true },
  lastUpdate: { type: Date, required:false},
  totalQuantityAdjusted: {type: Number, default:0, required:false,}
});

var Color = mongoose.model("Color", ColorSchema, "color");

module.exports = Color;