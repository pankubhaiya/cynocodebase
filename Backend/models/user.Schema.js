const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false
})

const usermodel = mongoose.model("user", userSchema)

module.exports = { usermodel }