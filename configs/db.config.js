const mongoose = require('mongoose')

mongoose
.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(connection => {
    console.log('Connected to Mongo!')
})
.catch(err => {
    console.log('Error connecting to Mongo: ', err)
})