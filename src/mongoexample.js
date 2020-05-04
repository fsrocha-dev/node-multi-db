const Mongoose = require('mongoose')

Mongoose.connect('mongodb://frankrocha:senhasecreta@localhost:27017/app-heroes',
  { useNewUrlParser: true }, function (error) {
    if (!error) return
    console.log('Connection Failed: ', error)
  })

const connection = Mongoose.connection
connection.once('open', () => console.log('mongodb is running!!'))