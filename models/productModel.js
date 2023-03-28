import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        unique: true

    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: false
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset