import axios from 'axios'

export const validateEmail = (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email !== '') {
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
    } else {
        return {
            is_valid: false,
            message: 'Email cannot be blank'
        } 
    }
}

export const validatePassword = (password) => {
    if(password !== '') {
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
    }else {
        return {
            is_valid: false,
            message: 'Password cannot be empty'
        }
    }
}

export const validateConfirmPassword = (password, confirmPassword) => {

    if(confirmPassword !== '') {
        console.log(`password is: ${password}`)
        console.log(`confirmpassword is: ${confirmPassword}`)
        
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
    }else {
        return {
            is_valid:false,
            message: 'Confirm password'
        }
    }
 
}

export const postUserRegistration = (email, password, confirmedPassword, setAuth, setUser) => {

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
    console.log(response.data);
    console.log(response.headers);
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
    }
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response.data.errors.full_messages);
            //Display toast error with error message from response
        }
    });

};

export const createUserSession = (email, password) => {
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
    console.log(response.data);
    //Display success toast
    //Set Login State using credentials
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response.data.errors.full_messages);
            //Display toast error with error message from response
        }
    });

};

export const getAllUsers = () => {

    var config = {
        method: 'GET',
        url: '206.189.91.54/api/v1/users',
        headers: { 
          'access-token': 'TTLtXEQUjd1i0BlR6q8zVg', 
          'client': 'TdmPB-prCbBtjStYuOeuCg', 
          'expiry': '1631322970', 
          'uid': 'akosipc@gmail.com'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
};