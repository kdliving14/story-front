import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import UserChoices from "./UserChoices"

function Home(){
    
    const [userchoices, setUserchoices] = useState([])
    const navigate = useNavigate();


    useEffect(()=>{    
        fetch("/userchoices").then((res) => {
          if(res.ok){res.json().then((userchoices)=>setUserchoices(userchoices))}
        })
    }, []); 

    function handleContinue(){navigate("/events")}

    function handleNewStory(){navigate(`/stories`)}

    return(<div>
        <br></br>
        {userchoices.length=== 0 ? 
        <button onClick={handleNewStory}>Start a Story</button> 
        : 
        <div> 
            <button onClick={handleContinue}>Continue Story?</button> 
            <br></br>
            <br></br>
            <h5>Your choices so far:</h5>
            <div>
                <div>
                {userchoices?.map((choice)=> (
                    <UserChoices
                        key= {choice.id}
                        event = {choice.event.short_description}
                        choice = {choice.choice.content}
                        image_url ={choice.choice.image_url}/>
                    ))} 
                </div>
            </div>
        </div>}
    </div>)
}

export default Home