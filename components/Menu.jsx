import Link from 'next/link'
import React, { useContext } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { DataContext } from '../store/GlobalState';



const Menu = () => {

    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state



    // favicon and push




    return (
        <div className='px-0 md:px-10 flex items-center justify-between bg-gray-100 dark:bg-gray-700 md:min-h-screen'>
            <div className='hidden md:flex flex-col w-1/4 space-y-3 bg-[#ffc379] p-5 rounded-lg'>
                {
                    categories.map((item, index) => (
                        <h1 key={index} className='text-gray-800 py-3 border-b border-dashed'
                        >
                            {item.name}
                        </h1>
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
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679489449/pexels-nicole-michalou-5774924_kpsnmh.jpg" />

                    </div>
                    <div className='bg-yellow-100 w-full h-full flex items-center'>

                        <div className='w-1/3'>
                            <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679454249/umum_04-removebg-preview_uhs1no.png" alt=""
                                className='w-full animate-bounce' />
                        </div>
                        <div className='transition ease-in-out delay-150 space-y-5'>
                            <h1 className='text-4xl font-semibold text-gray-800 mb-8'>Send your gifts from <br /> just <span className='text-gray-600'> Tk. 120</span></h1>
                            <Link className='bg-gray-200 px-6 py-2 rounded-md' href="/shop">Send Gifts</Link>
                        </div>
                    </div>
                    <div className='bg-opacity-5 w-full h-full'>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679489449/pexels-nicole-michalou-5774924_kpsnmh.jpg" alt="" />

                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Menu