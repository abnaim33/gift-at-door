import React, { useContext, useEffect, useState } from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaHeadset } from 'react-icons/fa'
import { BsFillCartCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import { getData } from '../utils/fetchData'

const Header = () => {
    const [showSearch, setShowSearch] = useState(false)
    const { state, dispatch } = useContext(DataContext)

    const { auth, cart } = state
    const router = useRouter()


    const [total, setTotal] = useState(0)
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(res)
        }

        getTotal()
    }, [cart])


    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('cartItems'))
        if (cartLocal && cartLocal.length > 0) {
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, title, images, price, inStock, sold } = res.product
                    if (inStock > 0) {
                        newArr.push({
                            _id, title, images, price, inStock, sold,
                            quantity: item.quantity > inStock ? 1 : item.quantity
                        })
                    }
                }

                dispatch({ type: 'ADD_CART', payload: newArr })
            }

            updateCart()
        }
    }, [dispatch])

    const handleSearch = () => {

        setShowSearch(false)

    }

    return (
        <header id="header">
            <div className='hidden md:flex items-center justify-between px-10 pb-5  border-b-2  border-dotted divide-x-2 border-gray-400'>
                <div>
                    <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679156627/logo__2_-removebg-preview_qvzmna.png" alt="" />
                </div>
                <div className='flex items-center border-r-2 border-dotted px-3
                 border-gray-400'>
                    <div>
                        {/* track */}
                        <TbTruckDelivery size={55} className="text-gray-600 mr-5" />
                    </div>
                    <div>
                        <h1 className='text-gray-600 text-sm'>Free standard shipping</h1>
                        <h1>on all orders over TK.2999</h1>
                    </div>
                </div>

                <div className='flex items-center  border-r-2 border-dotted px-3
                 border-gray-400'>
                    <FaHeadset size={45} className="text-gray-600 mr-5" />
                    <div>
                        <h1 className='text-gray-600 text-sm'>giftsathome@gmail.com</h1>
                        <h1>018-255-830-30</h1>
                    </div>
                </div>
                <div className='flex items-center border-l-2 border-dotted pl-2'>
                    <BsFillCartCheckFill size={45} className="text-gray-600 mr-5" />
                    <div>

                        <Link href="/cart">

                            <h1 className='text-gray-600 text-sm'>Cart: {cart.length} items</h1>
                            <h1>${total}</h1>
                        </Link>

                    </div>
                </div>
            </div>


            <header className='hidden md:block w-full sm:px-20  px-4 bg-white shadow 
      z-50 dark:bg-[#121212] dark:border-b border-gray-700 py-5'>
                <div className='justify-between md:items-center md:flex'>

                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0
z`}>
                            <div className='items-center space-y-4 md:space-y-0 justify-center text-md flex flex-col md:flex-row md:space-x-6 '>


                                <Link
                                    href='/'
                                    className={
                                        `block lg:inline-block hover:text-neutral-200  px-6 py-2 rounded 
                                        ${router.route === '/' ? 'bg-indigo-700 text-neutral-100 ' : ''}`
                                    }
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/shop"
                                    className={
                                        `block lg:inline-block hover:text-neutral-600 text-neutral-700 dark:text-gray-400 px-6 py-2 rounded
                                        ${router.route === '/shop' ? 'bg-indigo-700 !text-neutral-100 hover:text-neutral-200 ' : ''}`
                                    }
                                >
                                    Shop
                                </Link>

                                <Link
                                    href="/blog"
                                    className={
                                        `block lg:inline-block hover:text-neutral-600 text-neutral-700 dark:text-gray-400 px-6 py-2 rounded
                                        ${router.route === '/blog' ? 'bg-indigo-700 !text-neutral-100 hover:text-neutral-200 ' : ''}`
                                    }
                                >
                                    Blog
                                </Link>


                                <Link
                                    href="/our-story"
                                    className={
                                        `block lg:inline-block hover:text-neutral-600 text-neutral-700 dark:text-gray-400  px-6 py-2 rounded
                                        ${router.route === '/our-story' ? 'bg-indigo-700 !text-neutral-100 hover:text-neutral-200 ' : ''}`
                                    }
                                >
                                    Our Story
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div>

                        {/* <div className={router.route === '/' || router.route === '/shop' ? ` flex items-center justify-between py-3` : `hidden`} >
                            <div className='  flex items-center'>
                                <div> <AiOutlineSearch size={25} className='text-gray-600' /></div>
                                <input type="text" placeholder='Search...' className='outline-none ml-2 bg-transparent' />
                            </div>



                        </div> */}


                    </div>
                </div>
            </header>


            <div className='fixed  md:hidden w-full  bottom-0'>

                {
                    showSearch ?
                        <div className={"flex items-center justify-between bg-white dark:bg-[#111] px-5 mx-5 py-3"}>
                            <input type="text" placeholder='Search...' className='outline-none border
                     border-gray-300 py-1 px-3 w-[70%] text-gray-600 dark:text-gray-300'
                                onChange={(e) => setSearchText(e.target.value)}
                            />

                            <button className='bg-pink-300 dark:bg-pink-400 py-1 px-8 text-black'
                                onClick={() => handleSearch()}>
                                <AiOutlineSearch size={30} />
                            </button>
                        </div>
                        : ''
                }

                <div className=' w-full bg-gray-600 px-10 flex
            items-center justify-between py-5 text-white dark:text-black'>

                    <div className='cursor-pointer'>

                        {
                            auth.user?.name ?


                                <Link href="/profile">

                                    <FaUserAlt size={30} />
                                </Link>
                                :
                                <Link href="/signin">

                                    <FaUserAlt size={30} />

                                </Link>
                        }
                    </div>

                    <div onClick={() => setShowSearch(!showSearch)}
                        className='cursor-pointer'>
                        <AiOutlineSearch size={30} />
                    </div>

                    <div className='cursor-pointer '>
                        <span className='fixed bottom-11 right-10 bg-black
                         w-[25px] h-[25px] text-white rounded-full text-center my-auto'>{cart.length}</span>
                        <FaShoppingCart size={30} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header