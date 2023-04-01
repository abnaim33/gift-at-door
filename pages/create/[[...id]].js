import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const ProductsManager = () => {
    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: '',
        images: ''
    }
    const [product, setProduct] = useState(initialState)
    const { title, price, inStock, description, content, category, images } = product


    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state

    const router = useRouter()
    const { id } = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`product/${id}`).then(res => {

                setProduct(res.product)



            })
        } else {
            setOnEdit(false)
            setProduct(initialState)

        }
    }, [id])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (auth.user.role !== 'admin')
            return toast("Authentication is not valid", { type: 'error' })

        if (!title || !price || !inStock || !description || !content || category === 'all')
            return toast('Please add all the fields.', { type: 'error' })




        toast("Loading",
            {
                type: 'info'
            })



        let res;
        if (onEdit) {
            res = await putData(`product/${id}`, product, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            return toast("Product updated successfully")
        } else {
            res = await postData('product', product, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            return toast("Product created successfully")
        }



    }

    return (
        <div className="products_manager mt-20 md:mt-36 px-10">
            <Head>
                <title>Products Manager</title>
            </Head>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='flex items-center justify-start'>
                        <h1>Title :</h1>

                        <input type="text" name="title" value={title}
                            placeholder="Title" className="ml-4 outline-none my-4 w-100 p-2 border "
                            onChange={handleChangeInput} />
                    </div>

                    <div className="flex justify-between">
                        <div className="w-1/3">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={price}
                                placeholder="Price" className=" w-full p-2"
                                onChange={handleChangeInput} />
                        </div>

                        <div className="w-1/3">
                            <label htmlFor="price">In Stock</label>
                            <input type="number" name="inStock" value={inStock}
                                placeholder="inStock" className="w-full p-2 ml-4"
                                onChange={handleChangeInput} />
                        </div>
                    </div>

                    <textarea name="description" id="description" cols="30" rows="4"
                        placeholder="Description" onChange={handleChangeInput}
                        className="d-block my-4 w-100 p-2 border border-gray-300" value={description} />

                    <textarea name="content" id="content" cols="30" rows="4"
                        placeholder="Content" onChange={handleChangeInput}
                        className="d-block my-4 w-100 p-2  border border-gray-300 md:ml-5" value={content} />

                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                            onChange={handleChangeInput} className="custom-select text-capitalize">
                            <option value="all">All Products</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit" className="bg-black dark:bg-white py-1 text-white dark:text-black my-2 px-6 rounded">
                        {onEdit ? 'Update' : 'Create'}
                    </button>

                </div>

                <div className=" my-4">
                    <div className=" mb-3">

                        <h1 className='text-2xl mb-5'>Image url :</h1>

                        <input type="text" className="px-2 py-1 border-2 rounded border-gray-400 w-full"
                            name="images" value={images}
                            onChange={handleChangeInput} multiple
                            placeholder="Enter image url"
                        />
                    </div>

                    <div className="flex img-up mx-0  min-w-[100px] min-h-[100px]">

                        <div className=" w-[200px] my-1 ">

                            <img src={images}
                                alt="" className="w-full rounded" />

                        </div>

                    </div>


                </div>


            </form>


        </div>
    )
}

export default ProductsManager