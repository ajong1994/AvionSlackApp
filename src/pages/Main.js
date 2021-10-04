import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { Redirect } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Workspace from '../parts/Workspace';
import MainHeader from '../parts/MainHeader';
import ChatInterface from '../parts/ChatInterface';
import RightSidebar from '../parts/RightSidebar';
import { getAllUsers, getAllSubscribedChannels } from '../utils/Utils'


const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext);
    const {updateUserList,updateChannelList} = useContext(SessionContext);
    const [isNewMessage, setIsNewMessage] = useState(false);
    useEffect(() => {
        if (activeUser) {
            getAllUsers(activeUser, updateUserList)
            getAllSubscribedChannels(activeUser, updateChannelList)
        }
    },[activeUser])

    const updateIsNewMessage = (bool) => {
        setIsNewMessage(bool);
    }

    if (!isAuthenticated || !activeUser) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="h-full grid main-grid bg-gray-800">
            <Workspace msgStat={isNewMessage} onClick={updateIsNewMessage}/>
            <Sidebar updateMsgStat={updateIsNewMessage}/>
            <MainHeader/>
            <ChatInterface msgStat={isNewMessage} activeUser={activeUser} updateMsgStat={updateIsNewMessage}/>
            <RightSidebar />
        </div>
    )
}

export default Main
