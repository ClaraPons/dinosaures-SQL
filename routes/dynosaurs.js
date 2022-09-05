const express = require('express')
const app = express()
const { Dynosaur } = require('../models/index')
const {verifyDynosaur, verifyNotDynosaur} = require('../middlewares/Dynosaur')


app.get('/', async (req, res) => {
    try {
        const dynosaurs = await Dynosaur.findAll()
        res.json(dynosaurs)
    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

app.get('/:id', verifyDynosaur, async (req, res) => {

    const { id } = req.params
    console.log(req.query)
    try{
        res.json(req.dynosaur)
    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

app.post('/', verifyNotDynosaur, async (req, res) => {

    try{
        const dynosaur = await Dynosaur.create(req.body)
        res.json(dynosaur);
    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

app.put('/:id', verifyDynosaur, verifyNotDynosaur, async (req, res) => {

    try{
        const dynosaur = await Dynosaur.update(req.body, {
            where:{
                id : req.id
            }
        }
    ) 

        const dynosaurFind = await Dynosaur.findOne({
            where:{
                id:req.id
            }
        })

    res.json(dynosaurFind)

    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

app.delete('/:id', verifyDynosaur, async (req, res) => {

    const { id } = req.params

    try {
        const dynosaur = await Dynosaur.destroy({
            where: {
                id : req.id
            }
        })
        res.status(204)
    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

module.exports = app 