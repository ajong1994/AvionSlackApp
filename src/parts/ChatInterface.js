import { useState, useRef, useEffect, useContext } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { SessionContext } from '../contexts/SessionContext';
import { AuthContext } from '../contexts/AuthContext';
import RecipientResults from "./RecipientResults";
import { postMsg, getAllMsgs, assignImage, assignBg,useComponentVisible, getChannelData} from "../utils/Utils";

const ChatInterface = ({msgStat, updateMsgStat}) => {
    const {userList, channelList, channelData, updateChannelData, msgRecipient, updateMsgRecipient, recipientMetadata, updateRecipientMetadata, msgList, updateMsgList} = useContext(SessionContext);
    const {activeUser} = useContext(AuthContext)
    const msgRef = useRef();
    //Create local state for mapped search results of users
    const [recipientList, setRecipientList] = useState(null);
    //Create local state for mapped search results
    const [resultChannelList, setResultChannelList] = useState(null);
    //use custom hook to toggle display of search recommendations and to close modal on outside click
    const { ref: recipientRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

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
            updateRecipientMetadata('','')
            updateMsgList([])
        }
    },[msgRecipient])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (activeUser) {
            getAllMsgs(activeUser, recipientMetadata?.id, recipientMetadata?.type)
                .then(msgs => updateMsgList(msgs))
                .catch(e => console.error(e))
            }
        }, 1000)
        return ()=>{clearTimeout(timer)}
    },[recipientMetadata])

    useEffect(() => {
        if (msgStat === true) {
            updateMsgRecipient('')
            updateRecipientMetadata('','')
            updateMsgList([])
        } 
    },[msgStat])

    const handleOnChange = (e) => {
        updateMsgRecipient(e.target.value)
        setIsComponentVisible((e.target.value !== '' ? true: false))
    }

    const handleRecipientSelect = ({identifier, id, type}) => {
        updateMsgList([])
        updateMsgRecipient(identifier)
        updateRecipientMetadata(id, type)
        setIsComponentVisible(false)
        if (type === "Channel") {
            getChannelData(activeUser, id, updateChannelData)
        }
    }

    const handleMsgSubmit = (e, type) => {
        if (msgRecipient !== '') {
            if (type === 'click' || (type === "keypress" && e.key === "Enter" && !e.shiftKey)) {
                e.preventDefault();
                postMsg(activeUser, recipientMetadata.id, msgRef.current.value, recipientMetadata.type)
                    .then(msgs => {
                        updateMsgList(msgs);
                        msgRef.current.value = ''
                        updateMsgStat(false);
                    })
                    .catch(e => console.error(e))
            }
        }
    }
    
    return (
        <div className="col-start-2 col-end-4 row-start-2 flex flex-col overflow-hidden">
            {msgStat &&
                <div className="flex text-gray-300 items-center p-4 border-b border-gray-600 relative">
                    <p className="pr-4">To:</p>
                    {!!recipientMetadata.id && 
                        <span className="flex justify-center items-center mr-1">
                            <span className={assignBg(recipientMetadata?.id)}>
                                <img src={assignImage(recipientMetadata?.id, recipientMetadata?.type)} className="h-5 w-5 items-center"/>
                            </span>
                        </span>
                    }
                    <input type="text" className="bg-transparent w-full border-0 focus:ring-0 focus:outline-none" 
                    placeholder="#a-channel, @uid, or somebody@example.com" value={msgRecipient} onChange={handleOnChange}/>
                    <div ref={recipientRef} className="recipient-results absolute z-10">
                        { isComponentVisible && <RecipientResults onClick={handleRecipientSelect} resultChannelList={resultChannelList} recipientList={recipientList}/>}
                    </div>
                </div>
            }
            <div className='py-4 flex-grow text-gray-200 overflow-auto flex flex-col'>
                <div className="mt-auto">
                    {!!(recipientMetadata.id !== '') && 
                    <div className="flex flex-col p-4 mb-6 gap-2">
                        <div className="flex gap-2 items-center">
                            <span className="flex justify-center items-center mr-1">
                                <span className={assignBg(recipientMetadata?.id)}>
                                    <img src={assignImage(recipientMetadata?.id, recipientMetadata?.type)} className="h-8 w-8 items-center"/>
                                </span>
                            </span>
                            <div className={recipientMetadata?.type === "Channel" ? 'font-bold text-lg': ''}>
                                {msgRecipient}
                            </div>
                        </div>
                        <p>
                            { recipientMetadata?.type === "User"
                            ? `This is the very beginning of your direct message history with @${msgRecipient}. Only the two of you are in this conversation, and no one else can join it.`
                            : `User#${channelData?.owner_id} created this private channel on ${new Date(channelData?.created_at).toLocaleDateString([],{month:'long', day:'numeric'})}. This is the very beginning of the #${msgRecipient} channel.`}
                        </p>
                    </div>}
                    {!!(msgList?.length) && msgList.map((msg, i, arr) => (
                    <div key={msg.id} className="flex items-center gap-2 py-1 px-4 group hover:bg-gray-700">
                        {(i > 0 && (arr[i].sender.email !== arr[i-1].sender.email)) || i === 0 ? 
                        <div className="flex justify-center items-center h-8 w-8">
                            <span className={assignBg(msg?.sender.id)}>
                                <img src={assignImage(msg?.sender.id, "User")} className="h-8 w-8 items-center"/>
                            </span>
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
                
            </div>
            <div className="mt-auto flex gap-2 p-4">
                <textarea className="custom-textarea" ref={msgRef} placeholder="Enter a message" onKeyPress={(e)=>handleMsgSubmit(e,'keypress')}/>
                <div className={msgRecipient === ''
                    ? "bg-green-900 flex items-center justify-center px-4 rounded"
                    :"bg-green-700 hover:bg-green-500 cursor-pointer flex items-center justify-center px-4 rounded"}
                    onClick={(e)=>handleMsgSubmit(e,'click')}>
                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 -mt-1 pb-1 text-white"/>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface


