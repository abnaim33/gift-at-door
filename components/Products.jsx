import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import ProductCard from './ProductCard'



const Products = (props) => {

    const [products, setProducts] = useState(props.products)
    const [newProducts, setNewProducts] = useState(products)
    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state
    const [category, setCategory] = useState('')
    const handleCategories = async (e) => {
        if (e.target.value === 'all') {
            setCategory(e.target.value)
            setProducts(props.products)
        } else {
            setCategory(e.target.value)
            console.log(products)
            let obj = products.filter(item => item.category === e.target.value)
            setNewProducts(obj)
        }
    }



    return (
        <div className='min-h-screen px-10 py-16'>
            <h1 className='md:text-5xl text-3xl text-center mb-10'>Feature Products</h1>

            <div>
                <div className="input-group-prepend px-0 my-2">
                    <select name="category" id="category" value={category}
                        onChange={handleCategories} className="custom-select text-capitalize">
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
            </div>

            <div className='flex items-center justify-between flex-wrap'>

                {
                    newProducts.length === 0 ?
                        <h2 className='text-4xl text-red-700 mt-10'>No products Found</h2>
                        :
                        newProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
            </div>

        </div>
    )
}

export default Products