import { MenuAlt1Icon  } from '@heroicons/react/solid';
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { useContext, useEffect, Fragment } from "react"


const MobileNavbar = () => {

    const { activeUser, setUser } = useContext(AuthContext)


    return(
        <span className="rounded-full bg-white p-2 flex justify-center items-center">
        <MenuAlt1Icon className="h-4 w-4"/>
        </span>
    )
}

export default MobileNavbar
