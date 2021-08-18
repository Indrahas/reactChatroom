import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../firebase"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  let { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }


  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      if(user.isAnonymous){
        console.log("anonymous Login")
        axios.get(
          'https://api.chatengine.io/users/me/',
          { headers: { 
            "project-id": 'b85ea82d-680c-4650-8d58-16c723d5a413',
            "user-name": user.displayName,
            "user-secret": "1234"+user.displayName+"5678"
          }}
        )
        .then(() => setLoading(false))
        .catch(e => {
          console.log(e)
          console.log("Inside catch box")
          console.log(user)
          // let formdata = new FormData()
          let name = auth.currentUser.displayName
          // formdata.append('email', user.email)
          // formdata.append('username', name)
          // formdata.append('secret', "1234"+name+"5678")
          // console.log(formdata)
          console.log(auth.currentUser.displayName)
          console.log("End catch Box")
          axios.post(
            'https://api.chatengine.io/users/',
            {
              "username": name,
              "secret": "1234"+name+"5678",
              },
            { headers: { "private-key": "2ef81196-badd-442f-80ac-0fdaf080f5f9","content-type": "application/json" }}
          )
          .then(() => {
            // console.log(user.displayName)
            setLoading(false)})
          .catch(e =>{ 
            console.log('e', e.response)
            console.log(auth.currentUser.displayName)
            history.push("/")
            history.push("/chats")
            console.log("Error in Posting")
          })
        })
      }
      else{
        console.log("Google Login")
        axios.get(
          'https://api.chatengine.io/users/me/',
          { headers: { 
            "project-id": 'b85ea82d-680c-4650-8d58-16c723d5a413',
            "user-name": user.displayName,
            "user-secret": user.uid
          }}
        )
  
        .then(() => setLoading(false))
  
        .catch(e => {
          console.log("Inside catch box")
          console.log(user)
          let formdata = new FormData()
          // formdata.append('email', user.email)
          formdata.append('username', user.displayName)
          formdata.append('secret', user.uid)
          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": "2ef81196-badd-442f-80ac-0fdaf080f5f9" }}
          )
          .then(() => {setLoading(false)})
          .catch(e => console.log('e', e.response))
        })
      }
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />
  if (user.displayName===null) return <div />
  if (user.isAnonymous){
    return (
      <div className='chats-page'>
        <div className='nav-bar'>
          <div className='logo-tab'>
            Pay1
          </div>
  
          <div onClick={handleLogout} className='logout-tab'>
            Logout
          </div>
        </div>
        
        <ChatEngine 
          height='calc(100vh - 66px)'
          projectID='b85ea82d-680c-4650-8d58-16c723d5a413'
          userName={user.displayName}
          userSecret={"1234"+user.displayName+"5678"}
        />
      </div>
    )
  }
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Pay1
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>
      
      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='b85ea82d-680c-4650-8d58-16c723d5a413'
        userName={user.displayName}
        userSecret={user.uid}
      />
    </div>
  )
}
