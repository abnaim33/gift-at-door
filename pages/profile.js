import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import Cookie from 'js-cookie'
// import valid from '../utils/valid'
// import { patchData } from '../utils/fetchData'

import { imageUpload } from '../utils/imageUpload'
import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Profile = () => {
    const router = useRouter()
    const initialSate = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialSate)
    const { avatar, name, password, cf_password } = data

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state

    useEffect(() => {
        if (auth.user) setData({ ...data, name: auth.user.name })
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpdateProfile = e => {

        e.preventDefault()
        if (password) {
            const errMsg = valid(name, auth.user.email, password, cf_password)
            if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
            updatePassword()
        }
        console.log(name, auth.user.name)
        if (name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        patchData('user/resetPassword', { password }, auth.token)
            .then(res => {
                console.log(res, 'from update password')
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                setData({
                    password: '',
                    cf_password: ''
                })

                return toast(res.msg, {
                    type: 'success'
                })
            })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (!file)
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist.' } })

        // if(file.size > 1024 * 1024) //1mb
        //     return dispatch({type: 'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({ type: 'NOTIFY', payload: { error: 'Image format is incorrect.' } })

        setData({ ...data, avatar: file })
    }

    const updateInfor = async () => {
        let media;
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        if (avatar) media = await imageUpload([avatar])

        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            console.log(res, 'from update name')
            if (res.err) return toast(res.err, {
                type: "error"
            })

            dispatch({
                type: 'AUTH', payload: {
                    token: auth.token,
                    user: res.user
                }
            })
            return toast(res.msg, {
                type: "success"
            })
        })
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        // dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })

        toast('Logged Out', {
            type: 'success'
        })

        return router.push('/')
    }

    if (!auth.user) return null;
    return (
        <div className="ml-auto px-10 mt-20 md:mt-36">
            <Head>
                <title>Profile</title>
            </Head>

            <section className="flex flex-col md:flex-row text-secondary my-3">
                <div className="md:w-1/3 w-full mr-5 mb-14 md:mb-0 space-y-4">
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                    </h3>

                    <div className="w-[150px] h-[150px] rounded-full text-center overflow-hidden
                     bg-gray-500 relative mx-10">
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                            alt="avatar" className='w-full h-full block' />

                    </div>



                    <div className="flex flex-col space-y-1">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-500">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoFocus
                            value={name}
                            className="px-4 py-2 transition duration-300 border
                             border-gray-300 rounded focus:border-transparent
                              focus:outline-none focus:ring-4 focus:ring-blue-200"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" defaultValue={auth.user.email}
                            className="md:w-full w-[400px] ml-5" disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password: </label>
                        <input type="password" name="password" value={password}
                            className="ml-3"
                            placeholder="Your new password"

                            onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm Password: </label>
                        <input type="password" name="cf_password" value={cf_password}
                            className="ml-3"
                            placeholder="Confirm new password" onChange={handleChange} />
                    </div>

                    <button className="bg-black dark:bg-white dark:text-black cursor-pointer text-white px-3 py-1 rounded mt-5" disabled={notify.loading}
                        onClick={handleUpdateProfile}
                    >
                        Update
                    </button>
                </div>

                <div className="md:w-2/3 w-full bg-gray-200 p-5">
                    <h3 className="text-2xl mb-5">Orders</h3>
                    {
                        orders.length === 0 ? <h1 className='text-xl'>You have no orders</h1>
                            :
                            <div className="my-3 table-responsive">
                                <table className="table-bordered table-hover w-100 text-uppercase"
                                    style={{ minWidth: '600px', cursor: 'pointer' }}>
                                    <thead className="bg-light font-weight-bold bg-indigo-600
                             border border-gray-200">
                                        <tr>
                                            <td className="p-2 border-x border-gray-500">id</td>
                                            <td className="p-2 border-r border-gray-500">date</td>
                                            <td className="p-2 border-r border-gray-500">total</td>
                                            <td className="p-2 border-r border-gray-500">status</td>
                                            <td className="p-2 border-r border-gray-500">paid</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orders.map(order => (
                                                <tr key={order._id} className='border border-gray-400'>
                                                    <td className="p-2  border-r border-gray-500 ">
                                                        <Link href={`/order/${order._id}`}>
                                                            <h1>{order._id}</h1>
                                                        </Link>

                                                    </td>
                                                    <td className="p-2 border-r border-gray-500">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="p-2 border-r border-gray-500">${order.total}</td>
                                                    <td className="p-2  border-r border-gray-500">
                                                        {
                                                            order.delivered
                                                                // ? <i className="fas fa-check text-success"></i>
                                                                // : <i className="fas fa-times text-danger"></i>
                                                                ? <h1 className='text-green-600 font-semibold'>Delivered</h1>
                                                                : <h1 className='text-red-600 dark:text-red-400 font-semibold'>Pending</h1>
                                                        }
                                                    </td>
                                                    <td className="p-2">
                                                        {
                                                            order.paid
                                                                // ? <i className="fas fa-check text-success"></i>
                                                                // : <i className="fas fa-times text-danger"></i>
                                                                ? <h1 className='text-green-600 font-semibold'>True</h1>
                                                                : <h1 className='text-red-600 dark:text-red-400 font-semibold'>false</h1>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                            </div>

                    }

                </div>
            </section>

            <div>
                <button className='bg-indigo-600 text-white px-8
                 font-semibold py-1 rounded mt-5'
                    onClick={handleLogout}>LogOut</button>
            </div>

        </div>
    )
}

export default Profile