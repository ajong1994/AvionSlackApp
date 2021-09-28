import {Link} from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Button from '../components/Button'
import CreateChannel from './CreateChannel';


const Sidebar = () => {
    const [channelList, setChannelList] = useState(null);

    //Use Util function to get Channel list and set ChannelList State

    //Create Util function to open modal when Add Channel is clicked
    const [openModal, setOpenModal] = useState(false)

    const toggleModal = () => {
        setOpenModal(!openModal)
    }
  
    return (
        <div className="h-full p-4 border-r border-gray-500 flex flex-col items-start">
            <p>Avion School</p>
            <Disclosure>
                <Disclosure.Button className="py-2">
                    Channels
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                    <div>
                        Map all current channels here
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

          
        </div>
    )
}

export default Sidebar
