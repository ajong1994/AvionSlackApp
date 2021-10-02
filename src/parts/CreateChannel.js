import { useState, useEffect, useContext, Fragment, useRef} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router'
import Button from '../components/Button'
import Textfield from '../components/Textfield';
import { getAllSubscribedChannels, getAllUsers, postCreateChannel } from '../utils/Utils';
import { Dialog, Transition  } from '@headlessui/react'
import { SessionContext } from '../contexts/SessionContext'
import ReactPaginate from 'react-paginate';
import Toast from './Toast';


const CreateChannel = ({setOpenModal, openModal}) => {
    const {isAuthenticated, setAuth, activeUser, setUser} = useContext(AuthContext)
    const { userList, updateUserList, channelList, updateChannelList} = useContext(SessionContext)
    const [user_ids, setUser_ids] = useState([])
    const [channelName, setChannelName] = useState(null)
    const [isToastShowing, setIsToastShowing] = useState(false)
    const [toastStat, setToastStat] = useState({
        toastType: '',
        toastMsg: ''
    });

    //states for searching friends' emails & rendering new filtered list of friends 
    const [searchFriend, setSearchFriend] = useState('')
    const [searchFriendList, setSearchFriendList] = useState([])

    // filtering friendslist if email matches 
    useEffect(() => {
      if (searchFriend !== '') {
        const regex = new RegExp(`${searchFriend}`, 'i')
        setSearchFriendList(userList?.filter(user => regex.test(user.uid)))
      } else {
        setSearchFriendList(userList)
      }
    },[searchFriend])

    const [currentPage, setCurrentPage] = useState(1);
    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;

    const pageCount = Math.ceil(searchFriendList?.length / PER_PAGE);
    const pageRangeDisplayed = 2;

    const [selectedUsers, setSelectedUsers] = useState([])
    const handleUserSelect = (e) => {

      if(e.target.checked) {
        setSelectedUsers((prevState) => [...prevState, e.target.value])
      } else {
        setSelectedUsers(selectedUsers.filter(email => email !== e.target.value))
      }
    }
    
    const handleSearchFriendChange = (e) => {
      setSearchFriend(e.target.value)
    }

    const handleChannelName =  (e) => {
      setChannelName(e.target.value)
    }
  
    const handleCreateChannelClick = () => {
      postCreateChannel( channelName, user_ids, activeUser, updateChannelList, toggleToast, updateToastStat)
      setOpenModal(false)
      console.log(channelList)
      toggleToast(true)
    }

    const handlePageClick = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
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
      },2000)
      return () => clearTimeout(timer);
  }, [isToastShowing]) 

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
                <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl min-w-200">
                  <div className="mt-2">
                    <Textfield onChange={handleChannelName} label='channel Name' id='channelName'type='text' placeholder='channel name'/>
                    <Textfield onChange={handleSearchFriendChange} label='search Friends' type='text' placeholder='type the name of a friend'/>
                  </div>
              
                  <div className="mt-2">
                    <span>List of friends</span>
                
                    <ul className="h-40 overflow-y-scroll no-scrollbar">
                      {searchFriendList?.slice(offset, offset + PER_PAGE).map(user => (
                        <li key={user.uid} className="p-2">
                          <label htmlFor={user.uid}>{user.uid}</label>
                          <input onClick={handleUserSelect} className="flex justify-end" type='checkbox' value={user.uid}/>
                        </li>
                      ))}
                    </ul>
                    <ReactPaginate classname="flex bg-black"
                      previousLabel={"← Previous"}
                      nextLabel={"Next →"}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                      pageRangeDisplayed={pageRangeDisplayed}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-large text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCreateChannelClick} 
                    >
                      create channel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
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

export default CreateChannel
