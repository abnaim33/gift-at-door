import Head from 'next/head'
import { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem, updateItem } from '../store/Actions'
import { deleteData, postData, putData } from "../utils/fetchData";
import { FiTrash, FiEdit } from 'react-icons/fi'
import { toast } from 'react-toastify';
const Categories = () => {
    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state

    const [id, setId] = useState('')

    const createCategory = async () => {
        if (auth.user.role !== 'admin')
            return toast("Authentication is not valid", { type: 'error' })
        if (!name) return toast("Name can not be left blank.", { type: 'error' })

        toast('Loading', { type: 'info' })

        let res;
        if (id) {
            res = await putData(`categories/${id}`, { name }, auth.token)
            if (res.err) return toast(res.err, { type: 'error' })
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))

        } else {
            res = await postData('categories', { name }, auth.token)
            if (res.err) return toast(res.err, { type: 'error' })
            dispatch({ type: "ADD_CATEGORIES", payload: [...categories, res.newCategory] })
        }
        setName('')
        setId('')
        return toast(res.msg, { type: 'success' })
    }

    const handleEditCategory = (catogory) => {
        setId(catogory._id)
        setName(catogory.name)
    }

    const deleteCategories = (item) => {
        deleteData(`categories/${item.id}`, auth.token)
            .then(res => {
                toast(res.err, {
                    type: 'error'
                })
                dispatch(deleteItem(item.data, item.id, item.type))

                return toast(res.msg, {
                    type: 'success'
                })
            })

        setShowModal(false)

    }

    return (
        <div className="max-w-[80%] md:max-w-[50%] mx-auto mt-20 md:mt-36">
            <Head>
                <title>Categories</title>
            </Head>

            <div className="flex justify-between mb-3">
                <input type="text" className="border-2 outline-none rounded-sm border-gray-300 pl-2 px-2 py-1"
                    placeholder="Add a new category" value={name}
                    onChange={e => setName(e.target.value)} />

                <button className="bg-black text-white px-4 py-1 rounded ml-1"
                    onClick={createCategory}>
                    {id ? "Update" : "Create"}
                </button>
            </div>

            {
                categories.map(catogory => (
                    <div key={catogory._id} className="flex flex-col my-2 text-capitalize">
                        <div className="bg-gray-300 p-3 rounded flex justify-between">
                            {catogory.name}

                            <div className='flex'>
                                <FiEdit size={25}
                                    className='cursor-pointer'
                                    onClick={() => handleEditCategory(catogory)} />
                                {/* <i className="fas fa-edit mr-2 text-info"
                                    onClick={() => handleEditCategory(catogory)}></i> */}

                                <FiTrash size={25}
                                    onClick={() => setShowModal(true)}
                                    className='cursor-pointer'
                                />

                                {/* <i className="fas fa-trash-alt text-danger"
                                    data-toggle="modal" data-target="#exampleModal"
                                    onClick={() => dispatch({
                                        type: 'ADD_MODAL',
                                        payload: [{
                                            data: categories, id: catogory._id,
                                            title: catogory.name, type: 'ADD_CATEGORIES'
                                        }]
                                    })} ></i> */}
                            </div>

                        </div>

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
                                                    Are you sure to delete this category?
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
                                                    onClick={() => deleteCategories({
                                                        data: categories, id: catogory._id,
                                                        title: catogory.name, type: 'ADD_CATEGORIES'
                                                    })}

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


                    </div>
                ))
            }

        </div>
    )
}

export default Categories