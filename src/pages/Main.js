import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { Redirect } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Workspace from '../parts/Workspace';
import MainHeader from '../parts/MainHeader';
import ChatInterface from '../parts/ChatInterface';
import { getAllUsers, getAllSubscribedChannels } from '../utils/Utils'
import MobileNavbar from '../parts/MobileNavbar';


const Main = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext);
    const {updateUserList,updateChannelList} = useContext(SessionContext);
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
    const [isSideBarVisible, setIsSideBarVisible] = useState(true);
    const toggleIsSideBarVisible = () => {
        setIsSideBarVisible(!isSideBarVisible);
    }
    let sidebarClass = "absolute sm:static w-full h-full sm:col-start-1 sm:row-start-1 sm:row-end-3 z-20 sm:z-0 grid sidebar-grid"
    if (!isSideBarVisible) {
        sidebarClass = "hidden absolute w-full h-full sm:grid sm:static sm:col-start-1 sm:row-start-1 sm:row-end-3 z-20 sm:z-0 sidebar-grid"
    }

    if (!isAuthenticated) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="h-full flex flex-col w-screen sm:grid main-grid bg-gray-800">
            <MobileNavbar toggleIsSideBarVisible={toggleIsSideBarVisible} />
            <div className={sidebarClass}>
                <Workspace msgStat={isNewMessage} onClick={updateIsNewMessage}/>
                <Sidebar updateMsgStat={updateIsNewMessage} toggleIsSideBarVisible={toggleIsSideBarVisible}/>
            </div>
            <MainHeader/>
            <ChatInterface msgStat={isNewMessage} activeUser={activeUser} updateMsgStat={updateIsNewMessage}/>
        </div>
    )
}

export default Main
