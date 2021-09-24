import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'



const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    return (
        <div>
            <p>{activeUser['access-token']}</p>
            <p>{activeUser.client}</p>
            <p>{activeUser.expiry}</p>
            <p>{activeUser.uid}</p>
        </div>
    )
}

export default Main
