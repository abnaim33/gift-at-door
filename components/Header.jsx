import React, { useState } from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaHeadset } from 'react-icons/fa'
import { BsFillCartCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa'

const Header = () => {
    const [showSearch, setShowSearch] = useState(false)
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
                        <h1>on all orders over $99</h1>
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
                        <h1 className='text-gray-600 text-sm'>Cart: 0 items</h1>
                        <h1>$0</h1>
                    </div>
                </div>
            </div>


            <header className='hidden md:block w-full sm:px-20  px-4 bg-white shadow 
      z-50 dark:bg-[#121212] dark:border-b border-gray-700'>
                <div className='justify-between md:items-center md:flex'>

                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0
z`}>
                            <div className='items-center space-y-4 md:space-y-0 justify-center text-md flex flex-col md:flex-row md:space-x-6 '>


                                <Link

                                    href='/'
                                    className={
                                        "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                    }


                                >
                                    Home
                                </Link>

                                <Link

                                    href="/about"
                                    className={
                                        "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                    }


                                >
                                    Shop
                                </Link>

                                <Link

                                    href="/track-orders"
                                    className={
                                        "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                    }


                                >
                                    Pages
                                </Link>


                                <Link

                                    href="/track-orders"
                                    className={
                                        "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                    }


                                >
                                    Our Story
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div>

                        <div className='flex items-center justify-between py-3'>
                            <div className='md:py-5  flex items-center'>
                                <div> <AiOutlineSearch size={25} className='text-gray-600' /></div>
                                <input type="text" placeholder='Search...' className='outline-none ml-2 bg-transparent' />
                            </div>

                            {/* <div className='md:hidden'
>
    <button>{navbar ? <IoMdClose size={30} />
        : <IoMdMenu size={30} />}</button>
</div> */}

                        </div>


                    </div>
                </div>
            </header>


            <div className='fixed  md:hidden w-full  bottom-0'>

                {
                    showSearch ?
                        <div className={"flex items-center justify-between bg-white dark:bg-[#111] px-5 mx-5 py-3"}>
                            <input type="text" placeholder='Search...' className='outline-none border
                     border-gray-300 py-1 px-3 w-[70%] text-gray-300' />
                            <button className='bg-pink-300 dark:bg-pink-400 py-1 px-8 text-black'>
                                <AiOutlineSearch size={30} />
                            </button>
                        </div>
                        : ''
                }

                <div className=' w-full bg-gray-600 px-10 flex
            items-center justify-between py-5 text-white dak:text-black'>

                    <div className='cursor-pointer'>
                        <Link href="/profile">

                            <FaUserAlt size={30} />
                        </Link>
                    </div>

                    <div onClick={() => setShowSearch(!showSearch)}
                        className='cursor-pointer'>
                        <AiOutlineSearch size={30} />
                    </div>

                    <div className='cursor-pointer hover:bg-gray-700 '>
                        <span className='fixed bottom-11 right-10 bg-black w-[25px] h-[25px] rounded-full text-center my-auto'>0</span>
                        <FaShoppingCart size={30} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header