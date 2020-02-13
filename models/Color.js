var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ColorSchema = new Schema({
  companyCode: {type: String, required:true },
  colorCode: { type: Number, required:true },
  weightIn: { type: Number, required:true },
  price: { type: Number, required:false },
  timestamp: { type: Date, default:Date.now(), required:true }
});

var Color = mongoose.model("Color", ColorSchema, "color");

module.exports = Color;