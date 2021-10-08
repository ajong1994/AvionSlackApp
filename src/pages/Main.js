import { useState, useEffect, useContext} from 'react'

/** METHODS **/
import { getAllUsers, getAllSubscribedChannels } from '../utils/Utils'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { Redirect } from 'react-router-dom';

/** COMPONENTS **/
import Sidebar from '../parts/Sidebar';
import Workspace from '../parts/Workspace';
import MainHeader from '../parts/MainHeader';
import ChatInterface from '../parts/ChatInterface';
import RightSidebar from '../parts/RightSidebar';
import MobileNavbar from '../parts/MobileNavbar';


const Main = () => {
    const {isAuthenticated, activeUser, setUser} = useContext(AuthContext);
    const {updateUserList,updateChannelList} = useContext(SessionContext);
    const [isNewMessage, setIsNewMessage] = useState(false);
    const updateIsNewMessage = (bool) => {
        setIsNewMessage(bool);
    }
    useEffect(() => {
        if (activeUser) {
            getAllUsers(activeUser, setUser, updateUserList)
            getAllSubscribedChannels(activeUser, updateChannelList)
        }
    },[activeUser])

    //handles sidebar toggle
    const [isSideBarVisible, setIsSideBarVisible] = useState(true);
    const toggleIsSideBarVisible = () => {
        setIsSideBarVisible(!isSideBarVisible);
    }
    let sidebarClass = "absolute sm:static w-full h-full sm:col-start-1 sm:row-start-1 sm:row-end-3"
    if (!isSideBarVisible) {
        sidebarClass = "hidden absolute w-full h-full sm:block sm:static  sm:col-start-1 sm:row-start-1 sm:row-end-3"
    }

    if (!isAuthenticated) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="h-full flex flex-col w-screen sm:grid main-grid bg-gray-800">
            <MobileNavbar toggleIsSideBarVisible={toggleIsSideBarVisible}/>
            <div className={sidebarClass}>
                <Workspace msgStat={isNewMessage} onClick={updateIsNewMessage}/>
                <Sidebar updateMsgStat={updateIsNewMessage} toggleIsSideBarVisible={toggleIsSideBarVisible}/>
            </div>
            <MainHeader/>
            <ChatInterface msgStat={isNewMessage} activeUser={activeUser} updateMsgStat={updateIsNewMessage}/>
            <RightSidebar />
        </div>
    )
}

export default Main
