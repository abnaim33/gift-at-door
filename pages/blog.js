import React from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'

const Blog = () => {
    return (
        <div>
            <Head>
                <title>
                    Blog
                </title>
            </Head>

            <div className='mb-16'>



                <div className="flex flex-col md:flex-row items-center justify-between px-10 mt-10">
                    <div className='md:w-1/2 w-full'>
                        <h1 className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi, ipsam et suscipit neque tenetur qui optio facilis enim ad asperiores ea ipsum voluptate, illum, illo expedita veniam? Ipsam, quo.</h1>

                        <h1 className='italic text-lg my-10'>&quot;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, dolor.&quot;</h1>

                        <h1 className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi, ipsam et suscipit neque tenetur qui optio facilis enim ad asperiores ea ipsum voluptate, illum, illo expedita veniam? Ipsam, quo.</h1>
                    </div>

                    <div className='md:w-1/2 w-full md:ml-5'>
                        <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679489449/pexels-nicole-michalou-5774924_kpsnmh.jpg" alt=""
                            className='w-full rounded-md shadow-md' />
                    </div>
                </div>

                <div className='px-10 mt-5'>
                    <h1 className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatem eum itaque et nobis. Suscipit, sit velit dolor nihil obcaecati, quasi cupiditate facere pariatur itaque dignissimos corporis impedit dolores porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatem eum itaque et nobis. Suscipit, sit velit dolor nihil obcaecati, quasi cupiditate facere pariatur itaque dignissimos corporis impedit dolores porro.</h1>
                </div>


            </div>
            <Footer />

        </div>
    )
}

export default Blog