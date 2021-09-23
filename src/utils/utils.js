import axios from 'axios'

export const test_util = () => {
    return (
        <div>
            
        </div>
    )
}

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
                message: 'Invalid email format'
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
    const minChar = /^.*(?=.{8,})(?=.*[a-zA-Z]).*$/g

    if(password !== null) {
        if(password.match(minChar)) {
            return {
                is_valid: true
            }
        } else {
            return {
                is_valid: false,
                message: 'password should not be less than 8 characters'
            }
        }
    }else {
        return {
            is_valid: false,
            message: 'password cannot be empty'
        }
    }

}

export const postUserSession = (email, password, confirmedPassword) => {
    const axios = require('axios')

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

export const createUserSession = (email, password) => {
    const axios = require('axios')
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
    const axios = require('axios')

    var config = {
        method: 'get',
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