import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import Toast from '../parts/Toast'

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
export const postCreateChannel = (channelName, user_ids, activeUser, updateChannelList, toggleToast, updateToastStat) => {
    var data = {
        name: channelName,
        user_ids: user_ids
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
       // toggleToast(true);
        //updateToastStat('success','Success! Channel has been created.')
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
        updateChannelList(response.data.data)
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
        method: 'POST',
        url: `https://slackapi.avionschool.com/api/v1/channel/add_member`,
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
        console.log(response.data.data)
        updateChannelData(response.data.data)
        }
    })
    .catch(function (error) {
    console.log(error);
    });
};

/* END UTILITY FUNCTIONS RELATED TO CHANNELS */


/* UTILITY FUNCTIONS RELATED TO MESSAGES */
export const getAllMsgs = (activeUser, receiverId, type) => {
    const receiver_id = receiverId;
    const receiver_class = type;
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
    var result = [];
    return axios(config)
    .then(function (response) {
        if(response.data) {
            return response.data.data
        }
    })
    .catch(function (error) {
        console.log(error);
        return result
    });
    
};

export const postMsg = (activeUser, receiverId, msg, type) => {
    var data = {
        receiver_id: receiverId,
        receiver_class: type,
        body: msg
    };
    var config = {
        method: 'POST',
        url: `https://slackapi.avionschool.com/api/v1/messages`,
        headers: { 
            'access-token': activeUser['access-token'],
            'client': activeUser.client, 
            'expiry': activeUser.expiry,
            'uid': activeUser.uid
        },
        data: data
    };
    return axios(config)
    .then(function (response) {
        if(response.data) {
            //On success message post, re-fetch the channel messages to update state [TO-DO]
            return getAllMsgs(activeUser, receiverId, type)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
};

// export const getAllMsgsFromAll = (userList, activeUser, setMsgList) => {
//     const tempArr = []
//     userList.map((user) => {
//         getAllMsgs(activeUser, user.id, 'User')
//             .then((data) => {
//                 if (data.length) {
//                     tempArr.push(user.email) 
//                 }
//             })
//     })
//     setMsgList(tempArr)
// }

/* END OF UTILITY FUNCTIONS RELATED TO MESSAGES */

/* CUSTOM HOOK FOR OUTSIDE CLICK DETECTION FROM https://codesandbox.io/s/989y0758np */
export function useComponentVisible(initialIsVisible) {
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
/* END OF CUSTOM HOOK FOR OUTSIDE CLICK DETECTION */


/* UTIL FUNCTION FOR IMAGE ASSIGNMENT */
export const assignImage = (id, type) => {
    if (type === "User") {
        const n = String(id% 100).padStart(2, '0')
        return `/icons/punk-01${n}.png`
    } else {
        const n = id % 25
        return `/icons/punk${n}@20x.png`
    }
}
/* END OF UTIL FUNCTION FOR IMAGE ASSIGNMENT */

/* UTIL FUNCTION FOR IMAGE ASSIGNMENT */
export const assignBg = (id) => {
    switch(id % 4) {
        case 1 :
            return "bg-red-300 rounded"
        case 2: 
            return "bg-indigo-200 rounded"
        case 3:
            return "bg-green-200 rounded"
        default:
            return "bg-yellow-200 rounded"
    }
}
/* END OF UTIL FUNCTION FOR IMAGE ASSIGNMENT */