import { useState, useEffect, useContext } from 'react'
import {createUserSession} from '../utils/Utils'
import Form from '../parts/Form'
import { useHistory } from 'react-router'
import { Slacklogo } from '../components/Slacklogo'
import Textfield from '../components/Textfield'
import Button from '../components/Button'
import { validateEmail, validatePassword} from '../utils/Utils'
import { Transition } from '@headlessui/react'
import Toast from '../parts/Toast'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [emailValidationPrompt, setEmailValidationPrompt] = useState(undefined)
    const [passwordValidationPrompt, setPasswordValidationPrompt] = useState(undefined)
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const [isToastShowing, setIsToastShowing] = useState(false)
    const [toastStat, setToastStat] = useState({
        toastType: '',
        toastMst: ''
    });

    //Instantiated an array of objects with state as the validationPrompt state and setter for the corresponding setState
    //This is so we have a checklist to loop through
    const validators = [{
        state: emailValidationPrompt,
        setter: setEmail
    },
    {   state: passwordValidationPrompt,
        setter: setPassword
    }
    ]

    const history = useHistory();

    useEffect(() => {
        let emailResult = validateEmail(email)
        const ignoredError = 'Invalid email address'
        if (emailResult?.is_valid || emailResult?.message === ignoredError) {
            setEmailValidationPrompt(null);
        } else if (emailResult?.message !== ignoredError) {
            setEmailValidationPrompt(emailResult?.message);
        }
    }, [email]) 

    useEffect(() => {
        let passwordResult = validatePassword(password)
        const ignoredError = 'password should not be less than 8 characters'
        if (passwordResult?.is_valid || passwordResult?.message === ignoredError) {
            setPasswordValidationPrompt(null);
        } else if (passwordResult?.message !== ignoredError) {
            setPasswordValidationPrompt(passwordResult?.message)
        }
    }, [password]) 

    const handleValueChange = (e, inputType) => {
        if(inputType === 'email') {
            setEmail(e.target.value)
        }else if(inputType === 'password') {
            setPassword(e.target.value)
        } 
    }
    const handleSignUpClick = (validators) => {
        validators.forEach((validationPrompt) => {
            if (validationPrompt.state === undefined) {
                validationPrompt.setter('')
            }
        })
        if(emailValidationPrompt === null && passwordValidationPrompt === null){
            createUserSession(email, password, setAuth, setUser, history, toggleToast, updateToastStat)
        }
    }

    /*----TOAST HANDLER FUNCTIONS----*/
    const toggleToast = (bool) => {
        setIsToastShowing(bool);
    }
    
    const updateToastStat = (type, msg) => {
        setToastStat({
            toastType: type,
            toastMsg: msg
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsToastShowing(false);
        },3000)
        return () => clearTimeout(timer);
    }, [isToastShowing]) 

    return (
        <div className='pt-8 h-full'>
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
                        <Button onClick={()=>handleSignUpClick(validators)}>Sign In</Button>
                    </div>
                </Form>
            </div>
            <Transition
                show={isToastShowing}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Toast type={toastStat.toastType} onClick={() => {toggleToast(false)}}>{toastStat.toastMsg}</Toast>
            </Transition>        
        </div>
    )
}

export default Login
