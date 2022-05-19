const express = require('express')
const router = express.Router()
const SingleSub = require('../models/singleSub')
//getting all
router.get('/',async (req,res)=>{
    try{
        const singlesub = await SingleSub.find()
        res.json(singlesub)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//getting one
router.get('/:id',getSubscriber,(req, res)=>{
    res.json(res.subscriber)
})

//creating one
router.post('/',async (req, res)=>{
    const Subscriber = new SingleSub({
        name:req.body.name,
        totheChannel:req.body.totheChannel   
    })
    try{
        const newSubsciber = await Subscriber.save()
        res.status(201).json(newSubsciber)
    }catch(err){
        res.status(400).json({message:err.message})

    }
})

//updating one
router.patch('/:id',getSubscriber,async (req, res)=>{
if(req.body.name != null){
    res.subscriber.name = req.body.name
}
if(req.body.totheChannel != null){
    res.subscriber.totheChannel = req.body.totheChannel
}
try{
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
}catch(err){
    res.json.status(400).json({message:err.message})
}
})
router.delete('/:id',getSubscriber,(req,res)=>{
    try{
        res.subscriber.remove()
        res.json({message:"DELETED SUBSCRIBER"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber = await SingleSub.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"Cannot find"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router