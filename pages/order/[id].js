import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import OrderDetail from '../../components/OrderDetail'
import { DataContext } from '../../store/GlobalState'

const OrderDetails = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
        console.log(newArr)
    }, [orders, router.query.id])

    if (!auth.user) return null;
    return (
        <div className='mt-20 md:mt-36'>
            <Head>
                <title>Detail Orders</title>
            </Head>

            <div>
                <button className="px-4 py-2 bg-black dark:bg-white rounded text-white ml-4 dark:text-black"
                    onClick={() => router.back()}>
                    Go Back
                </button>
            </div>


            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />

        </div>
    )
}

export default OrderDetails