import dotenv from 'dotenv'
import app from "./app.js";
import ConnectDB from './database/db.js';

dotenv.config()

const PORT = process.env.PORT || 8080

ConnectDB()
    .then(() => {
        app.listen((PORT), () => {
            console.log(`Server Start at ${PORT}`)
        })
    })
    .catch(() => {
        console.error('Error While Starting the Server')
    })