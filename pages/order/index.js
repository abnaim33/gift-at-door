import React, { useContext, useEffect } from 'react'
import OrderDetail from '../../components/OrderDetail'
import { DataContext } from '../../store/GlobalState'

const Order = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders } = state



    return (
        <div className='mt-20 md:mt-36'>
            {
                orders.length === 0 ?
                    <div>
                        order pai nai
                    </div> :
                    <div>

                        <OrderDetail orderDetail={orders} state={state} dispatch={dispatch} />
                    </div>
            }
        </div>
    )
}

export default Order