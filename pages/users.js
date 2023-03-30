import Head from 'next/head'
import { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import { FiTrash, FiEdit } from 'react-icons/fi'
import Modal from '../components/Modal'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import { useRouter } from 'next/router'



const Users = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { users, auth, modal } = state
    const [showModal, setShowModal] = useState(false)

    const deleteUser = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))

        deleteData(`user/${item.id}`, auth.token)
            .then(res => {

                if (res.err) return toast(res.err, { type: 'error' })

                return toast(res.msg, { type: 'success' })
            })

        setShowModal(false)
    }

    // if (!auth.user) return router.push('/signin');
    return (
        <div className="table-responsive mt-20 md:mt-36">
            <Head>
                <title>Users</title>
            </Head>

            {
                auth.user?.role === 'admin' ?
                    <>
                        <h1 className='px-10 text-base text-gray-700 dark:text-gray-300 mb-10'>This page is better in desktop view</h1>
                        <h1 className='px-10 text-sm text-gray-700 dark:text-gray-300 mb-10'>You have to admin and root user for edit role of a user but you can delete user if you admin</h1>

                        <table className="px-10 min-w-full overflow-hidden flex-nowrap flex flex-col mb-28">
                            <thead>
                                <tr className='flex justify-between items-center'>
                                    <th>No.</th>
                                    <th>ID</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <>
                                            <tr key={user._id} className='flex items-center 
                                justify-between w-full  space-y-10'>
                                                <th>{index + 1}</th>
                                                <th>{user._id}</th>
                                                <th>
                                                    <img src={user.avatar} alt={user.avatar}

                                                        className='w-[50px] overflow-hidden cover bg-white  rounded-full p-1' />
                                                </th>
                                                <th>{user.name}</th>
                                                <th>{user.email}</th>
                                                <th>
                                                    {
                                                        user.role === 'admin'
                                                            ? user.root ?

                                                                <h1>Root </h1>

                                                                : <h1>true</h1>


                                                            : <h1>false </h1>
                                                    }
                                                </th>

                                                <th className='flex ml-5 items-center '>
                                                    <Link href={
                                                        auth.user.root && auth.user.email !== user.email
                                                            ? `/edit_user/${user._id}` : '#!'
                                                    } className='mr-5'>
                                                        <span><FiEdit size={25} /></span>
                                                    </Link>


                                                    <FiTrash size={25}
                                                        onClick={() => setShowModal(true)}
                                                        className='cursor-pointer' />
                                                </th>
                                            </tr>


                                            {showModal ? (
                                                <>
                                                    <div
                                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                    >
                                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                            {/*content*/}
                                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                {/*header*/}
                                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                    <h3 className="text-3xl font-semibold">
                                                                        Modal Title
                                                                    </h3>
                                                                    <button
                                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                        onClick={() => setShowModal(false)}
                                                                    >
                                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                            ×
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                {/*body*/}
                                                                <div className="relative p-6 flex-auto">
                                                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                        Are you sure to delete this user?
                                                                    </p>
                                                                </div>
                                                                {/*footer*/}
                                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                    <button
                                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => setShowModal(false)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        // onClick={() => dispatch({
                                                                        //     type: 'ADD_MODAL',
                                                                        //     payload: [{ data: users, id: user._id, title: user.name, type: 'ADD_USERS' }]
                                                                        // })}
                                                                        onClick={() => deleteUser({ data: users, id: user._id, title: user.name, type: 'ADD_USERS' })}

                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                </>
                                            ) : null}

                                        </>
                                    )

                                    )

                                }
                            </tbody>
                        </table>
                    </>
                    :
                    <div>
                        <h1>You are not allowed for this page</h1>
                    </div>
            }

        </div>
    )
}

export default Users