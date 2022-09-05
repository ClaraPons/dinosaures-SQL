const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Dynosaur = sequelize.define("Dynosaur", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scientificName: {
            type: DataTypes.STRING
        },
        appearanceDate: {
            type: DataTypes.DATE
        },
        disparitionDate: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.STRING
        }, 
        color: {
            type: DataTypes.STRING
        }
    })
    return Dynosaur
}