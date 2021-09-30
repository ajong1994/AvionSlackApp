import axios from 'axios'
import { useState, useEffect, useRef } from 'react';

/* UTILITY FUNCTIONS RELATED TO VALIDATION */
export const validateEmail = (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //Added email !== null as a condition to account for our new initial states for email, password and confirm password
    if (email !== '' && email !== null) {
        if(email.match(emailformat)) {
            return {
                is_valid: true
            } 
        } else {
            return {
                is_valid: false,
                message: 'Invalid email address'
            } 
        }
    } else if (email === '') {
        //Instead of using else, we use else if to restrict the returning of an object only when a user has typed into the input
        return {
            is_valid: false,
            message: 'Email cannot be blank'
        } 
    }
}

export const validatePassword = (password) => {
    //Added email !== null as a condition to account for our new initial states for email, password and confirm password
    if(password !== '' && password !== null) {
        if(password.length < 8) {
            return {
                is_valid: false,
                message: 'password should not be less than 8 characters'
            }
        }else {
            return {
                is_valid: true,    
            }
        }
    } else if (password === '') {
        //Instead of using else, we use else if to restrict the returning of an object only when a user has typed into the input
        return {
            is_valid: false,
            message: 'Password cannot be empty'
        }
    }
}

export const validateConfirmPassword = (password, confirmPassword) => {
    //Added email !== null as a condition to account for our new initial states for email, password and confirm password
    if(confirmPassword !== '' && confirmPassword !== null) {
        if(password === confirmPassword) {
            return {
                is_valid: true
            }
        }else {
            return {
                is_valid: false,
                message: 'passwords do not match'
            }
        }
    } else if (confirmPassword === '') {
        //Instead of using else, we use else if to restrict the returning of an object only when a user has typed into the input
        return {
            is_valid: false,
            message: 'Confirm password cannot be empty'
        }
    }
}
/* END OF UTILITY FUNCTIONS RELATED TO VALIDATION */


/* UTILITY FUNCTIONS RELATED TO USER */
export const postUserRegistration = (email, password, confirmedPassword, setAuth, setUser, toggleToast, updateToastStat) => {
    const data = {
        email: email,
        password: password,
        password_confirmation: confirmedPassword 
    };
    const config = {
    method: 'POST',
    url: 'https://slackapi.avionschool.com/api/v1/auth',
    headers: {},
    data : data
    };
    
    axios(config)
    .then((response) => {
    if (response.data.status === 'success'){
        //Update login Bool to true. This conditional will be used in pages for redirect/access validation
        setAuth(true);
        //Update activeUser state with an object containing necessary details from header of response
        setUser({
            'access-token': response.headers['access-token'],
            'client': response.headers.client,
            'expiry': response.headers.expiry,
            'uid': response.headers.uid
        });
        //Display success toast
        toggleToast(true);
        updateToastStat('success','Success! Account has been created.')
    }
    })
    .catch((error) => {
        if(error.response) {
            const errMsgs = error.response.data.errors.full_messages
            const formattedErrs = errMsgs.map(msg => msg.concat('.')).reduce((prev, current) => `${prev} ${current}`)
            //Display toast error with error message from response
            toggleToast(true);
            updateToastStat('error', formattedErrs)
            // updateToastMsg(`${error.response.data.errors.full_messages}.`)
        }
    });

};

export const createUserSession = (email, password, setAuth, setUser, toggleToast, updateToastStat) => {
    var data = {
        email: email,
        password: password, 
    };
    var config = {
    method: 'POST',
    url: 'https://slackapi.avionschool.com/api/v1/auth/sign_in',
    headers: {},
    data : data
    };
    
    axios(config)
    .then((response) => {
        //Update login Bool to true. This conditional will be used in pages for redirect/access validation
        setAuth(true);
        //Update activeUser state with an object containing necessary details from header of response
        setUser({
            'access-token': response.headers['access-token'],
            'client': response.headers.client,
            'expiry': response.headers.expiry,
            'uid': response.headers.uid
        });
    })
    .catch((error) => {
        if(error.response) {
            const errMsg = error.response.data.errors
            //Display toast error with error message from response
            toggleToast(true);
            updateToastStat('error', errMsg)
            // updateToastMsg(`${error.response.data.errors.full_messages}.`)
        }
    });
};

