import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Main from './pages/Main'
import AuthContextProvider from './contexts/AuthContext';
import SessionContextProvider from './contexts/SessionContext';



function App() {

  return (
    //We add the Context Provider component
    <AuthContextProvider>
      <SessionContextProvider>
        <Router>
          <Switch>
            <Route path="/signin">
              <Signin/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/">
              <Main/>
            </Route>
          </Switch>
        </Router>
      </SessionContextProvider>
    </AuthContextProvider>
  );
}

// 1. User is able to create his/her account with email and password
// - Sign up page with: 
// - Slack logo component [ok]
// - "Join Avion School h2 native" [ok]
// - Form part component [ok]
//   - Email address input + validation
//     - Validation: 
//        - Not blank
//        - Validating if email using regex
//        - Uses useRef 
//   - Password input + validation
//     - Validation: 
//        - Not blank
//        - Minimum 8 characters
//   - Password confirmation + validation
//     - Validation: 
//        - Must match password
//   - Sign up Button component
//      - Submit the form, POST data to API, wait for response. If no error, display success message. 
//      - If error (422) then display error toast with error message from API
// - Create account link component -> Link to Signup Page Component
// 2. User is able to login his/her credentials
// - Login Page with: 
// - Slack logo component
// - "Sign in to Avion School h2 native"
// - Form part component
//   - Email address input + validation
//   - Password input + validation
//   - Sign in Button component
// - Create account link component -> Link to Signup Page Component
// 3. User is able to create new channel
// - CreateChannel Component
//   - Input field for channel name
//   - Form with list of all users with checkbox -> Generate via API fetch "/api/v1/users"
//   - By default user is part of created channel
//   - On Form submit, POST channel name and selected users to API
// User is able to add users on a channel
// User is able to send message to other user (Direct message)
// User is able to send message to a channel
// User is able to receive message from other user (Direct message)
// User is able to receive message from his/her channels

export default App;
