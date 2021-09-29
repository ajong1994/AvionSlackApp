import { useState, useRef, useEffect, useContext } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { SessionContext } from '../contexts/SessionContext'
import RecipientResults from "./RecipientResults";
import useComponentVisible from "../utils/Utils";

const ChatInterface = ({msgStat}) => {
    const {userList, updateUserList, channelList, updateChannelList, channelData, updateChannelData} = useContext(SessionContext);
    //Change msgRecipient from useState to useRef
    const [msgRecipient, setMsgRecipient] = useState('');
    //create another state that gets saved only when user selects a valid recipient from list
    //input should get value from that state instead of msgRecipient


    const msgRef = useRef();
    //Create local state for mapped search results
    const [recipientList, setRecipientList] = useState(null);
    //Create state to toggle display of search recommendations
    const { ref: recipientRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    //Every time the input value of the search changes, as long as it's not empty, filter through the list of total customers and check if the account exists
    //If input is blank, then display total list of customers
    useEffect(() => {
        if (msgRecipient !== '') {
            const regex = new RegExp(`${msgRecipient}`, 'i')
            setRecipientList(userList?.filter(user => regex.test(user.email)));
            setIsComponentVisible(true)
        } else {
            setRecipientList([])
            setIsComponentVisible(false)
        }
    },[msgRecipient])

    const handleOnChange = (e) => {
        setMsgRecipient(e.target.value)
    }

    return (
        <div className="col-start-2 row-start-2 flex flex-col">
            {msgStat &&
            <div className="flex text-gray-300 items-center p-4 border-b border-gray-600 relative">
                <p className="pr-4">To:</p>
                <input type="text" className="bg-transparent w-full border-0 focus:ring-0 focus:outline-none" 
                placeholder="#a-channel, @uid, or somebody@example.com" value={msgRecipient} onChange={handleOnChange}/>
                <div ref={recipientRef} className="recipient-results absolute z-10">
                    { isComponentVisible && <RecipientResults recipientList={recipientList}/>}
                </div>
            </div>}
            <div className='p-4 flex-grow text-gray-200'>
                'Messages here'
            </div>
            <div className="mt-auto flex gap-2 p-4">
                <textarea 
                className="custom-textarea"
                ref={msgRef}
                placeholder="Enter a message"
                ></textarea>
                <div className="bg-green-700 hover:bg-green-500 cursor-pointer flex items-center justify-center px-4 rounded">
                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 -mt-1 pb-1 text-white"/>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface


