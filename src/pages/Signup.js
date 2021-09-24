import Form from '../parts/Form'
import { Slacklogo } from '../components/Slacklogo'
import Textfield from '../components/Textfield'
import Button from '../components/Button'
import { useState, useEffect, useContext } from 'react'
import { validateConfirmPassword, validateEmail, validatePassword} from '../utils/Utils'
import {postUserRegistration} from '../utils/Utils'
import { AuthContext } from '../contexts/AuthContext'


const Signup = ({loginStat}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailValidationPrompt, setEmailValidationPrompt] = useState(null)
    const [passwordValidationPrompt, setPasswordValidationPrompt] = useState(null)
    const [confirmPasswordValidationPrompt, setConfirmPasswordValidationPrompt] = useState(null)
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
 
    useEffect(() => {
        let emailResult = validateEmail(email)
        if (emailResult.is_valid) {
            setEmailValidationPrompt(null);
        } else {
            setEmailValidationPrompt(emailResult.message);
        }
    }, [email]) 

    useEffect(() => {
        let passwordResult = validatePassword(password)
        if (passwordResult.is_valid) {
            setPasswordValidationPrompt(null);
        } else {
            setPasswordValidationPrompt(passwordResult.message)
        }
    }, [password]) 

    useEffect(() => {
        let confirmPasswordResult = validateConfirmPassword(password, confirmPassword)
        if (confirmPasswordResult.is_valid) {
            setConfirmPasswordValidationPrompt(null) 
        }else {
            setConfirmPasswordValidationPrompt(confirmPasswordResult.message)
        }
    }, [confirmPassword]) 



    const handleSignUpClick = () => {
        if(emailValidationPrompt === null && passwordValidationPrompt === null && confirmPasswordValidationPrompt === null){
            postUserRegistration(email, password, confirmPassword, setAuth, setUser)
        }
    }

    const handleValueChange = (e, inputType) => {
        if(inputType === 'email') {
            setEmail(e.target.value)
        }else if(inputType === 'password') {
            setPassword(e.target.value)
        }else if(inputType === 'confirmPassword') {
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
                        <Textfield label='Email' value={email} onChange={(e) => {handleValueChange(e,'email')} } id='email' type='text' placeholder='Enter your email'/>
                        {emailValidationPrompt && <span className='text-red-400'>{emailValidationPrompt}</span>}
                        <Textfield label='Password' value={password} onChange={(e) => {handleValueChange(e,'password')}} id='password' type='password' placeholder='Enter a password'/>
                        {passwordValidationPrompt && <span className='text-red-400'>{passwordValidationPrompt}</span>}
                        <Textfield label='Confirm Password' value={confirmPassword} onChange={(e) => {handleValueChange(e,'confirmPassword')}} id='confirm_pw' type='password' placeholder='Confirm your password'/>
                        {confirmPasswordValidationPrompt && <span className='text-red-400'>{confirmPasswordValidationPrompt}</span>}
                        <Button onClick={handleSignUpClick}>Click me</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Signup
