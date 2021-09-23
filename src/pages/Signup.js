import Form from '../parts/Form'
import { Slacklogo } from '../components/Slacklogo'
import Textfield from '../components/Textfield'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { validateEmail, validatePassword} from '../utils/utils'

const Signup = ({loginStat}) => {
    console.log(loginStat)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailValidationPrompt, setEmailValidationPrompt] = useState(null)
    const [passwordValidationPrompt, setPasswordValidationPrompt] = useState(null)
    const [confirmPasswordValidationPrompt, setConfirmPasswordValidationPrompt] = useState(null)

    // const handlePasswordChange = (password) => {
    //     setPassword(password)
    // }
    // const handleConfirmPassword = (confirmPassword) => {
    //     setConfirmPassword(confirmPassword)
    // }

    useEffect(() => {
        let emailResult = validateEmail(email)
        console.log('email')
        if (emailResult.is_valid) {
            setEmailValidationPrompt(null);
        } else {
            setEmailValidationPrompt(emailResult.message);
        }
    }, [email]) 

    useEffect(() => {
        let passwordResult = validatePassword(password)
        if (emailResult.is_valid) {
            setEmailValidationPrompt(null);
        } else {
            setPasswordValidationPrompt(passwordResult.message)
        }
    }, [password]) 

    useEffect(() => {
        if ( password !== confirmPassword) {
            isValid = false;  
        }
    }, [confirmPassword]) 



    const handleSignUpClick = (e) => {
        if(emailValidationPrompt === null && passwordValidationPrompt === null){
            alert('success')
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
                        {emailValidationPrompt && <label>{emailValidationPrompt}</label>}
                        <Textfield label='Password' value={password} onChange={(e) => {handleValueChange(e,'password')}} id='password' type='password' placeholder='Enter a password'/>
                        {passwordValidationPrompt && <label>{passwordValidationPrompt}</label>}
                        <Textfield label='Confirm Password' value={confirmPassword}onChange={(e) => {handleValueChange(e,'confirmPassword')}} id='confirm_pw' type='password' placeholder='Confirm your password'/>
                        <Button onClick={handleSignUpClick}>Click me</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Signup