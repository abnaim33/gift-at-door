import React from 'react'
import ProductCard from './ProductCard'

const productsItems = [
    {
        image: 'https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg',
        price: 99,
        title: 'title 01',
        ratings: 4.5
    },
    {
        image: 'https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg',
        price: 99,
        title: 'title 02',
        ratings: 4.5
    },
    {
        image: 'https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg',
        price: 99,
        title: 'title 03',
        ratings: 4.5
    },
    {
        image: 'https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg',
        price: 99,
        title: 'title 04',
        ratings: 4.5
    },
    {
        image: 'https://res.cloudinary.com/dsuh9ww6d/image/upload/v1678498806/bailey-anselme-Bkp3gLygyeA-unsplash_mjgoqt.jpg',
        price: 99,
        title: 'title 05',
        ratings: 4.5
    },
]

const Products = () => {
    return (
        <div className='min-h-screen px-10 py-16'>
            <h1 className='md:text-5xl text-3xl text-center mb-10'>Feature Products</h1>
            <div className='flex items-center justify-between flex-wrap'>

                {productsItems.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

        </div>
    )
}

export default Products