import mongoose from "mongoose"

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to database')
    }).catch((err) => {
        console.log(`Error while connecting to the database: ${err}`)
    })
}
