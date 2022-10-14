import { useNavigate } from "react-router-dom"

import User from "./images/user.png"
import Linkedin from "./images/linkedin.png"
import Github from "./images/github.png"
import Blog from "./images/dev.png"

function Profile({setCurrentUser, name, username, image_url, stories, user_id})
{
    const navigate = useNavigate()

    function handleReset(e){
        if(window.confirm("Are you sure you want to reset your progress for this story?")){
            fetch(`/userstories/${e.target.name}`,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'}
                })
            .then(fetch("/chosen", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ left_off:null })
                }).then(res => {
                            if(res.ok){ 
                                alert("Your story progress has been reset.")
                                window.location.reload();
                            }else{
                                res.json().then(res=>console.log(res))
                            }}))
        }
        else {alert("Story progress reset canceled.")}
    }
        
    function handleDeleteAccount(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch(`/users/${user_id}`,{
                    method:'DELETE',
                    headers: {'Content-Type': 'application/json'}
                  })
                  .then(res => {
                    if(res.ok){
                        setCurrentUser(null)
                        alert("Your account has been deleted.")
                        navigate('/')
                    } else {res.json().then(data => console.log(data))}
                  })
        }
        else{
            alert("Account Deletion has been canceled.")
        }
    }

    return(<div>
        <div>
            {image_url==="" ? 
                  <div>
                    <img src={User} alt="User"/>
                  </div> 
                  : 
                  <img src={image_url} alt="user"/>
                }  
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <button onClick={()=>{handleDeleteAccount()}}>
                Delete Account
            </button>
        </div>
        <br></br>
        <div>
        {stories.length===0 ? null : 
        <div>
            {stories?.map((story)=>
                <div key={story.id}>
                    <p>{story.story_name}</p>
                    <button name={story.id} onClick={(e)=>{handleReset(e)}}>
                        Reset Progress
                    </button>
                </div>)}
        </div>}
        <br></br>
        <div>
            <p>Creator Links:</p>
            <div>
                    <a href="https://www.linkedin.com/in/karter-livingston/" target="_blank" rel="noreferrer">
                        <img src={Linkedin} alt="LinkedIn"/>
                    </a>
                    <a href="https://github.com/kdliving14" target="_blank" rel="noreferrer">
                        <img src={Github} alt="Github"/>
                    </a>
                    <a href="https://dev.to/kdliving14" target="_blank" rel="noreferrer">
                        <img src={Blog} alt="Blog"/>
                    </a>
            </div>
        </div>
    </div>
 </div>)
}

export default Profile