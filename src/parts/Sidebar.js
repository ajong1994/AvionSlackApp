import { Disclosure } from '@headlessui/react';
import { useState, useContext } from 'react';
import Button from '../components/Button'
import CreateChannel from './CreateChannel';
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { getChannelData } from '../utils/Utils';


const Sidebar = () => {
    const { setAuth, setUser, activeUser } = useContext(AuthContext)
    const { channelList, updateChannelData } = useContext(SessionContext)

    //Use Util function to get Channel list and set ChannelList State

    //Create Util function to open modal when Add Channel is clicked
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const history = useHistory();

    const handleSignOutClick = () => {
        removeUserSession(setAuth, setUser, history);
    }
    
    const handleChannelNameClick = (id) => {
        getChannelData(activeUser, id, updateChannelData)
        console.log('hello')
    }



    return (
        <div className="col-start-1 col-end-2 row-start-2">
            <div className="h-full p-4 border-r border-gray-600 flex flex-col items-start text-gray-300 bg-gray-900">
                <Disclosure defaultOpen={true}>
                    <Disclosure.Button className="py-2">
                        Channels
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                    <ul className="overflow-y-scroll no-scrollbar w-52 h-72">
                        {channelList?.map(channel => (
                            <li key={channel.id}  onClick={() => { handleChannelNameClick(channel.id) }} className="cursor-pointer p-2 list-none">
                                {channel.name}
                            </li>))} 
                    </ul>
                    <div className="flex relative" onClick={toggleModal}>
                        <PlusCircleIcon className="absolute -top-1 right-14 top-0 cursor-pointer mx-3 h-9 w-6"  stroke="currentColor"/>
                        <span>Add channel</span>
                    </div>
                    </Disclosure.Panel>
                </Disclosure>
                {openModal && <CreateChannel openModal={openModal} setOpenModal={setOpenModal}/>} 
                <Disclosure>
                    <Disclosure.Button className="py-2">
                        Direct Messages
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                        <div>
                            Map all direct messages here
                        </div>
                    </Disclosure.Panel>
                </Disclosure>
                <Button onClick={()=>handleSignOutClick()}>Sign Out</Button>
            </div>
        </div>
    )
}

export default Sidebar
