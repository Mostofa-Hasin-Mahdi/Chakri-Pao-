const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  companyname: String,
  jobrole: String,
  salary: Number,
  vacancy: Number,
  location: String,
  createdBy: String
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
