import { useContext, useState, useEffect } from "react";
import { assignImage, assignBg } from "../utils/Utils";
import { SessionContext } from '../contexts/SessionContext';
import ChannelInfoModal from './ChannelnfoModal';
import Toast from "./Toast";
import { Transition } from '@headlessui/react'

const MainHeader = () => {
    const {msgRecipient, recipientMetadata, moreChannelData,} = useContext(SessionContext);
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
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

    return (
        <div className="flex justify-between border-b border-gray-600">
            <div className="flex items-center py-2 px-4">
                {!!(recipientMetadata?.id !== '') && 
                    <div className="flex justify-center items-center h-8 w-8 mr-2">
                        <span className={assignBg(recipientMetadata?.id)}>
                            <img src={assignImage(recipientMetadata?.id, recipientMetadata?.type)} className="h-8 w-8 items-center"/>
                            </span>
                    </div>
                }
                <h3 className="text-white">{recipientMetadata.id === '' ? 'New message' : msgRecipient}</h3>
            </div>
            <div className="text-gray-300 py-2 px-4 cursor-pointer" onClick={toggleModal}>
                <div className="rounded-lg border-b border-t border-r border-gray-300 flex items-center">
                    <div className="flex align-center -space-x-2 overflow-hidden">
                        {
                            moreChannelData.members && moreChannelData.members.slice(0, 3).map((user) => (
                                <div className="inline-block rounded ring-2 ring-gray-600">
                                    <div className="flex justify-center items-center h-8 w-8">
                                        <span className={assignBg(user?.id)} >
                                            <img src={assignImage(user?.id, "User")} classname="h-8 w-8 items-center"/>
                                        </span> 
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {moreChannelData?.members.length > 3 && 
                    <div className="h-8 w-8 pl-2 mr-4 flex items-center">
                        {moreChannelData.members.length}
                    </div>
                    }
                </div>
                
            </div>
            <ChannelInfoModal openModal={openModal} setOpenModal={setOpenModal} toggleToast={toggleToast} updateToastStat={updateToastStat}/>
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

export default MainHeader
