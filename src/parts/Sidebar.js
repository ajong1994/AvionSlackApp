import { Disclosure } from '@headlessui/react';
import { useState, useContext } from 'react';
import Button from '../components/Button'
import CreateChannel from './CreateChannel';
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';



const Sidebar = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const { channelList } = useContext(SessionContext)

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

  
    return (
        <div className="col-start-1 col-end-2 row-start-2">
            <div className="h-full p-4 border-r border-gray-600 flex flex-col items-start text-gray-300 bg-gray-900">
                <Disclosure>
                    <Disclosure.Button className="py-2">
                        Channels
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                    <div className="overflow-scroll h-48">
                    {channelList?.map(channel => (
                        <li key={channel.id} className="p-2 list-none">
                            {channel.name}
                         </li>))} 
                    </div>
                        <Button onClick={toggleModal}>
                        add channel
                        </Button>
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
