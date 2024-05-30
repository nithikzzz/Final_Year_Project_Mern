const express = require('express');
const router = express.Router();
const Message = require('../models/alertmodel')

// inserting message 
const ins = async (req, res) => {
    try {
        const { message } = req.body;
        const data = await Message.create({ message });
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

// to display message

const gee = async(req,res)=>{
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


//to delete 

const dec = async(req,res)=>{

    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
          return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}
module.exports =  {ins,gee,dec};