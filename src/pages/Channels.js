import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router'
import Button from '../components/Button'
import Textfield from '../components/Textfield';
import { postCreateChannel } from '../utils/Utils';


const Channels = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const history = useHistory();
    const [channelName, setChannelName] = useState(null)
    const [userIds, setUserIds] = useState([])

    const handleCreateChannel = () => {
        if(channelName !== '') {
            postCreateChannel(channelName, userIds);
        }
    }

    const handleValueChange = (e, channelName) => {
        setChannelName(e.target.value) 
    }
   
    return (
        <div>
            <h1>Create a channel</h1>
            <Textfield label='channelName' onChange={(e) => {handleValueChange(e, channelName)} } value={channelName} label='channelName' id='channelName'type='text' placeholder='channel name'/>
            <Button onClick={()=>handleCreateChannel()} >create channel</Button>
        </div>
    )
}

export default Channels
