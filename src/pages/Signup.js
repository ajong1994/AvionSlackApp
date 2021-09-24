import Form from '../parts/Form'
import { Slacklogo } from '../components/Slacklogo'
import Textfield from '../components/Textfield'
import Button from '../components/Button'
import { useState, useEffect, useContext} from 'react'
import { validateConfirmPassword, validateEmail, validatePassword} from '../utils/Utils'
import {postUserRegistration} from '../utils/Utils'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'



const Signup = () => {
    //Initialize email, password and confirmPassword to null instead of empty string so that we can add a validation conditional
    // to only display error messages for empty string states (which happens when they start typing and not on load)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [emailValidationPrompt, setEmailValidationPrompt] = useState(undefined)
    const [passwordValidationPrompt, setPasswordValidationPrompt] = useState(undefined)
    const [confirmPasswordValidationPrompt, setConfirmPasswordValidationPrompt] = useState(undefined)
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)

    //Instantiated an array of objects with state as the validationPrompt state and setter for the corresponding setState
    //This is so we have an 
    const validators = [{
        state: emailValidationPrompt,
        setter: setEmail
    },
    {   state: passwordValidationPrompt,
        setter: setPassword
    },
    {   state: confirmPasswordValidationPrompt,
        setter: setConfirmPassword
    }
    ]

    const history = useHistory();
 
    useEffect(() => {
        let emailResult = validateEmail(email)
        // On load, emailResult will return UNDEFINED. As long as user has not started typing, everything here will be undefined. 
        if (emailResult?.is_valid) {
            setEmailValidationPrompt(null);
        } else {
            //Because validateEmail only returns an object when email is not null (e.g. when user has begun typing), 
            //No error message will be displayed until then
            setEmailValidationPrompt(emailResult?.message);
        }
    }, [email]) 

    useEffect(() => {
        let passwordResult = validatePassword(password)
        // On load, passwordResult will return UNDEFINED. As long as user has not started typing, everything here will be undefined.
        if (passwordResult?.is_valid) {
            setPasswordValidationPrompt(null);
        } else {
            setPasswordValidationPrompt(passwordResult?.message)
        }
    }, [password]) 

    useEffect(() => {
        let confirmPasswordResult = validateConfirmPassword(password, confirmPassword)
        // On load, confirmPasswordResult will return UNDEFINED. As long as user has not started typing, everything here will be undefined.
        if (confirmPasswordResult?.is_valid) {
            setConfirmPasswordValidationPrompt(null) 
        } else {
            setConfirmPasswordValidationPrompt(confirmPasswordResult?.message)
        }
    }, [confirmPassword]) 


    const handleSignUpClick = (validators) => {
        //Loop through validators' array objects and check if the validationPrompt is undefined--this means that the user has not touched the input
        //if true, then setState the corresponding field to an empty string to make the error appear
        validators.forEach((validationPrompt) => {
            if (validationPrompt.state === undefined) {
                validationPrompt.setter('')
            }
        })
        if (emailValidationPrompt === null && passwordValidationPrompt === null && confirmPasswordValidationPrompt === null) {
            // alert('button works')
            postUserRegistration(email, password, confirmPassword, setAuth, setUser, history)
        }

    }

    const handleValueChange = (e, inputType) => {
        if(inputType === 'email') {
            setEmail(e.target.value)
        } else if(inputType === 'password') {
            setPassword(e.target.value)
        } else if(inputType === 'confirmPassword') {
            setConfirmPassword(e.target.value)
        }    
    }

    return (
        <div className='pt-8'>
            <div className='flex justify-center pb-8'>
                <Slacklogo width={120}/>
            </div>
            <h2 className='text-center'>Join Avion School on Slack</h2>
            <p className='text-center'>Start by signing up.</p>
            <div className='mx-auto max-w-md mt-20'>
                <Form>
                    <div className='flex flex-col gap-4'>
                        <Textfield label='Email' value={email === null ? '' : email} onChange={(e) => {handleValueChange(e,'email')} } id='email' type='text' placeholder='Enter your email'/>
                        {emailValidationPrompt && <span className='text-red-400'>{emailValidationPrompt}</span>}
                        <Textfield label='Password' value={password === null ? '' : password} onChange={(e) => {handleValueChange(e,'password')}} id='password' type='password' placeholder='Enter a password'/>
                        {passwordValidationPrompt && <span className='text-red-400'>{passwordValidationPrompt}</span>}
                        <Textfield label='Confirm Password' value={confirmPassword === null ? '' : confirmPassword} onChange={(e) => {handleValueChange(e,'confirmPassword')}} id='confirm_pw' type='password' placeholder='Confirm your password'/>
                        {confirmPasswordValidationPrompt && <span className='text-red-400'>{confirmPasswordValidationPrompt}</span>}
                        <Button onClick={() => handleSignUpClick(validators)}>Click me</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Signup
