/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export const GlobProvider = createContext()

export default function GlobContext({ children }) {
  const navigate = useNavigate()
  const [activeNavBtn, setActiveNavBtn] = useState(true)
  const [isUser, setIsUser] = useState(false)

  const verifyUser = async () => {
    const result = await axios.get("/api/auth/token")
    console.log(result);
    if (result.data.process) {
      setIsUser(result.data.process)
    } else {
      localStorage.removeItem("userInfo")
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  useEffect(() => {
    navigate('/')
  }, [isUser])

  const logout = async () => {
    let logoutResult = await axios.post("/api/auth/logout")

    if (logoutResult.data.process) toast.success(logoutResult.data.msg, {
      position: toast.POSITION.BOTTOM_LEFT,
      theme: "dark"
    })

    localStorage.removeItem("userInfo")
    setIsUser(false)
  }

  return (
    <GlobProvider.Provider value={{
      isUser, setIsUser,
      activeNavBtn, setActiveNavBtn,
      logout
    }}>
      {children}
    </GlobProvider.Provider>
  )
}