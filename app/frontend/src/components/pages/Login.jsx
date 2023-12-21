/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Login({ userPermission }) {
  const [userVal, setUserVal] = useState({
    usernameAndEmail: '', pass: ''
  })

  const inputVal = (value) => {
    setUserVal({ ...userVal, [value.target.name]: value.target.value })
  }

  const formHandler = async (e) => {
    e.preventDefault()

    const loginData = {
      username: userVal.usernameAndEmail,
      email: userVal.usernameAndEmail,
      pass: userVal.pass
    }
    const loginApi = await axios.post("/api/auth/login", loginData)    

    if (loginApi.data.process) {
      toast.success(loginApi.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
      userPermission(true)

      localStorage.setItem("userInfo", JSON.stringify(loginApi.data.userInfo))
    } else {
      toast.error(loginApi.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
      userPermission(false)
    }
  }

  return (
    <section className="formParent">
      <div className="formCard">
        <h2>Account Login</h2>
        <form onSubmit={formHandler}>
          <div className="inputDiv">
            <label htmlFor="usernameAndEmail">Username or Email</label>
            <input type="text" name="usernameAndEmail" id="usernameAndEmail" onChange={inputVal} />
          </div>

          <div className="inputParentDiv">
            <div className="inputDiv">
              <label htmlFor="pass">Password</label>
              <input type="text" name="pass" id="pass" onChange={inputVal} />
            </div>
          </div>

          <div className="parentBtn">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </section>
  )
}