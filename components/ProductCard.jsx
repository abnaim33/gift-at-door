import Link from 'next/link'
import React, { useContext } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { addToCart } from '../store/Actions'
import { DataContext } from '../store/GlobalState'
const ProductCard = ({ product }) => {
    const { images, price, title, inStock, _id } = product

    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    return (
        <div className='flex flex-col items-center justify-between md:w-1/6 mx-4 my-4 w-full 
        rounded-md text-center bg-gray-100 dark:bg-gray-600 overflow-hidden h-[300px]'>
            <img src={images} alt="" className='w-full' />
            <div className='space-y-2 mt-2 '>
                <h2 className='capitalize text-lg'>{title}</h2>
                <h1>Price: {price}</h1>

                {
                    inStock > 0
                        ? <h6 className="text-green-700">In Stock: {inStock}</h6>
                        : <h6 className="text-red-700">Out Stock</h6>
                }
                {/* <span className='flex items-center '><AiFillStar size={20} />{ratings}</span> */}
            </div>

            <div className=' bg-gray-200 dark:bg-gray-500 mt-5 w-full py-3'>
                {
                    auth.user?.role === 'admin' ?
                        <Link href={`/create/${_id}`}>Edit</Link>
                        :
                        <button onClick={() => dispatch(addToCart(product, cart))}>Add to cart</button>

                }

            </div>

        </div>
    )
}

export default ProductCard