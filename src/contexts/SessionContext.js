import {useState, createContext, useEffect} from 'react';

//We first create a context--similar to State, but mutable and can be accessed by any consumer/child by using useContext 
export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    
    //These are the states we're initializing to store component data related to user Login/Authentication status and their authentication credentials
    const [userList, setUserList] = useState(false);

    const updateUserList = (userlist) => {
        setUserList(userlist)
    }

    return (
        //We add the Provider property from the created AuthContext object which will provide all children with necessary values/states without
        //passing them directly as props. In this case, we pass our user login states and updaters to the value prop of Provider,
        //so we can access these in children components using useContext
        <SessionContext.Provider value={{userList, updateUserList}}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
