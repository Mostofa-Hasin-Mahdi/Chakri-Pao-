const mongoose = require('mongoose');

const UsersInfoSchema = new mongoose.Schema({
  username: String,
  password: String, // store hashed passwords in production
  role: {
    type: String,
    enum: ['employer', 'jobseeker'],
    required: true
  }
});

const UsersInfoModel = mongoose.model("usersinfo", UsersInfoSchema);
module.exports = UsersInfoModel;
