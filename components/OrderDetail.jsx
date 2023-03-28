import Link from 'next/link'
// import PaypalBtn from './paypalBtn'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'
import { useState } from 'react'

const OrderDetail = ({ orderDetail, state, dispatch }) => {
    const { auth, orders } = state


    const [paymentId, setPaymentId] = useState('')
    const [method, setMethod] = useState('cash')
    const handleDelivered = (order) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        patchData(`order/delivered/${order._id}`, null, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                const { paid, dateOfPayment, method, delivered } = res.result

                dispatch(updateItem(orders, order._id, {
                    ...order, paid, dateOfPayment, method, delivered
                }, 'ADD_ORDERS'))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }


    const handlePaid = (order) => {

        patchData(`order/payment/${order._id}`, {
            paymentId,
            method
        }, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                dispatch(updateItem(orders, order._id, {
                    ...order,
                    paid: true, dateOfPayment: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
                    ,
                    paymentId, method
                }, 'ADD_ORDERS'))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
        // This function shows a transaction success message to your buyer.

        console.log('done')
    }

    if (!auth.user) return null;
    return (
        <>
            {
                orderDetail.map(order => (
                    <div key={order._id} style={{ margin: '20px auto' }} className="flex justify-content-around">

                        <div className=" my-3 p-4 mx-auto w-full md:w-[600px] bg-gray-300 dark:bg-gray-500">
                            <h2 className="text-xl">Order : {order._id}</h2>

                            <div className="mt-4 font-semibold space-y-2 w-full">
                                <h3 className='text-xl mb-4'>Shipping</h3>
                                <p>Name: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Address: {order.address}</p>
                                <p>Mobile: {order.mobile}</p>

                                <div className={`rounded ${order.delivered ? 'bg-green-400' : 'bg-red-400'}
                        flex justify-between items-center p-2 w-full`} role="alert">
                                    {
                                        order.delivered ? `Deliverd on ${order.updatedAt}` : 'Not Delivered'
                                    }
                                    {
                                        auth.user.role === 'admin' && !order.delivered &&
                                        <button className='px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded font-semibold'
                                            onClick={() => handleDelivered(order)}>
                                            Mark as delivered
                                        </button>
                                    }

                                </div>

                                <h3 className='text-2xl'>Payment</h3>
                                {
                                    order.method && <h6>Method: <em>{order.method}</em></h6>
                                }

                                {
                                    order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                                }

                                <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        order.paid ? <h1 className='bg-green-400 p-2 rounded'> Paid on {order.dateOfPayment}</h1> : <h1 className='bg-red-400 p-2 rounded'>Not Paid</h1>
                                    }

                                </div>

                                <div>
                                    <h3 className='text-xl my-4'>Order Items</h3>
                                    {
                                        order.cart.map(item => (
                                            <div className="flex border-b mx-0 p-2 justify-between
                                    items-center" key={item._id} style={{ maxWidth: '550px' }}>
                                                <img src={item.images} alt={item.images}
                                                    style={{ width: '50px', height: '45px', objectFit: 'cover' }} />

                                                <h5 className="flex-fill text-secondary px-3 m-0">
                                                    <Link href={`/product/${item._id}`}>
                                                        <h1>{item.title}</h1>
                                                    </Link>
                                                </h5>

                                                <span className="text-info m-0">
                                                    {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                                </span>

                                            </div>
                                        ))
                                    }
                                </div>

                            </div>

                        </div>

                        {
                            !order.paid && auth.user.role === 'admin' &&
                            <div className="p-4 flex flex-col space-y-2">
                                <h2 className="mb-4">Total: ${order.total}</h2>
                                {/* <PaypalBtn order={order} /> */}
                                <input type="text" placeholder='payment id' value={paymentId}
                                    onChange={e => setPaymentId(e.target.value)}
                                    className='px-2 py-1' />
                                <select name="cars" id="cars" form="carform"
                                    onChange={e => setMethod(e.target.value)}
                                    className='px-2 py-1'>
                                    <option value="cash">Cash</option>
                                    <option value="bkash">Bkash</option>
                                    <option value="nagad">Nagad</option>
                                    <option value="Rocket">Rocket</option>
                                </select>
                                <button onClick={() => handlePaid(order)}
                                    className='px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded font-semibold' >Paid</button>

                            </div>
                        }

                    </div>
                ))
            }
        </>
    )
}

export default OrderDetail