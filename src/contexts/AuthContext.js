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


    //Pull Auth state data from session storage and set current states to that on mount
    useEffect(()=>{
        setAuth(JSON.parse(sessionStorage.getItem('isAuthenticated')));
        setUser(JSON.parse(sessionStorage.getItem('activeUser')));
        console.log('auth mount runs')
        // console.log(Boolean(false))
        console.log(typeof(JSON.parse(sessionStorage.getItem('isAuthenticated'))))
    },[])

    //Save Auth states to Session storage on set/change
    useEffect(()=>{
        sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        sessionStorage.setItem('activeUser', JSON.stringify(activeUser));
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
