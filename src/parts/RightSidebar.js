import { Disclosure } from '@headlessui/react';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import { Transition } from '@headlessui/react'
import {assignImage, assignBg, postInviteToChannel} from "../utils/Utils"
import Toast from './Toast';
import ModalTextfield from '../components/ModalTextfield';


const RightSidebar = () => {
    const { activeUser } = useContext(AuthContext)
    const { channelData, moreChannelData, updateChannelData, userList } = useContext(SessionContext)

    //handles the changes on the input box
    const [searchUser, setSearchUser] = useState('')
    const handleSearchUserChange = (e) => {
        setSearchUser(e.target.value)
    }
    //an array that shows real-time search
    const [searchUserList, setSearchUserList] = useState([])
    //depending on searchUser changes, this filters the result that matches with the input
    useEffect(() => {
        if (searchUser !== '') {
        const regex = new RegExp(`${searchUser}`, 'i')
        setSearchUserList(userList?.filter(user => regex.test(user.uid)).slice(0, 3))
        } else {
        setSearchUserList([])
        }
    },[searchUser])

    const [isToastShowing, setIsToastShowing] = useState(false)
    const [toastStat, setToastStat] = useState({
        toastType: '',
        toastMsg: ''
    });

    /*----TOAST HANDLER FUNCTIONS----*/
    const toggleToast = (bool) => {
        setIsToastShowing(bool);
    }

    const updateToastStat = (type, msg) => {
        setToastStat({
            toastType: type,
            toastMsg: msg
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsToastShowing(false);
        },2000)
        return () => clearTimeout(timer);
    }, [isToastShowing]) 
    /*----TOAST HANDLER FUNCTIONS----*/

 //function that invites clicked user in the array 
  const handleInviteUserClick = (user_id) => {
    postInviteToChannel(activeUser, channelData.id, user_id, updateChannelData, toggleToast, updateToastStat, setSearchUser)
  }

    return (
        <>
            <Disclosure className="col-start-1 col-end-2 row-start-2">
                {({open}) => (
                    <>
                        <Disclosure.Button className=" text-gray-300 flex float mr-20 items-center justify-end col-start-3 col-end-5 row-start-1">
                                <div className="flex align-center -space-x-2 overflow-hidden">
                                    {
                                        moreChannelData.members && moreChannelData.members.slice(0, 3).map((user) => (
                                            <div className="flex rounded border-2 border-gray-900">
                                                <div className="flex justify-center items-center h-8 w-8 overflow-hidden flex-reverse">
                                                    <span className={assignBg(user?.id)} >
                                                        <img src={assignImage(user?.id, "User")} classname="h-8 w-8 items-center"/>
                                                    </span> 
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="flex justify-center items-center rounded border-2 bg-gray-900 border-gray-900">
                                    {
                                        moreChannelData?.members.length > 3 && <div className=" h-8 w-8 rounded border-2 bg-gray-900 border-gray-900">
                                                {moreChannelData.members.length}
                                            </div>
                                    }
                                    </div>
                        
                                </div>
                               
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="row-start-2 col-start-4 flex justify-end max-w-xs "
                        >
                            <Disclosure.Panel className="w-60 text-gray-500 border-l border-gray-600 bg-gray-900" static as="ul">
                                <div>
                                    <div className="h-full p-4 text-gray-300 bg-gray-900">
                                
                                    <ModalTextfield onChange={handleSearchUserChange} id='inviteUser' type='text' placeholder="Invite a friend" value={searchUser}
                                    inputClass="mt-2 py-1 px-2 rounded bg-gray-800 text-sm text-gray-300 border-transparent focus:ring-0 focus:outline-none focus:border-transparent"/>

                                    <ul className="pt-2">          
                                        {
                                            searchUserList?.map((user) => (
                                                <li key={user.id} className="flex py-2 px-2 items-center hover:bg-gray-700 cursor-pointer" onClick={()=>handleInviteUserClick(user.id)}>
                                                    <div className="flex justify-center items-center h-5 w-5 mr-2 ">
                                                        <span className={assignBg(user?.id)}>
                                                            <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-300 text-sm">{user?.uid}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    </div>
                                    <div className="h-full p-4 flex flex-col items-start text-gray-300 bg-gray-900">
                                    <span className="pb-4">Channel Members:</span>
                                    <ul className="w-full">
                                        {
                                            moreChannelData.members && moreChannelData.members.map((user) => (
                                                <li key={user.id} className="flex py-1 px-2 items-center">
                                                    <div className=" flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                                                        <span className={assignBg(user?.id)}>
                                                            <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-300 text-sm truncate">{user?.uid}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Transition
                show={isToastShowing}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Toast type={toastStat.toastType} onClick={() => {toggleToast(false)}}>{toastStat.toastMsg}</Toast>
            </Transition>
        </> 
    )
}

export default RightSidebar
