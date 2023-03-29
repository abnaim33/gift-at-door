import Link from 'next/link'
import React from 'react'

import { AiOutlineArrowDown, AiOutlineCopyright, AiFillLinkedin, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

const information_items = [
    {
        name: 'my account',
        path: '/profile'
    },
    {
        name: 'track orders',
        path: '/orders'
    },
    {
        name: 'shipping & returns',
        path: '/return'
    },
]

const services_items = [
    {
        name: 'contact us',
        path: '/contact'
    },
    {
        name: 'FAQ',
        path: '/faq'
    },
    {
        name: 'how to order',
        path: '/how'
    },

]

const Footer = () => {
    return (
        <div className='px-10 h-auto mb-20 md:mb-0'>
            {/* <div>Logo created by <a href="https://www.designevo.com/" title="Free Online Logo Maker">DesignEvo logo maker</a></div> */}

            <div className="flex md:flex-row flex-col items-center justify-between space-x-2 border-b-2 border-dashed pb-5 md:space-y-0 space-y-10">
                <div className='md:w-2/6 w-full'>
                    <h1 className='uppercase md:text-2xl text-xl'>Our Store</h1>

                    <p className='text-gray-500 text-sm my-5 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa magni numquam libero, vero ipsum explicabo.</p>

                    <h2>Saturday -- Friday 9am--7pm</h2>
                </div>

                <div className='md:w-1/6 w-full'>
                    <h1 className='uppercase md:text-2xl text-xl'>Information</h1>

                    <div className='flex flex-col space-y-2 mt-5'>

                        {
                            information_items.map((item, index) => (
                                <Link key={index} href={item.name} className='text-gray-500 capitalize text-sm'>
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>

                </div>

                <div className='md:w-1/6 w-full'>
                    <h1 className='uppercase md:text-2xl text-xl'>Services</h1>
                    <div className='flex flex-col space-y-2 mt-5'>

                        {
                            services_items.map((item, index) => (
                                <Link key={index} href={item.name} className='text-gray-500 capitalize text-sm'>
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>

                </div>

                <div className='md:w-2/6 w-full'>
                    <h1 className='uppercase md:text-2xl text-xl'>Newsletter sign-up</h1>

                    <p className='text-gray-500 capitalize my-2'>For News & Special Offers</p>

                    <div className='flex flex-col'>

                        <input type="text" placeholder='Enter your email address'
                            className='outline-none border-2 border-gray-300 rounded p-2 text-neutral-500' />
                        <button className='w-[100px] bg-pink-700 px-3 py-1 mt-3 rounded text-white'>Submit</button>
                    </div>


                </div>

            </div>

            <div className="flex md:flex-row flex-col items-center justify-between py-10 ">
                <div className="flex items-center mb-5 md:mb-0 text-sm">
                    copyright <AiOutlineCopyright size={20} />  {new Date().getFullYear()} <a href="http://" target="_blank" rel="noopener noreferrer"
                        className='mx-3 text-gray-600 '>Md Naim Hossen</a> all rights reserved
                </div>


                <div className="flex items-center justify-between">
                    <span className='text-gray-700 p-2 bg-gray-200 rounded-full'><AiFillInstagram size={35} /></span>
                    <span className='text-gray-700 p-2 bg-gray-200 rounded-full mx-2'><AiFillLinkedin size={35} /></span>
                    <span className='text-gray-700 p-2 bg-gray-200 rounded-full'><AiFillFacebook size={35} /></span>
                </div>
            </div>

        </div>
    )
}

export default Footer