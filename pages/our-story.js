import React from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'

const OurStory = () => {
    return (
        <div>
            <Head>
                <title>
                    Our Story
                </title>
            </Head>



            <div>
                <h1 className='text-4xl italic text-center my-5'>Our Story</h1>
            </div>

            <div className='mb-16'>



                <div className="flex flex-col md:flex-row items-center justify-around px-10 mt-10">


                    <div className='md:w-1/3 w-full'>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1680085401/kira-auf-der-heide-IPx7J1n_xUc-unsplash_wip8o2.jpg" alt=""
                            className='w-full rounded-md shadow-md' />
                    </div>

                    <div className='md:w-1/3 w-full  md:ml-5'>

                        <h1 className='text-2xl mb-5 font-semibold'>Our Story</h1>
                        <h1 className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi, ipsam et suscipit neque tenetur qui optio facilis enim ad asperiores ea ipsum voluptate, illum, illo expedita veniam? Ipsam, quo.</h1>

                    </div>
                </div>


                <div className="flex flex-col md:flex-row items-center justify-around px-10 mt-10">

                    <div className='md:w-1/3 w-full '>
                        <h1 className='text-2xl font-semibold mb-5'>Our Heritage</h1>
                        <h1 className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi, ipsam et suscipit neque tenetur qui optio facilis enim ad asperiores ea ipsum voluptate, illum, illo expedita veniam? Ipsam, quo.</h1>

                    </div>

                    <div className='md:w-1/3 w-full  md:ml-5'>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1680082739/nina-mercado-CnrDuY0tFrg-unsplash_n56scs.jpg" alt=""
                            className='w-full rounded-md shadow-md' />
                    </div>


                </div>

            </div>
            <Footer />

        </div>
    )
}

export default OurStory