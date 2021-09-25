import {CheckIcon} from '@heroicons/react/solid';
import {XIcon} from '@heroicons/react/solid';
import {ExclamationIcon} from '@heroicons/react/solid'


const Toast = ({type, onClick, children}) => {

    const templateClasses = {
        body: 'border-l-4 flex items-center py-2 px-3 shadow-md mb-2 justify-between',
        icon: 'rounded-full bg-white mr-3 p-1'
    }
    const successClasses = {
        body: 'bg-green-500 border-green-700',
        icon: 'text-green-500'
    }
    const errorClasses = {
        body: 'bg-red-400 border-red-600',
        icon: 'text-red-400'
    }
    return (
    <>
        <div className='max-w-xl w-full centered-fixed z-10 bottom-10'>
            <div className={
                type === 'success'
                ? `${templateClasses.body} ${successClasses.body}`
                :`${templateClasses.body} ${errorClasses.body}`
                }>
                <div className={
                    type === 'success'
                    ? `${templateClasses.icon} ${successClasses.icon}`
                    :`${templateClasses.icon} ${errorClasses.icon}`
                    }>
                    { type === 'success'
                    ? <CheckIcon className='h-5 w-5'/>
                    : <ExclamationIcon className='h-5 w-5'/>
                    }
                </div>
                <div className='text-white flex-grow mr-auto'>
                    {children}
                </div>
                <div>
                    <XIcon className='h-5 w-5 text-white cursor-pointer hover:close-rotate' onClick={onClick}/>
                </div>
            </div>
        </div>
    </>

    )
}

export default Toast