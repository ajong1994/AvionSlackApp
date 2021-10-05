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
import {assignImage, assignBg, postInviteToChannel} from "../utils/Utils"

const RightSidebar = () => {
  
  const { activeUser } = useContext(AuthContext)
  const { channelData, moreChannelData, updateChannelData, setMoreChannelData, userList } = useContext(SessionContext)

  const [searchUser, setSearchUser] = useState('')
  const [searchUserList, setSearchUserList] = useState([])

  const handleSearchUserChange = (e) => {
    setSearchUser(e.target.value)
  }
  
  useEffect(() => {
    if (searchUser !== '') {
      const regex = new RegExp(`${searchUser}`, 'i')
      setSearchUserList(userList?.filter(user => regex.test(user.uid)).slice(0, 3))
    } else {
      setSearchUserList([])
    }
  },[searchUser])

  const handleInviteUserClick = (user_id) => {
    postInviteToChannel(activeUser, channelData.id, user_id, updateChannelData)
  }

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
                                   <Textfield onChange={handleSearchUserChange}  label='Invite User' id='inviteUser'type='text' className="mb-4" placeholder=" invite a friend" />

                                   <ul className="pt-2">
                                       {
                                           searchUserList && searchUserList.map((user) => (
                                               <li key={user.id} className="flex py-2 px-2 items-center hover:bg-gray-700 cursor-pointer" onClick={()=>handleInviteUserClick(user.id)}>
                                                   <div className="flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                                                       <span className={assignBg(user?.id)}>
                                                           <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                                       </span>
                                                   </div>
                                                   <div className="text-gray-300 truncate text-sm">{user?.uid}</div>
                                               </li>
                                           ))
                                       }
                                   </ul>
                                </div>
                                <div className="h-full p-4 flex flex-col items-start text-gray-300 bg-gray-900">
                                 <span>Channel Members:</span>

                                 <ul>
                                     {
                                         moreChannelData?.members && moreChannelData.members.map((user) => (
                                             <li key={user.id} className="flex py-1 px-6 items-center">
                                                <div className="flex justify-center items-center h-5 w-5 mr-2 flex-shrink-0">
                                                    <span className={assignBg(user?.id)}>
                                                        <img src={assignImage(user?.id, "User")} className="h-5 w-5 items-center"/>
                                                    </span>
                                                </div>
                                                <div className="text-gray-300 truncate text-sm">{user?.uid}</div>
                                             </li>
                                         ))
                                     }
                                 </ul>
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
