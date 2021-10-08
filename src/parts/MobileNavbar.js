import { useContext } from "react"

/** ICONS **/
import { MenuAlt1Icon } from '@heroicons/react/solid';

/** METHODS **/
import { AuthContext } from '../contexts/AuthContext'
import { assignBg, assignImage } from '../utils/Utils';
import { SessionContext } from "../contexts/SessionContext";


const MobileNavbar = ({toggleIsSideBarVisible}) => {

    const { activeUser } = useContext(AuthContext)
    const { setUser, userList } = useContext(SessionContext)


    const getActiveUser = () => {
        if(activeUser) {
            let activeUserProfile = userList.filter(user => user.uid === activeUser.uid)
            activeUser.user = activeUserProfile[0]
            setUser(activeUser)
        }
    }

    // button for sidebar toggle and getting the profile picture of the activeUser
    return(
        <div className="col-start-1 col-end-5 row-start-1 flex items-center py-2 px-4 border-b border-gray-600">
            <span className=" w-20 bg-white p-2 flex self-start">
                <MenuAlt1Icon onClick={toggleIsSideBarVisible} className="h-4 w-4"/>
            </span>

            {
            activeUser.user && <div className="text-gray-300 flex py-1 px-2 self-end items-center">   
                <div className=" flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                    <span className={assignBg(activeUser.id)}>
                        <img src={assignImage(activeUser.id, "User")} className="h-5 w-5 items-center"/>
                    </span>
                </div>
            </div>
            }
        </div>
        
    )
}

export default MobileNavbar
