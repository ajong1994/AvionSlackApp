import { Disclosure } from '@headlessui/react';
import { useState, useContext, useEffect } from 'react';
import Button from '../components/Button'
import CreateChannel from './CreateChannel';
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import { assignImage, assignBg, removeUserSession } from "../utils/Utils";
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react'


const Sidebar = ({updateMsgStat}) => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const { userList,channelList, updateRecipientMetadata, updateMsgRecipient, updateMsgList } = useContext(SessionContext)

    //Use Util function to get Channel list and set ChannelList State

    //Create Util function to open modal when Add Channel is clicked
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const [dmList, setDmList] = useState(null)

    useEffect(() => {
        setDmList(userList?.slice(-10))
    },[userList])

    const history = useHistory();

    const handleSignOutClick = () => {
        removeUserSession(setAuth, setUser, history);
    }

    const handleMsgClick = (id, type, email) => {
        updateMsgList([])
        updateMsgStat(false)
        updateRecipientMetadata(id, type)
        updateMsgRecipient(email)
    }

  
    return (
        <div className="col-start-1 col-end-2 row-start-2">
            <div className="h-full py-4 border-r border-gray-600 flex flex-col items-start text-gray-300 bg-gray-900 truncate">
                <Disclosure>
                    {({open}) => (
                        <>
                        <Disclosure.Button className="py-2 px-4 flex items-center">
                            <ChevronRightIcon
                                className={`${
                                    open ? 'transform rotate-90' : ''
                                } w-5 h-5 text-gray-300 mr-2`}
                            />
                            <span>Channels</span>
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="text-gray-500" static>
                            <div className="overflow-y-scroll h-72">
                            {channelList?.map(channel => (
                                <li key={channel.id} className="p-2 list-none">
                                    {channel.name}
                                </li>))} 
                            </div>
                                <Button onClick={toggleModal}>
                                add channel
                                </Button>
                            </Disclosure.Panel>
                        </Transition>
                        </>
                    )}
                </Disclosure>
                {openModal && <CreateChannel openModal={openModal} setOpenModal={setOpenModal}/>} 
                <Disclosure>
                {({open}) => (
                    <>
                        <Disclosure.Button className="py-2 px-4 flex items-center">
                        <ChevronRightIcon
                            className={`${
                                open ? 'transform rotate-90' : ''
                            } w-5 h-5 text-gray-300 mr-2`}
                        />
                        <span>Direct Messages</span>
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="w-full"
                        >
                            <Disclosure.Panel className="text-gray-500 w-full" static>
                                {!!dmList?.length
                                && dmList.map((user) => (
                                <div key={user.id} className="flex py-1 px-6 items-center hover:bg-gray-700 cursor-pointer" onClick={()=>handleMsgClick(user?.id, "User", user.uid)}>
                                    <div className="flex justify-center items-center h-5 w-5 mr-2">
                                        <span className={assignBg(user?.id)}>
                                            <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                        </span>
                                    </div>
                                    <div className="text-gray-300 truncate text-sm">{user.uid}</div>
                                </div>))}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                    )}
                </Disclosure>
                <Button onClick={()=>handleSignOutClick()}>Sign Out</Button>
            </div>
        </div>
    )
}

export default Sidebar
