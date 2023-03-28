import connectToDB from '../../../utils/connectToDb'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectToDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    }
}

// class APIfeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }
//     filtering() {
//         const queryObj = { ...this.queryString }

//         const excludeFields = ['page', 'sort', 'limit']
//         excludeFields.forEach(el => delete (queryObj[el]))

//         if (queryObj.category !== 'all')
//             this.query.find({ category: queryObj.category })
//         if (queryObj.title !== 'all')
//             this.query.find({ title: { $regex: queryObj.title } })

//         this.query.find()
//         return this;
//     }

//     sorting() {
//         if (this.queryString.sort) {
//             const sortBy = this.queryString.sort.split(',').join('')
//             this.query = this.query.sort(sortBy)
//         } else {
//             this.query = this.query.sort('-createdAt')
//         }

//         return this;
//     }

//     paginating() {
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 6
//         const skip = (page - 1) * limit;
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }
// }

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

const getProducts = async (req, res) => {
    try {


        // const features = new ApiFeatures(Products.find(), req.query)
        //     .filtering().sorting().paginating()

        // const products = await features.query
        const products = await Products.find()
        // console.log(products, 'from product')
        res.json({
            status: 'success',
            result: products.length,
            products
        })



    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication is not valid.' })

        const { title, price, inStock, description, content, category, images } = req.body

        if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
            return res.status(400).json({ err: 'Please add all the fields.' })


        const newProduct = new Products({
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        await newProduct.save()

        res.json({ msg: 'Success! Created a new product' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}