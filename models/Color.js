var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var ColorSchema = new Schema({
  // `title` is of type String
  colorCode: { type: Number, required:true },
  // `body` is of type String
  weightIn: { type: Number, required:true },
  price: { type: Number, required:false },
  timestamp: { type: Date, default:Date.now(), required:true }
});

// This creates our model from the above schema, using mongoose's model method
var Color = mongoose.model("Color", ColorSchema, "color");

// Export the Note model
module.exports = Color;