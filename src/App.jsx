import { useState } from 'react'
import Authenticate from './components/Authenticate'
import SignUpForm from './components/SignUpForm'
import './stylesheet.css'

function App() {
  const [token, setToken] = useState(null);

  //console.log("Token in App:", token);

  return (
    <>
            
      <SignUpForm setToken={setToken} />
            
      <Authenticate token={token} />
          
    </>
  );
}

export default App
