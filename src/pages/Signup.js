import Form from '../parts/Form'
import { Slacklogo } from '../components/Slacklogo'
import Textfield from '../components/Textfield'
import Button from '../components/Button'

const Signup = ({loginStat}) => {
    console.log(loginStat)
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
                        <Textfield label='Email' id='email' type='email' placeholder='Enter your email'/>
                        <Textfield label='Password' id='password' type='password' placeholder='Enter a password'/>
                        <Textfield label='Confirm Password' id='confirm_pw' type='password' placeholder='Confirm your password'/>
                        <Button>Click me</Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Signup
