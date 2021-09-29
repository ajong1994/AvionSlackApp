import { useState, useEffect, useContext, Fragment, useRef} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router'
import Button from '../components/Button'
import Textfield from '../components/Textfield';
import { getAllSubscribedChannels, getAllUsers, postCreateChannel } from '../utils/Utils';
import { Dialog, Transition  } from '@headlessui/react'
import { SessionContext } from '../contexts/SessionContext'
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const CreateChannel = ({setOpenModal, openModal}) => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const { userList, updateUserList, updateChannelList} = useContext(SessionContext)
    const history = useHistory();
    let channelName = useRef(null)
    const [searchFriend, setSearchFriend] = useState(null)
    const [user_ids, setUser_ids] = useState([])
    
    const handleValueChange = (e, inputType) => {
      if(inputType === 'searchFriend') {
        setSearchFriend(e.target.value)
      }  
   }

   //attempting to display searched users from server in the modal
  //  const displayFriendsList = (searchFriend) => {
  //   const friendsList =  updateUserList(userList) //or getAllUsers(activeUser, updateUserList)?
  //   if (searchFriend === user_ids) {
  //     return friendsList.filter(friend => friend.user_ids === searchFriend)
  //   }
  //   return friendsList    
  // }
  

  const handleCreateChannelClick = () => {
    postCreateChannel(channelName.current.value, user_ids, activeUser, updateChannelList)
    setOpenModal(false)
    
  }
 
    return (
      <div>
        <Transition appear show={openModal} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setOpenModal(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="mt-2">
                    <Textfield label='channelName' ref={channelName} id='channelName'type='text' placeholder='channel name'/>
                    <Textfield label='searchFriends'onChange={(e) => {handleValueChange(e, 'searchFriend')} } value={searchFriend} id='channelName'type='text' placeholder=' type the name of a friend'/>
                  </div>
              
                  <div className="mt-2">
                    <span>List of friends</span>
                    <ul className="h-40 overflow-y-auto">
                      {userList?.map(user => (
                        <li key={user.uid} className="p-2">
                          {user.uid}
                        </li>
                      ))}
                    </ul>
                  
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-large text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      // onClick={handleCreateChannelClick}
                    >
                      create channel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    )
}

export default CreateChannel
