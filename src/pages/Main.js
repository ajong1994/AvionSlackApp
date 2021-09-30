import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { Redirect } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Workspace from '../parts/Workspace';
import MainHeader from '../parts/MainHeader';
import ChatInterface from '../parts/ChatInterface';
import { getAllUsers, getAllSubscribedChannels } from '../utils/Utils'


const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext);
    const {userList, updateUserList, channelList, updateChannelList, channelData, updateChannelData} = useContext(SessionContext);
    const [isNewMessage, setIsNewMessage] = useState(false);
    const updateIsNewMessage = (bool) => {
        setIsNewMessage(bool);
    }

    useEffect(() => {
        if (activeUser) {
            getAllUsers(activeUser, updateUserList)
            getAllSubscribedChannels(activeUser, updateChannelList)
        }
    },[activeUser])

    if (!isAuthenticated && activeUser) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="h-full grid main-grid bg-gray-800">
            <Workspace onClick={updateIsNewMessage}/>
            <Sidebar />
            <MainHeader title={isNewMessage ? 'New message' : 'Channel or DM placeholder'}/>
            <ChatInterface msgStat={isNewMessage} activeUser={activeUser} />
        </div>
    )
}

export default Main
