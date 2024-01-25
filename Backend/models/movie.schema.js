const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
  Title:  {
    type: String,
    required: true,
  },

  Year:  {
    type: Number,
    required: true,
  },
  
  Genre:  {
    type: String,
    required: true,
  },
  Director:  {
    type: String,
    required: true,
  },
  
  Language:  {
    type: String,
    required: true,
  },
  
  Poster:  {
    type: String,
    required: true,
  },
 
}, {
  versionKey: false
})

const moviemodel = mongoose.model("movie", movieSchema)

module.exports = { moviemodel }