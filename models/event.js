const { default: mongoose } = require("mongoose");

const eventsSchema = new mongoose.Schema({
    name : {
        type : String
    },
    tagline : {
        type : String
    },
    schedule: {
        type : String
    },
    description : {
        type : String
    },
    files_image :[{
        url : String,
        filename:String
    }],
    moderator: {
        type : String
    },
    category: {
        type : String
    },
    sub_category : {
        type : String
    },
    rigor_rank : {
        type : Number
    },
    attendes: {
        type : Object
    },

}, { strict: false })

// nothing here is required so schema is not fixed
module.exports = mongoose.model('Event', eventsSchema)