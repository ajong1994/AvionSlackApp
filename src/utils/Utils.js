import axios from 'axios'


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
export const postUserRegistration = (email, password, confirmedPassword, setAuth, setUser, history, toggleToast, updateToastStat) => {
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
        // //Redirect to Main page
        // history.push("/")
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

export const createUserSession = (email, password, setAuth, setUser, history, toggleToast, updateToastStat) => {
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
    //Redirect to Main page
    history.push("/")
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
            updateUserList(response.data)
          }
      })
      .catch(function (error) {
        console.log(error);
      });
};
/* END OF UTILITY FUNCTIONS RELATED TO USER */


/* UTILITY FUNCTIONS RELATED TO CHANNELS */
export const postCreateChannel = (channelName, user_ids, activeUser) => {
    var data = {
        name: channelName,
        user_ids: user_ids  //should this be an array instead? 
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
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllSubscribedChannel
/* END UTILITY FUNCTIONS RELATED TO CHANNELS */