const { text } = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const deleteeSchema = new Schema({
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
      required: false
  
    },
     
  
    issue: String,
    updatedAmount: Number,
    updatedDate: String ,
    totamount:Number,
    limit:Number,
  
  
  }, { timestamps: true })
  
  module.exports = mongoose.model('deletee', deleteeSchema)