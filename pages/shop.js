import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { getData } from '../utils/fetchData'

const Shop = (props) => {

    const [products, setProducts] = useState(props.products)
    useEffect(() => {
        setProducts(props.products)

    }, [props.products])

    return (
        <div>
            <Head>
                <title>
                    Shop
                </title>
            </Head>

            {/* <Navbar /> */}
            {/* <Header /> */}
            <Products products={products} />
        </div>
    )
}


export async function getServerSideProps(query) {
    // const res = await getData('product')
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

    const res = await getData(`product`)

    return {
        props: {
            products: res.products,
            result: res.result
        }
    }
}

export default Shop