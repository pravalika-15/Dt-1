require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');



// connecting to mongodb 

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true }
)
const db = mongoose.connection
db.on('error', (e) => console.error(e))
db.once('open', () => console.log('conneccted to database!'))


app.use(express.json())

const eventsRouter = require('./routes/events')
app.use('api/v3/app/events', eventsRouter)

app.listen(3000, () => {
    console.log("server started!!")
})