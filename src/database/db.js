import mongoose from 'mongoose'

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB Connected')
    } catch (error) {
        console.error('DB Connection Error. ', error)
    }
}

export default ConnectDB