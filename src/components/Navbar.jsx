import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { UseAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
  const {logout}=useLogout()
  const {user}=UseAuthContext()

  const handelLogoutClick=()=>{
    logout()
  }
  return (
    <>
    <header className="bg-dark">
        <div className='navbar-container'>
            <Link to='/'>
            <div className="Logo">
              {/* <img src="" alt="" /> */}
              <h1>TrackerFit</h1>
            </div>
            </Link>
            <nav>
            {user && (
                <div style={{display:"flex",alignItems:"center"}}>
                <h5 className="text-white">{user.email}</h5>
                <button 
                onClick={handelLogoutClick}
                className="btn btn-danger"
                style={{marginLeft:"10px"}}>Logout</button>
              </div>
            )}
          {!user &&(
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </div>
          )}
        </nav>
        </div>
    </header>
    </>
  )
}

export default Navbar