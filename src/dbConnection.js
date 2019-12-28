import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 → ${err.message}`)
})
mongoose.connection.on('connected', () => {
    console.log(`Database connected`)
})
