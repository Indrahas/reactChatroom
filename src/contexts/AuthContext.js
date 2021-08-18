import React, { useContext, useState, useEffect } from "react"

import { useHistory } from "react-router-dom"

import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        console.log("In Auth Context")
        console.log(auth.currentUser)
        console.log("End Auth Context")
      }
      setUser(auth.currentUser)
      setLoading(false)
      
      //
      history.push('/chats')
    })
  }, [user, history])

  const value = { user }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
