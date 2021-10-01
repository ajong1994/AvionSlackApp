import { useState, useRef, useEffect, useContext } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { SessionContext } from '../contexts/SessionContext'
import RecipientResults from "./RecipientResults";
import useComponentVisible from "../utils/Utils";
import { postMsg, getAllMsgs } from "../utils/Utils";

const ChatInterface = ({activeUser, msgStat}) => {
    const {userList, channelList} = useContext(SessionContext);
    //Change msgRecipient from useState to useRef
    const [msgRecipient, setMsgRecipient] = useState('');
    const [recipientMetadata, setRecipientMetadata] = useState({id:'', type:''});

    const msgRef = useRef();
    //Create local state for mapped search results of users
    const [recipientList, setRecipientList] = useState(null);
    //Create local state for mapped search results
    const [resultChannelList, setResultChannelList] = useState(null);
    //use custom hook to toggle display of search recommendations and to close modal on outside click
    const { ref: recipientRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const [msgList, setMsgList] = useState([])

    //Every time the input value of the search changes, as long as it's not empty, filter through the list of total customers and check if the account exists
    //If input is blank, then display total list of customers
    useEffect(() => {
        if (msgRecipient !== '') {
            const regex = new RegExp(`${msgRecipient}`, 'i')
            setRecipientList(userList?.filter(user => (regex.test(user.email) || regex.test(user.id))));
            setResultChannelList(channelList?.filter(channel => (regex.test(channel.name))));
        } else {
            setRecipientList([])
            setResultChannelList([])
            setIsComponentVisible(false)
        }
    },[msgRecipient])

    useEffect(() => {
        if (activeUser) {
            const id = recipientMetadata.id;
            const type = recipientMetadata.type;
            getAllMsgs(activeUser, id, type)
                .then(msgs => setMsgList(msgs))
                .catch(e => console.error(e))
        }
    },[recipientMetadata])

    const handleOnChange = (e) => {
        setMsgRecipient(e.target.value)
        setIsComponentVisible((e.target.value !== '' ? true: false))
    }

    const handleRecipientSelect = ({identifier, id, type}) => {
        setMsgRecipient(identifier)
        setRecipientMetadata({id, type})
        setIsComponentVisible(false)
    }

    const handleMsgSubmit = () => {
        const id = recipientMetadata.id;
        const type = recipientMetadata.type;
        const msgBody = msgRef.current.value
        postMsg(activeUser, id, msgBody, type)
            .then(msgs => {
                setMsgList(msgs);
                msgRef.current.value = ''
            })
            .catch(e => console.error(e))
    }
    
    //Later on, add an onKeyPress for enter key on the input to setMsgRecipient and Uid state

    return (
        <div className="col-start-2 row-start-2 flex flex-col">
            {msgStat &&
            <div className="flex text-gray-300 items-center p-4 border-b border-gray-600 relative">
                <p className="pr-4">To:</p>
                <input type="text" className="bg-transparent w-full border-0 focus:ring-0 focus:outline-none" 
                placeholder="#a-channel, @uid, or somebody@example.com" value={msgRecipient} onChange={handleOnChange}/>
                <div ref={recipientRef} className="recipient-results absolute z-10">
                    { isComponentVisible && <RecipientResults onClick={handleRecipientSelect} resultChannelList={resultChannelList} recipientList={recipientList}/>}
                </div>
            </div>}
            <div className='py-4 flex-grow text-gray-200'>
                {!!msgList?.length && msgList.map((msg, i, arr) => (
                <div key={msg.id} className="flex items-center gap-2 py-1 px-4 group hover:bg-gray-700">
                    {(i > 0 && (arr[i].sender.email !== arr[i-1].sender.email)) || i === 0 ? 
                    <div className="h-8 w-8 rounded bg-blue-400 flex items-center justify-center">
                        <p className="text-center capitalize">{msg.sender.uid.slice(0,1)}</p>
                    </div>
                    :
                    <div className="w-8 rounded">
                        <p className="text-xs opacity-0 group-hover:opacity-100">{new Date(msg.created_at).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12:true}).replace("AM","").replace("PM","")}</p>
                    </div>
                    }
                    <div className="flex flex-col">
                        {!!((i > 0 && (arr[i].sender.email !== arr[i-1].sender.email)) || i === 0) &&  
                        <div className="flex items-center">
                            <p className="text-sm font-bold">{msg.sender.email}</p>
                            <p className="text-xs pl-2">{new Date(msg.created_at).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: true})}</p>
                        </div>
                        }
                        <p className="text-sm">{msg.body}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="mt-auto flex gap-2 p-4">
                <textarea 
                className="custom-textarea"
                ref={msgRef}
                placeholder="Enter a message"
                ></textarea>
                <div className="bg-green-700 hover:bg-green-500 cursor-pointer flex items-center justify-center px-4 rounded"
                    onClick={handleMsgSubmit}>
                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 -mt-1 pb-1 text-white"/>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface


