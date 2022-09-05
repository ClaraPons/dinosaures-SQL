const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dinosaurs', 'root',  '', {
    host: '127.0.0.1', 
    dialect: 'mysql',   
    logging: false
})

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connect to Db");
    }catch (error){
        console.log(error);
    }
}

connectDb()

const Dynosaur = require('./Dynosaur')(sequelize)

sequelize.sync({alter: true})

const db = {
    sequelize: sequelize,
    Dynosaur: Dynosaur
}

module.exports = db
