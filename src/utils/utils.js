export const test_util = () => {
    return (
        <div>
            
        </div>
    )
}

export const validateEmail = (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    if (email !== null) {
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
