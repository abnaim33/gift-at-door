import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { DataContext } from '../store/GlobalState'


const Notify = () => {

    const { state, dispatch } = useContext(DataContext)
    const { notify } = state

    return (
        <div>
            {notify.loading && toast("Loading", {
                type: "info"
            })}
            {notify.error && toast(notify.error, {
                type: "error"
            })}
            {notify.success && toast(notify.success, {
                type: "success"
            })}
        </div>
    )
}

export default Notify