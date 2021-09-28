import { useState, useEffect, useContext, Fragment} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router'
import Button from '../components/Button'
import Textfield from '../components/Textfield';
import { postCreateChannel } from '../utils/Utils';
import { Dialog, Transition  } from '@headlessui/react'
import { SessionContext } from '../contexts/SessionContext'
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const CreateChannel = ({setOpenModal, openModal}) => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const { userList, updateUserList, updateChannelList} = useContext(SessionContext)
    const history = useHistory();
    const [channelName, setChannelName] = useState(null)
    const [friendName, setfriendName] = useState(null)
    const [user_ids, setUser_ids] = useState([])

  
    
    const handleValueChange = (e, inputType) => {
      if(inputType === 'channelName') {
        setChannelName(e.target.value)
      } else if(inputType === 'friendName') {
        setfriendName(e.target.value)
      }  
   }

   postCreateChannel(channelName, user_ids, activeUser, updateChannelList)
    
 
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
                    <Textfield label='channelName' onChange={(e) => {handleValueChange(e, 'channelName')} } value={channelName} id='channelName'type='text' placeholder='channel name'/>
                    <Textfield label='searchFriends'onChange={(e) => {handleValueChange(e, 'friendName')} } value={friendName} id='channelName'type='text' placeholder=' type the name of a friend'/>
                  </div>
              
                  <div className="mt-2">
                    <span>List of friends</span>
                    <ul className='list-group mb-4'>
                      {/* {posts.map(post => (
                        <li key={post.id} className='list-group-item'>
                          {post.title}
                        </li>
                      ))} */}
                  </ul>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-large text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => setOpenModal(false)}
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
