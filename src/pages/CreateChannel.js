import { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import Button from '../components/Button'
import Textfield from '../components/Textfield';
// import { postCreateChannel } from '../utils/Utils';


const CreateChannel = () => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const history = useHistory();
    const [channelName, setChannelName] = useState(null)

    const handleCreateChannel = () => {
        if(channelName !== '') {
            // postCreateChannel(channelName, user_ids);
        }
    }

    const handleValueChange = (e, channelName) => {
        setChannelName(e.target.value) 
    }
   
    if (!isAuthenticated || !activeUser) {
        return <Redirect to='/signin' />
    }
    console.log(channelName)
    return (
        <div>
            <h1>Create a channel</h1>
            <Textfield label='channelName' onChange={(e) => {handleValueChange(e, channelName)} } value={channelName} label='channelName' id='channelName'type='text' placeholder='channel name'/>
            <Button onClick={()=>handleCreateChannel()} >create channel</Button>
        </div>
    )
}

export default CreateChannel
