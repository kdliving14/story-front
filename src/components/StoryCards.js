import { useNavigate } from "react-router-dom"
import Default from "./images/default.png"

function StoryCard({title, description, image_url, trigger_warnings, user_id, story_id, userstories, setUserStories}){
    const navigate = useNavigate();

    function handleClick(e){
        e.preventDefault()

        if(userstories?.find(e => e.story_id === story_id)){
            navigate("/events")
        }
        else{
            fetch("/userstories", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ user_id:user_id, story_id:story_id })
            }).then((data)=>{setUserStories(data); window.location.reload()}).then(navigate("/events"))
        }
    }
    
    return(<div>
        <img src={image_url === "" ? Default : image_url} alt={title}/>
        <br></br>
        <h1>{title}</h1>
        <br></br>
        <p>{description}</p>
        <br></br>
        <p>Trigger Warning: This story contains {trigger_warnings}.</p>
        <br></br>
        <p>Viewer discretion is advised.</p>
        <br></br>
        <div>
            <button onClick={(e)=>{handleClick(e)}}>Start</button>
        </div>
    </div>)

}
export default StoryCard