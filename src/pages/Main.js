import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import Button from '../components/Button'
import CreateChannel from './CreateChannel';
import { Redirect, Link } from 'react-router-dom';


const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const history = useHistory();

    const handleSignOutClick = () => {
        removeUserSession(setAuth, setUser, history);
    }

    if (!isAuthenticated || !activeUser) {
        return <Redirect to='/signin' />
    }

    return (
        <div>
            <p>{activeUser['access-token']}</p>
            <p>{activeUser.client}</p>
            <p>{activeUser.expiry}</p>
            <p>{activeUser.uid}</p>
            <Button onClick={()=>handleSignOutClick()}>Sign Out</Button>
            <Link to="/create-channel"><Button>create channel</Button></Link>
        </div>

    )
}

export default Main
