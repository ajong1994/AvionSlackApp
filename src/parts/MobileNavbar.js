import { useContext, useEffect, useState } from "react"

/** ICONS **/
import { MenuAlt1Icon } from '@heroicons/react/solid';

/** METHODS **/
import { AuthContext } from '../contexts/AuthContext'
import { assignBg, assignImage } from '../utils/Utils';
import { SessionContext } from "../contexts/SessionContext";


const MobileNavbar = ({toggleIsSideBarVisible}) => {

    const { activeUser } = useContext(AuthContext)
    const { setUser, userList } = useContext(SessionContext)


    const [activeUserProfile, setActiveUserProfile] = useState([])

    useEffect(() => {
        if(activeUser) {
            setActiveUserProfile(userList?.filter(user => user.uid === activeUser.uid))
        }
    }, [activeUser, userList])


    // button for sidebar toggle and getting the profile picture of the activeUser
    return(
        <div className="flex items-center justify-between py-1 px-4 border-b border-gray-600 bg-black sm:hidden">
            <span className="text-gray-100 flex items-center">
                <MenuAlt1Icon onClick={toggleIsSideBarVisible} className="h-5 w-5"/>
            </span>

            {
            activeUserProfile && 
            <div className="text-gray-300 flex py-1 items-center relative">   
                <div className="flex justify-center items-center h-6 w-6 flex-shrink-0">
                    <span className={assignBg(activeUserProfile[0]?.id)}>
                        <img src={assignImage(activeUserProfile[0]?.id, "User")} className="h-6 w-6 items-center"/>
                    </span>
                </div>
                <span className="bg-green-500 rounded-full h-2 w-2 absolute bottom-0 right-0 -mr-1"></span>
            </div>
            }
        </div>
        
    )
}

export default MobileNavbar