export const removeUserSession = (setAuth, setUser, history) => {
    setAuth(false);
    //setting new values (null), as to somehow delete it from the session storage
    setUser(null);
    //Redirect to Main page
    history.push('/signin')
}

export const getAllUsers = (activeUser, updateUserList) => {
    var config = {
        method: 'GET',
        url: 'https://slackapi.avionschool.com/api/v1/users',
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        }
    };

    axios(config)
    .then(function (response) {
        if(response.data) {
            updateUserList(response.data.data)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};
/* END OF UTILITY FUNCTIONS RELATED TO USER */


/* UTILITY FUNCTIONS RELATED TO CHANNELS */
export const postCreateChannel = (channelName, user_ids, activeUser, updateChannelList) => {
    var data = {
        name: channelName.current.value,
        user_ids: user_ids  //should this be an array instead? >> yes, the passed argument should be an array
      };
    var config = {
        method: 'POST',
        url: 'https://slackapi.avionschool.com/api/v1/channels',
        headers: {
            
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        },
        data : data
    };  
    axios(config)
    .then(function (response) {
      //Display success toast for creation

      //Reload channel list from API to ensure it was added
      getAllSubscribedChannels(activeUser, updateChannelList)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllSubscribedChannels = (activeUser, updateChannelList) => {
    var config = {
        method: 'GET',
        url: 'https://slackapi.avionschool.com/api/v1/channels',
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        }
      };
      
    axios(config)
    .then(function (response) {
        if(response.data) {
        //Returns an array of object; each one representing a channel with channel id, name, create date and owner id
        updateChannelList(response.data)
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

//Honestly don't know the use of this other than displaying a modal containing active members of channel when icon is clicked inside channel
export const getChannelData = (activeUser, channelId, updateChannelData) => {
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/channels/${channelId}`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        }
    };
      
    axios(config)
    .then(function (response) {
        if(response.data) {
        //Returns an object with channel ID, owner ID, channel name, create and update dates and an array called channel members
        //which contains user info as objects
        updateChannelData(response.data.data)
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

export const postInviteToChannel = (activeUser, channelId, memberId, updateChannelData) => {
    var data = {
        id: channelId,
        member_id: memberId
    };
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/channels/${channelId}`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        },
        data: data
    };
    
    axios(config)
    .then(function (response) {
        if(response.data) {
        //Returns an object with channel ID, owner ID, channel name, create and update dates and an array called channel members
        //which contains user info as objects
        updateChannelData(response.data)
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

/* END UTILITY FUNCTIONS RELATED TO CHANNELS */


/* UTILITY FUNCTIONS RELATED TO MESSAGES */
export const getAllChannelMsgs = (activeUser, channelId) => {
    const receiver_id = channelId;
    const receiver_class = 'Channel';
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        }
    };
    axios(config)
    .then(function (response) {
        if(response.data) {
            console.log(response.data)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const postMsgToChannel = (activeUser, channelId, msg) => {
    var data = {
        receiver_id: channelId,
        receiver_class: 'Channel',
        body: msg
    };
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/messages`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        },
        data: data
    };
    axios(config)
    .then(function (response) {
        if(response.data) {
            //On success message post, re-fetch the channel messages to update state [TO-DO]
            getAllChannelMsgs(activeUser, channelId)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const getAllUserMsgs = (activeUser, userId) => {
    const receiver_id = userId;
    const receiver_class = 'User';
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        }
    };
    axios(config)
    .then(function (response) {
        if(response.data) {
            console.log(response.data)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const postMsgToUser = (activeUser, userId, msg) => {
    var data = {
        receiver_id: userId,
        receiver_class: 'User',
        body: msg
    };
    var config = {
        method: 'GET',
        url: `https://slackapi.avionschool.com/api/v1/messages`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        },
        data: data
    };
    axios(config)
    .then(function (response) {
        if(response.data) {
            //On success message post, re-fetch the user messages to update state [TO-DO]
            getAllUserMsgs(activeUser, userId)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};
/* END OF UTILITY FUNCTIONS RELATED TO MESSAGES */

//Outside click custom hook from https://codesandbox.io/s/989y0758np
export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        //Checks if the node which triggered the click contains the child element initially declared in useRef instance
        //Only the wrapper component would contain the child element, so...
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}