import React,{ useState }  from "react"

import { GoogleOutlined, FacebookOutlined,UserOutlined } from '@ant-design/icons'

import firebase from "firebase/app"

import { auth } from "../firebase"
import "firebase"
export default function Login() {
  const [title, setTitle] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    await auth.signInAnonymously()
            .then((userCred)=>{
              var user = userCred.user
              
               user.updateProfile({
                displayName: title,
                photoURL: "https://imgur.com/Jissc5P"
              }).then(()=>{
                console.log("In Login")
                console.log(user)
                console.log("End Login")
                auth.updateCurrentUser(user)
                
              }
              )
              
          })
  }

  return (
    <div id='login-page'>
      <div id='login-card'>
        
        <h2>Welcome to Pay1Chat!</h2>
        <h5>Customers Sign In Here</h5>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
    
    <input type="text" required value={title} placeholder="Username" style={{"width":"60%"}}  onChange={(e) => setTitle(e.target.value)} className="form-control user-name" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
        <div style={{"padding":"0"}} className="login-button">
        <button type="submit" className="btn btn-primary"><UserOutlined /> Join Chatroom</button>
        </div>
        

      </form>
        <br/>
        <h5>Developers Sign In Here</h5>
      <div
        className='login-button google'
        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()) }
      >
        <GoogleOutlined /> Sign In with Google
      </div>

        <br/><br/>

        <div
          className='login-button facebook'
          onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()) }
        >
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  )
}
