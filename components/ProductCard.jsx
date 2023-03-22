import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
const ProductCard = ({ product }) => {
    const { image, price, title, ratings } = product
    return (
        <div className='flex flex-col items-center md:w-1/6 w-full 
        rounded-md text-center bg-gray-100 dark:bg-gray-600 overflow-hidden my-3 md:my-0'>
            <img src={image} alt="" className='w-full' />
            <div className='space-y-2 mt-2 '>
                <h1>Price: {price}</h1>
                <h2>{title}</h2>
                <span className='flex items-center '><AiFillStar size={20} />{ratings}</span>
            </div>

            <div className=' bg-gray-200 mt-5 w-full py-3'>
                <button>Add to cart</button>
            </div>

        </div>
    )
}

export default ProductCard