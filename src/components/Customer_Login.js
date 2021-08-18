import React from "react"

import { GoogleOutlined } from '@ant-design/icons'

import firebase from "firebase/app"

import { auth } from "../firebase"
import "firebase"
export default function Anonymous() {
  async function handleClick(){
    await auth.signInAnonymously()
            .then((userCred)=>{
              var user = userCred.user
              
               user.updateProfile({
                displayName: "LagosMmab",
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

        <div
          className='login-button google'
          onClick={handleClick}
        >
          <GoogleOutlined /> Sign In as Guest
        </div>

      
      </div>
    </div>
  )
}
