const { Dynosaur } = require('../models/index')

const verifyDynosaur = async (req, res, next) => {
    
    const { id } = req.params

    const dynosaur = await Dynosaur.findOne({
        where: {
            id
        }
    })
    if(dynosaur){
        req.id = id
        req.dynosaur = dynosaur
        next()
    }else{
        res.status(404).json("Dynosaur not found")
    }
}

const verifyNotDynosaur = async (req, res, next) => {

    const dynosaurNameExist = await Dynosaur.findOne({
        where: {
            name: req.body.name
        }
    })

    if(dynosaurNameExist){
        res.status(409).json("Dynausor name already exist")
    }else{
        next()
    }

}

module.exports = {
    verifyDynosaur,
    verifyNotDynosaur
}