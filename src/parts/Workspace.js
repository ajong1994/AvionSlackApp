import { PencilAltIcon } from "@heroicons/react/outline"
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router'
import { removeUserSession } from "../utils/Utils"
import { useContext, Fragment } from "react"
import { AuthContext } from '../contexts/AuthContext'


const Workspace = ({onClick}) => {

    const history = useHistory();
    const { setAuth, setUser } = useContext(AuthContext)
    const handleSignOutClick = () => {
        removeUserSession(setAuth, setUser, history);
    }
    return (
        <div className="col-start-1 col-end-2 row-start-1 px-4 py-2 flex items-center justify-between bg-gray-900 border-b border-r border-gray-600">
            <Menu as="div" className="relative">
                <Menu.Button className="text-white inline-flex justify-center items-center">
                    <h2>Avion School</h2>
                    <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-white"
                    />
                    </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            <button onClick={()=>handleSignOutClick()}>Sign Out</button>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            <span className="rounded-full bg-white p-2 flex justify-center items-center" onClick={() => onClick(true)}>
                <PencilAltIcon className="h-4 w-4"/>
            </span>
        </div>

    )
}

export default Workspace
