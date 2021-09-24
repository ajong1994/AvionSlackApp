import {useState, createContext, useEffect} from 'react';

//We first create a context--similar to State, but mutable and can be accessed by any consumer/child by using useContext 
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    
    //These are the states we're initializing to store component data related to user Login/Authentication status and their authentication credentials
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = (bool) => {
        setIsAuthenticated(bool)
    }
    const [activeUser, setActiveUser] = useState(null)
    const setUser = (userInfo) => {
        setActiveUser(userInfo)
    }

    useEffect(()=>{
        console.log(isAuthenticated)
        console.log(activeUser)
    },[isAuthenticated, activeUser])

    return (
        //We add the Provider property from the created AuthContext object which will provide all children with necessary values/states without
        //passing them directly as props. In this case, we pass our user login states and updaters to the value prop of Provider,
        //so we can access these in children components using useContext
        <AuthContext.Provider value={{isAuthenticated, setAuth, activeUser, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
