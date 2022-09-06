const express = require('express')
const app = express()
const { Dynosaur } = require('../models/index')
const {verifyDynosaur, verifyNotDynosaur} = require('../middlewares/Dynosaur')


app.get('/', async (req, res) => {

    try {
        // console.log(req.query.order)
        if(req.query.order === "asc"){
            const dynosaursAsc = await Dynosaur.findAll({
                order: [['appearanceDate', 'ASC']]
            })
            res.json(dynosaursAsc)
        }else if(req.query.order === "desc"){
            const dynosaursDesc = await Dynosaur.findAll({
                order: [['appearanceDate', 'DESC']]
            })
            res.json(dynosaursDesc)
        }else{
            const dynosaurs = await Dynosaur.findAll()
            res.json(dynosaurs)
        }

    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }   
})

app.get('/:id', verifyDynosaur, (req, res) => {

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
                id : req.params.id
            }
        }
    ) 

        const dynosaurFind = await Dynosaur.findOne({
            where:{
                id:req.params.id
            }
        })

    res.json(dynosaurFind)

    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

app.delete('/:id', verifyDynosaur, async (req, res) => {

    try {
        const dynosaur = await Dynosaur.destroy({
            where: {
                id : req.params.id
            }
        })
        res.status(204).json('')
    }catch(e){
        console.log(e)
        res.status(500).json('Internal server error')
    }
})

module.exports = app 