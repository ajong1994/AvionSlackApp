import { Disclosure } from '@headlessui/react';
import { useState, useContext, useEffect } from 'react';
import CreateChannel from './CreateChannel';
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import { getChannelData } from '../utils/Utils';
import { assignImage, assignBg} from "../utils/Utils";
import { ChevronRightIcon, PlusSmIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react'
import Toast from './Toast';


const Sidebar = ({updateMsgStat}) => {
    const { activeUser } = useContext(AuthContext)
    const { userList, channelList, updateChannelData, updateRecipientMetadata, updateMsgRecipient, updateMsgList, setIsMsgListLoading  } = useContext(SessionContext)
    useEffect(() => {
        setDmList(userList?.slice(-10))
    },[userList])

    //Create Util function to open modal when Add Channel is clicked
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const [dmList, setDmList] = useState(null)
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


    const handleMsgClick = (id, type, name) => {
        // updateMsgList([])
        setIsMsgListLoading(true)
        updateMsgStat(false)
        updateRecipientMetadata(id, type)
        updateMsgRecipient(name)
        if (type === "Channel") {
            getChannelData(activeUser, id, updateChannelData)
        }
    }

    return (
        <div className="col-start-1 col-end-2 row-start-2">
            <div className="h-full border-r border-gray-600 flex flex-col items-start text-gray-300 bg-gray-900 truncate no-scrollbar">
                <Disclosure>
                    {({open}) => (
                        <>
                            <Disclosure.Button className="pt-6 pb-2 px-4 flex items-center">
                                <ChevronRightIcon
                                    className={`${open ? 'transform rotate-90' : ''} w-5 h-5 text-gray-300 mr-2`} />
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
                                className="w-full pb-6"
                            >
                                <Disclosure.Panel className="text-gray-500" static as="ul">
                                    {channelList?.map(channel => (
                                        <li key={channel.id} className="flex py-1 px-6 items-center hover:bg-gray-700 cursor-pointer" onClick={()=>handleMsgClick(channel?.id, "Channel", channel?.name)}>
                                            <div className="flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                                                <span className={assignBg(channel?.id)}>
                                                    <img src={assignImage(channel?.id, "Channel")} className="h-5 w-5 items-center"/>
                                                </span>
                                            </div>
                                            <div className="text-gray-300 truncate text-sm">{channel?.name}</div>
                                        </li>))}
                                    <div className="flex py-1 px-6 items-center hover:bg-gray-700 cursor-pointer text-gray-300" onClick={toggleModal}>
                                        <div className="flex items-center justify-center bg-gray-600 h-5 w-5 mr-2 flex-shrink-0 rounded">
                                            <PlusSmIcon className="h-5 w-5" />
                                        </div>
                                        <span>Add channel</span>
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                     )}
                </Disclosure>
                {openModal && <CreateChannel openModal={openModal} setOpenModal={setOpenModal} toastStat={toastStat} isToastShowing={isToastShowing} toggleToast={toggleToast} updateToastStat={updateToastStat}/>} 
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
                            <Disclosure.Panel className="text-gray-500 w-full" static as="ul">
                                {!!dmList?.length
                                && dmList.map((user) => (
                                <li key={user.id} className="flex py-1 px-6 items-center hover:bg-gray-700 cursor-pointer" onClick={()=>handleMsgClick(user?.id, "User", user.uid)}>
                                    <div className="flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                                        <span className={assignBg(user?.id)}>
                                            <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                        </span>
                                    </div>
                                    <div className="text-gray-300 truncate text-sm">{user?.uid}</div>
                                </li>))}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                    )}
                </Disclosure>
            </div>
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
            </div>
    )
}

export default Sidebar
