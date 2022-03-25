const express = require('express')
const router = express.Router()
const Event = require('../models/event')

const multer = require('multer');
const { storage } = require('../cloudinary')
const upload =  multer({ storage })
// images can't be stored in mongodb directly so using cloudinary , we are changing then into url 
// so these urls can be stored in data base , and used later.


// get request to get all events
router.get('/', async (req,res) => {
    
    try {
         const events = await Event.find()
         res.json(events)
    } catch (err) {
        res.send('Error' + err)
    }
})

// get request to get particular event with the id
router.get('/:id', async (req,res) => {
    try {
        const events = await Event.findById(req.params.id)
        res.json(events)
    } catch (err) {
        res.send("Error" + err)
    }
})


// post request to post event 
router.post('/', upload.array('image'), async (req,res) => {
    const event = new event ({
        name: req.body.name,
        tagline: req.body.tagline ,
        schedule: req.body.schedule,
        description: req.body.description,
        files_image: req.files.map(f => ({ url: f.path, filename: f.filename })),
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
        attendes: req.body.attendes,
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.put('/', upload.array('image'), async (req,res) => {
    const event = new event ({
        name: req.body.name,
        tagline: req.body.tagline ,
        schedule: req.body.schedule,
        description: req.body.description,
        files_image: req.files.map(f => ({ url: f.path, filename: f.filename })),
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
        attendes: req.body.attendes,
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// patch request to update the existing event
router.patch('/:id', upload.array('image'), async (req,res) => {
    try{
        const event = await Event.findById(req.params.id)
        event.name = req.body.name
        event.tagline = req.body.tagline 
        event.schedule = req.body.schedule
        event.description = req.body.description
        event.files_image = req.files.map(f => ({ url: f.path, filename: f.filename }))
        event.moderator = req.body.moderator
        event.category = req.body.category
        event.sub_category = req.body.sub_categor
        event.rigor_rank = req.body.rigor_rank
        event.attendes = req.body.attendes
        const event_1 = await event.save()
        res.json(event_1)

    } catch(err) {
        res.send('error' + err)
    }
})

// delete request deletes by id 

router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router
