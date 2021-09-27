import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import Button from '../components/Button'
import { Redirect, Link } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';


const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const history = useHistory();

    const handleSignOutClick = () => {
        removeUserSession(setAuth, setUser, history);
    }

    if (!isAuthenticated) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="h-full flex">
            <Sidebar/>
            <div className="page-content">
                <p>{activeUser['access-token']}</p>
                <p>{activeUser.client}</p>
                <p>{activeUser.expiry}</p>
                <p>{activeUser.uid}</p>
                <Button onClick={()=>handleSignOutClick()}>Sign Out</Button>
                <Link to="/channels"><Button>create channel</Button></Link>
            </div>
        </div>
    )
}

export default Main
