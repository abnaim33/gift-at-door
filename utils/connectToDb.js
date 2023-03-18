import mongoose from 'mongoose'

const connectToDB = () => {

    if (mongoose.connections[0].readyState) {
        console.log('Already connected.')
        return;
    }



    mongoose.connect(process.env.MONGODB_URL)
        .then((res) => console.log(res.json()))
        .catch(err => console.log(err))
}


export default connectToDB