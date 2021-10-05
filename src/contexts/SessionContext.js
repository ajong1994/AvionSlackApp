import {useState, createContext, useEffect} from 'react';

//We first create a context--similar to State, but mutable and can be accessed by any consumer/child by using useContext 
export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    
    //These are the states we're initializing to store component data related to user Login/Authentication status and their authentication credentials
    const [userList, setUserList] = useState(null);
    const updateUserList = (userlist) => {
        setUserList(userlist)
    }
    const [channelList, setChannelList] = useState(null);
    const updateChannelList = (channellist) => {
        setChannelList(channellist)
    }
    const [channelData, setChannelData] = useState(null);
    const updateChannelData = (channeldata) => {
        setChannelData(channeldata)
    }
    const [moreChannelData, setMoreChannelData] = useState({creator:'', members:''})
    useEffect(() => {
        if (channelData) {
            const temp_mems = channelData.channel_members.map( mem => mem.user_id)
            setMoreChannelData((prevState) => ({
                ...prevState,
                members: userList.filter(user => temp_mems.includes(user.id))
            }))
            setMoreChannelData((prevState) => ({
                ...prevState,
                creator: userList.filter(user => user.id === channelData.owner_id)
            }))
            
        }
    },[channelData])
    
    const [msgRecipient, setMsgRecipient] = useState('');
    const updateMsgRecipient = (recipient) => {
        setMsgRecipient(recipient)
    }
    const [recipientMetadata, setRecipientMetadata] = useState({id:'', type:''});
    const updateRecipientMetadata = (id, type) => {
        setRecipientMetadata({
            id: id,
            type: type
        })
    }
    const [msgList, setMsgList] = useState([])
    const updateMsgList = (messages) => {
        setMsgList(messages)
    }

    const props = {
        userList,
        updateUserList,
        channelList,
        updateChannelList,
        channelData,
        updateChannelData,
        msgRecipient,
        updateMsgRecipient,
        recipientMetadata,
        updateRecipientMetadata,
        msgList,
        updateMsgList,
        moreChannelData
    }

    return (
        //We add the Provider property from the created AuthContext object which will provide all children with necessary values/states without
        //passing them directly as props. In this case, we pass our user login states and updaters to the value prop of Provider,
        //so we can access these in children components using useContext
        <SessionContext.Provider value={props}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
