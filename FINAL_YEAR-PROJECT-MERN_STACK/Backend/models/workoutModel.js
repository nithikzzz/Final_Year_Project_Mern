const { text } = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assetSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  count:{
     type:Number,
     required:true 
  },
  place: {
    type:String ,
    required: true
  },
  warentty_date : {
    type: String ,
    required: true
  },
  invoice:{
    type: String,
    required: true

  },
   

  issue: String,
  updatedAmount: Number,
  updatedDate: String ,
  totamount:Number,
  limit:Number,


}, { timestamps: true })

module.exports = mongoose.model('asset', assetSchema)