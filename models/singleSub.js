const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    totheChannel:{
        type: String,
        required : true

    },
    subDate:{
        type : Date,
        required : true,
        default: Date.now()

    }
})
module.exports = mongoose.model('singleSub',subSchema)