import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import { decrease, increase } from '../store/Actions'
import { DataContext } from '../store/GlobalState'
import { getData, postData } from '../utils/fetchData'


const Cart = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders } = state

    const [priceTotal, setPriceTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')

    const [error, setError] = useState('')

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setPriceTotal(res)


            if (priceTotal > 1000) {
                setTotal(priceTotal)
            } else {
                setTotal(priceTotal + 60)
            }
        }

        getTotal()
    }, [priceTotal, cart])


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

    const handleOrder = async () => {

        if (!auth.user) return router.push('/signin?cart')

        if (!address || !mobile) return setError('Please fill all the fields')

        setError('')
        let newCart = [];
        for (const item of cart) {
            const res = await getData(`product/${item._id}`)
            if (res.product.inStock - item.quantity >= 0) {
                newCart.push(item)
            }
        }

        if (newCart.length < cart.length) {
            setCallback(!callback)
            return toast('The product is out of stock or the quantity is insufficient.', {
                type: 'error'
            })
            // dispatch({
            //     type: 'NOTIFY', payload: {
            //         error: 'The product is out of stock or the quantity is insufficient.'
            //     }
            // })
        }
        postData('order', { address, mobile, cart, total }, auth.token)
            .then(res => {
                if (res.err) return toast(res.err, {
                    type: 'error'
                })

                dispatch({ type: 'ADD_CART', payload: [] })

                const newOrder = {
                    ...res.newOrder,
                    user: auth.user
                }
                dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
                // dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

                toast(res.msg, {
                    type: 'success'
                })

                return router.push(`/order/${res.newOrder._id}`)
            })


    }

    return (
        <div className='mt-20 md:mt-36'>

            <Head>
                <title>Cart</title>
            </Head>

            {
                cart.length === 0 ? <h1>Empty cart</h1> :
                    <div className='mx-10 flex flex-col md:flex-row justify-between items-center mb-10'>

                        <div className='md:w-2/4 w-full'>

                            {cart.map((product, index) => (
                                <div key={index} className='flex flex-col md:flex-row border-b
                                 border-gray-400 pb-2 items-center justify-between mb-2'>
                                    <img src={product.images}
                                        className='w-full md:w-[150px] ' />
                                    <h1>{product.title}</h1>
                                    <div className='flex items-center justify-between text-xl'>
                                        <button className='border border-gray-500 px-3 py-1 text-xl'
                                            onClick={() => dispatch(decrease(cart, product._id))} >-</button>
                                        <h1 className='mx-3'>{product.quantity}</h1>
                                        <button className='border border-gray-500 px-3 py-1'
                                            onClick={() => dispatch(increase(cart, product._id))}>+</button>
                                    </div>

                                    <h1>${product.price}</h1>

                                    <button className="inline-flex items-center px-5 py-2 text-sm font-medium
                                 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800
                                  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                                   dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => setShowModal(true)}
                                    >Delete</button>
                                    {showModal && <Modal showModal={showModal} setShowModal={setShowModal} product={product}
                                        cart={cart} />}
                                </div>
                            ))
                            }

                            <h3 className='mb-5'>Total product price: <span className="text-green-600">TK: {priceTotal}</span></h3>


                        </div>

                        <div className='mt-10 md:mt-0 md:w-1/4 w-full text-center'>
                            <form className='flex flex-col'>
                                <h2 className='text-2xl font-semibold mb-3'>Shipping</h2>
                                {error && <h1 className='text-red-500'>{error}</h1>}
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address"
                                    className="border-2 border-gray-600 mb-2 rounded px-2 py-1" value={address}
                                    onChange={e => setAddress(e.target.value)} />

                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name="mobile" id="mobile"
                                    className="border-2  border-gray-600 mb-2  rounded px-2 py-1" value={mobile}
                                    onChange={e => setMobile(e.target.value)} />
                            </form>

                            <h3 className='mb-5'>Shipping: <span className="text-green-600">Tk: {priceTotal > 1999 ? 0 : 60}</span></h3>
                            <h3 className='mb-5'>Total: <span className="text-green-600">TK: {total}</span></h3>

                            <Link href={auth.user ? '' : '/signin'} className='mt-5'>
                                <h1 className="bg-black cursor-pointer text-white
                             px-3 py-2 rounded"
                                    onClick={handleOrder}
                                >Submit Order</h1>
                            </Link>
                        </div>

                    </div>}
        </div>
    )
}

export default Cart