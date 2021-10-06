import { useState, useEffect, useContext, Fragment } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import ModalTextfield from '../components/ModalTextfield';
import { postCreateChannel, assignImage, assignBg } from '../utils/Utils';
import { Dialog, Transition  } from '@headlessui/react'
import { SessionContext } from '../contexts/SessionContext'
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon} from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/outline';


const CreateChannel = ({setOpenModal, openModal, toggleToast, updateToastStat, isToastShowing, toastStat}) => {
  const { activeUser } = useContext(AuthContext)
  const { userList, updateChannelList} = useContext(SessionContext)

  //handling input channel name
  const [channelName, setChannelName] = useState(null)
  const handleChannelName =  (e) => {
    setChannelName(e.target.value)
  }

  //handling change for search bar
  const [searchUser, setSearchUser] = useState('') 
  //states for searching users email at the search bar
  const [searchUserList, setSearchUserList] = useState([])

  // if searched user (email) matches an email in the userList, set it to searchUserList
  useEffect(() => {
    if (searchUser !== '') {
      const regex = new RegExp(`${searchUser}`, 'i')
      setSearchUserList(userList?.filter(user => regex.test(user.uid)))
    } else {
      setSearchUserList(userList) //should this be an empty array instead?
    }
  },[searchUser])
  // initial states for checked users in the checkbox
  const [selectedUsers, setSelectedUsers] = useState([])
  //setting the selected users in an array
  const handleUserSelect = (e) => {
    if(selectedUsers.includes(e.target.value)) {
      setSelectedUsers((prevState) => [...prevState, e.target.value])
    } else {
      setSelectedUsers(selectedUsers.filter(email => email !== e.target.value));

    }
  }

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(searchUserList?.length / PER_PAGE);

  //handling input search user
  const handleSearchUser = (e) => {
    setSearchUser(e.target.value)
  }

  const handleCreateChannelClick = () => {
    postCreateChannel(channelName, selectedUsers, activeUser, updateChannelList, toggleToast, updateToastStat, setOpenModal)
  }

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  }

  return (
    <div>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpenModal(false)}
        >
          <div className="min-h-screen px-4 text-center ">
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
              <div className="inline-block modal-width bg-gray-800 p-4 my-8 overflow-hidden text-left align-middle transition-all transform shadow-md rounded-lg border border-black min-w-200">
                <h3 className="text-gray-100 text-lg mb-1">Create a Channel</h3>
                <p className="text-gray-400 text-xs mb-6">Make a channel name no longer than 15 characters and select users to add to your channel.</p>
                <div className="mt-2">
                  <ModalTextfield onChange={handleChannelName} id='channelName' type='text' placeholder='Type a channel name' labelClass="text-gray-200" 
                    inputClass="mt-2 py-1 px-2 rounded bg-gray-900 text-sm text-gray-300 border-transparent focus:ring-0 focus:outline-none focus:border-transparent"/>
                  <ModalTextfield onChange={handleSearchUser} type='text' placeholder="Type the email of a friend" labelClass="text-gray-200 mt-2" 
                    inputClass="mt-2 py-1 px-2 rounded bg-gray-900 text-sm text-gray-300 border-transparent focus:ring-0 focus:outline-none focus:border-transparent"/>
                </div>
                <div className="mt-6">
                  {/* <span className="text-gray-200">List of friends</span> */}
                  <ul className="h-40 overflow-y-scroll modal-scrollbar">
                    {searchUserList?.slice(offset, offset + PER_PAGE).map(user => (
                      <li key={user.uid} className="flex py-1 px-2 items-center hover:bg-gray-600 cursor-pointer">   
                        <div className="flex justify-center items-center h-6 w-6 mr-2 flex-shrink-0">
                            <span className={assignBg(user?.id)}>
                                <img src={assignImage(user?.id, "User")} className="h-6 w-6 items-center"/>
                            </span>
                        </div>                   
                        <label htmlFor={user.uid} className="text-gray-300 text-sm cursor-pointer" onClick={handleUserSelect}>
                          {user.uid}
                          <span className="pl-2 text-gray-400">(UID: {user.id})</span>
                        </label>
                        <input onClick={handleUserSelect} className="ml-auto border border-gray-300 bg-transparent rounded focus:ring-0 focus:ring-offset-0 focus:outline-none active:ring-0 checked:bg-green-300
                          text-green-300 w-5 h-5 cursor-pointer" 
                          id={user.uid} type='checkbox' defaultChecked={selectedUsers.includes(String(user.id))} value={user.id}/>
                      </li>
                    ))}
                  </ul>
                  <div id='react-paginate' className="pt-6 pb-2">
                    <ReactPaginate
                      previousLabel={<ChevronLeftIcon className="h-5 w-5"/>}
                      nextLabel={<ChevronRightIcon className="h-5 w-5"/>}
                      pageCount={pageCount}
                      breakLabel={"..."}
                      breakClassName={"m-0 py-1 px-3 text-gray-300 flex items-center"}
                      onPageChange={handlePageClick}
                      containerClassName={"items-center justify-center flex"}
                      pageClassName	= {"m-0 py-1 px-3 mx-2 text-gray-300"}
                      previousLinkClassName={"text-gray-300 mr-2 flex items-center"}
                      nextLinkClassName={"text-gray-300 ml-2 flex items-center"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"bg-gray-600 border border-gray-500 text-gray-300 rounded"}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={0}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-sm font-large text-green-900 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleCreateChannelClick} 
                  >
                    Create New Channel
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
