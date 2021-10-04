import { Disclosure } from '@headlessui/react';
import { useState, useContext, useEffect } from 'react';
import Button from '../components/Button'
import CreateChannel from './CreateChannel';
import {removeUserSession} from '../utils/Utils'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext';
import Textfield from '../components/Textfield'
import { ChevronRightIcon, PlusSmIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react'






const RightSidebar = () => {
  
  const { activeUser } = useContext(AuthContext)
  //const { userList } = useContext(SessionContext)

  const [inviteUser, setInviteUser] = useState(null)
  const handleInviteUserChange = (e) => {
    setInviteUser(e.target.value)
  }
 
 //filtering userList if email matches
  const [inviteUserList, setInviteUserList] = ([])
    //   useEffect(() => {
    //       if (inviteUser !== '') {
    //           const regex = new RegExp(`${inviteUser}`, 'i')
    //           setInviteUserList(userList.filter(user => regex.test(user.uid).slice(0, 3)))
    //       }else {
    //           setInviteUserList([])
    //       }
    //   },[inviteUser])

    return (
        <Disclosure className="relative ">
            {({open}) => (
                <>
                    <Disclosure.Button className=" text-gray-300 flex flex-row-reverse float mr-20 items-center col-start-3 col-end-5 row-start-1">
                        <div> badges' div</div>
                    </Disclosure.Button>
                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        className="w-25 row-start-2 flex justify-end"
                    >
                        <Disclosure.Panel className="row-start-2 text-gray-500 border-l border-gray-600 bg-gray-900" static as="ul">
                            <div>
                                <div className="h-full p-4 flex flex-col items-start text-gray-300 bg-gray-900">
                                    <Textfield onChange={handleInviteUserChange} label='Invite User' id='inviteUser'type='text' className="mb-4" placeholder=" invite a friend" />
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

export default RightSidebar
