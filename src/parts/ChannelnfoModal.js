import { useState, useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import { Dialog, Transition  } from '@headlessui/react'
import {assignImage, assignBg, postInviteToChannel, useComponentVisible} from "../utils/Utils"
import ModalTextfield from '../components/ModalTextfield';
import { XIcon } from '@heroicons/react/solid';


const ChannelInfoModal = ({setOpenModal, openModal, toggleToast, updateToastStat}) => {
    const { activeUser } = useContext(AuthContext)
    const { channelData, moreChannelData, updateChannelData, userList } = useContext(SessionContext)

    //handles the changes on the input box
    const [searchUser, setSearchUser] = useState('')
    const handleSearchUserChange = (e) => {
        setSearchUser(e.target.value)
        setIsComponentVisible((e.target.value !== '' ? true: false))
    }
    //an array that shows real-time search
    const [searchUserList, setSearchUserList] = useState([])
    //depending on searchUser changes, this filters the result that matches with the input
    useEffect(() => {
        if (searchUser !== '') {
            const regex = new RegExp(`${searchUser}`, 'i')
            setSearchUserList(userList?.filter(user => regex.test(user.uid)).slice(0, 10))
        } else {
            setSearchUserList([])
            setIsComponentVisible(false)
        }
    },[searchUser])
    //use custom hook to toggle display of search recommendations and to close modal on outside click
    const { ref: inviteRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    //function that invites clicked user in the array 
    const handleInviteUserClick = (user_id) => {
        postInviteToChannel(activeUser, channelData.id, user_id, updateChannelData, toggleToast, updateToastStat, setSearchUser)
        setIsComponentVisible(false)
    }

    return (
        <>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setOpenModal(false)}
                >
                <div className="min-h-screen px-4 text-center ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                    <div className="inline-block modal-width bg-gray-800 p-4 my-8 text-left align-middle transition-all sm:transform shadow-md rounded-lg border border-black min-w-200">
                        <div className="flex text-gray-100 text-lg justify-between items-center mb-6"> 
                            <h3>Channel Information</h3>
                            <XIcon className="h-5 w-5 cursor-pointer" onClick={() => setOpenModal(false)}/>
                        </div>
                        <div className="mb-4 text-gray-300 relative">
                            <ModalTextfield onChange={handleSearchUserChange} id='inviteUser' type='text' placeholder="Invite a friend" value={searchUser}
                                inputClass="mt-2 py-1 px-2 rounded bg-gray-900 text-sm text-gray-300 border-transparent focus:ring-0 focus:outline-none focus:border-transparent"/>
                            <div ref={inviteRef} className="absolute z-10 w-full">
                                {isComponentVisible && <div className="text-gray-200 max-h-96 w-full overflow-y-auto border-gray-600 border rounded-lg bg-gray-700 py-2 modified-scrollbar">
                                    <ul>          
                                        {
                                            searchUserList?.map((user) => (
                                                <li key={user.id} className="px-6 py-1 flex gap-2 text-white hover:bg-white hover:text-gray-700 cursor-pointer" onClick={()=>handleInviteUserClick(user.id)}>
                                                    <div className="flex justify-center items-center h-5 w-5">
                                                        <span className={assignBg(user?.id)}>
                                                            <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                                        </span>
                                                    </div>
                                                    <div className="text-sm">{user?.uid}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>}
                            </div>
                        </div>
                        <div className="flex flex-col items-start text-gray-300 overflow-y-auto modified-scrollbar max-h-56">
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
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition> 
        </> 
    )
}

export default ChannelInfoModal
