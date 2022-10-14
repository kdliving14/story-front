import Home from "./images/home.png"
import Story from "./images/story.png"
import User from "./images/user.png"
import Logout from "./images/logout.png"


import { useNavigate } from "react-router-dom";

function Navbar({setCurrentUser, image}) {

  const navigate = useNavigate()
    
    function handleLogout(){
        fetch("/logout", {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        }).then(()=> setCurrentUser(null))
        navigate("/login")
    }

    return (
          <nav>
            <div>
                <a href={`/`}><img src={Home} alt="Home" className="w-8"/></a>
                <a href={`/stories`}> <img src={Story} alt="Story"/></a>
                <a href={`/profile`}> 
                  <div className="m-auto">
                    {image==="" ? 
                      <div>
                        <img src={User} alt="User"/>
                      </div> 
                      : 
                      <img src={image} alt="user"/>
                    }
                  </div>
                </a>
                <button type="button" onClick={handleLogout}><img src={Logout} alt="logout" /></button>
            </div>
          </nav>
    );
  }
  
  export default Navbar