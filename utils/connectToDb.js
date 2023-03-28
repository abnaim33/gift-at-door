import mongoose, { MongoClient } from 'mongoose'

const connectToDB = () => {

    // if (mongoose.connections[0].readyState) {
    //     console.log('Already connected.', mongoose.connections)
    //     return;
    // }

    mongoose.connect(process.env.MONGODB_URL, {}).then(
        () => console.log('connected to database'),
        err => { console.log(err) }
    );

    // mongoose.connect(process.env.MONGODB_URL, err => {
    //     if (err) throw err;
    //     console.log('Connected to mongodb.')
    // })
}


export default connectToDB