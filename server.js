require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABSE_URL)
const db = mongoose.connection
db.on('error',(error)=> console.err(error))
db.once('open',()=> console.log('Connected to the databse'))

app.use(express.json())
const subscriberRouter = require('./routes/subscriber')
app.use('/subscriber',subscriberRouter)
app.listen(1000,()=>{
    console.log("Server running on port 1000")
})