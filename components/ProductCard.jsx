import React, { useContext } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { addToCart } from '../store/Actions'
import { DataContext } from '../store/GlobalState'
const ProductCard = ({ product }) => {
    const { images, price, title, ratings } = product

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    return (
        <div className='flex flex-col items-center md:w-1/6 mx-4 my-4 w-full 
        rounded-md text-center bg-gray-100 dark:bg-gray-600 overflow-hidden'>
            <img src={images} alt="" className='w-full' />
            <div className='space-y-2 mt-2 '>
                <h1>Price: {price}</h1>
                <h2>{title}</h2>
                {/* <span className='flex items-center '><AiFillStar size={20} />{ratings}</span> */}
            </div>

            <div className=' bg-gray-200 dark:bg-gray-500 mt-5 w-full py-3'>
                <button onClick={() => dispatch(addToCart(product, cart))}>Add to cart</button>
            </div>

        </div>
    )
}

export default ProductCard