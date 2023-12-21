export default function Home() {
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <section className="userCard">
        <div className="usernameAndProfile">
          <div className="userCardHeading">
            <h2>Your Information</h2>
          </div>

          <div className="cardInformation">
            <div className="avatar">
              <img src={userData.avatar} alt="" width={100} />
            </div>
            <div>
              <p>User Id : {userData._id}</p>
              <p>Username : {userData.username}</p>
              <p>Email : {userData.email}</p>
              <p>Admin : {userData.isAuth}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}