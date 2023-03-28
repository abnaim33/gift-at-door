import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

import Navbar from '../components/Navbar'
const Blog = () => {
    return (
        <div>
            <Head>
                <title>
                    Gift At Home
                </title>
            </Head>

            <Navbar />
            <Header />

            <h1>Blog</h1>

        </div>
    )
}

export default Blog