import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    username: "", email: "", pass: "", conPass: "", avatar: ''
  })

  let [img, setImg] = useState('https://imgs.search.brave.com/6TTWV67tp-5sGkE4wipy3p7_OFXDoWCZ7sMdvNR-GSk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE5LzMyLzkz/LzM2MF9GXzExOTMy/OTM4N19zVVRiVWRl/eWhrMG51aE53NVdh/RnZPeVFGbXhlcHBq/WC5qcGc')
  const inputVal = (val) => {
    setUserInput({ ...userInput, [val.target.name]: val.target.value })
  }

  const AvatarAdd = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.files[0] })
    let image = URL.createObjectURL(e.target.files[0])
    setImg(image)
  }

  const formHandler = async (e) => {
    e.preventDefault()
    let user = new FormData()

    user.append('username', userInput.username)
    user.append('email', userInput.email)
    user.append('pass', userInput.pass)
    user.append('conPass', userInput.conPass)
    user.append('avatar', userInput.avatar)
    const registerApi = await axios.post("/api/auth/register", user)

    if (registerApi.data.process) {
      toast.success(registerApi.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
      navigate("/login")
    } else {
      toast.error(registerApi.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
    }
  }

  return (
    <section className="formParent">
      <div className="formCard">
        <h2>Account Register</h2>
        <form onSubmit={formHandler}>
          <div className="inputDiv avatar">
            <input type="file" onChange={AvatarAdd} name="avatar" id="avatar" />
            <label htmlFor="avatar"><img src={img} alt="" /></label>
          </div>

          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={inputVal} />
          </div>

          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={inputVal} />
          </div>

          <div className="inputParentDiv">
            <div className="inputDiv">
              <label htmlFor="pass">Password</label>
              <input type="text" name="pass" id="pass" onChange={inputVal} />
            </div>
            <div className="inputDiv">
              <label htmlFor="conPass">Confirm Password</label>
              <input type="conPass" name="conPass" id="conPass" onChange={inputVal} />
            </div>
          </div>

          <div className="parentBtn">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </section>
  )
}