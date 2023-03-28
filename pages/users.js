import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

const Users = () => {

    const { state, dispatch } = useContext(DataContext)

    const { users } = state

    console.log(users)

    return (
        <div>Users</div>
    )
}

export default Users