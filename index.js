const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

const ReviewRoutes = require('./Routes/review')
const SpecificationRoutes = require('./Routes/specification')
const WarrentyRoutes = require('./Routes/warrenty')

app.use('/review', ReviewRoutes)
app.use('/specification', SpecificationRoutes)
app.use('/warrenty', WarrentyRoutes)

app.listen(PORT, () => {
    try {
        console.log("connected")
    }
    catch (err) {
        console.log(err)
    }
})