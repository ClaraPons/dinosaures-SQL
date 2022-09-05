const express = require('express')
const app = express()
const port = 5008
const dynosaursRoutes = require('./routes/dynosaurs')

require('./models/index')

app.use(express.json())

app.use('/dynosaurs', dynosaursRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})