import Link from 'next/link'
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
const menu_items = [
    {
        name: 'Personalised Gifts',
        path: "/"
    },
    {
        name: 'Home & Living',
        path: "/"
    },
    {
        name: 'Garment Care',
        path: "/"
    },
    {
        name: 'UnCategorized',
        path: "/"
    },
    {
        name: 'Accessories',
        path: "/"
    },
    {
        name: 'Occasion Gifts',
        path: "/"
    },
]

const Menu = () => {
    return (
        <div className='px-0 md:px-10 flex items-center justify-between bg-gray-100 dark:bg-gray-700 md:min-h-screen'>
            <div className='hidden md:flex flex-col w-1/4 space-y-3 bg-pink-300 p-5 rounded-lg'>
                {
                    menu_items.map((item, index) => (
                        <Link key={index} href={item.path} className='text-gray-700 py-3 border-b border-dashed'>
                            {item.name}
                        </Link>
                    ))
                }
            </div>

            <div className='bg-white dark:bg-gray-400 md:w-2/3 w-full h-full rounded-xl '>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    interval={10000}
                    showIndicators={false}
                    stopOnHover={true}
                    showStatus={false}

                // className='transition duration-700 ease-in-out hover:-translate-y-1 hover:scale-105'
                >

                    <div>
                        <div className='mt-[200px]  ml-[200px] absolute bg-yellow-100 p-16'>
                            <h1 className='text-5xl'>Unique Gifts</h1>
                            <p>For every occasion</p>
                        </div>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg" />

                    </div>
                    <div className='bg-yellow-100 w-full h-full flex items-center'>
                        {/* <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg" /> */}
                        <div className='w-1/3'>
                            <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679454249/umum_04-removebg-preview_uhs1no.png" alt=""
                                className='w-full animate-bounce' />
                        </div>
                        <div className='transition ease-in-out delay-150'>
                            <h1 className='text-4xl font-semibold text-gray-800'>Send your gifts from <br /> just <span className='text-gray-600'> $20</span></h1>
                            <button className='bg-gray-200 px-6 py-2 rounded-md mt-5'>Send Gifts</button>
                        </div>
                    </div>
                    <div className='bg-pink-800 bg-opacity-5 w-full h-full'>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679489449/pexels-nicole-michalou-5774924_kpsnmh.jpg" alt="" />




                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Menu