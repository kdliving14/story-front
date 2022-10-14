import { useEffect, useState } from "react";

function Chapter({userstory, story_id}){

    const [chapter, setChapter] = useState([])
    const {image_url, name, long_description, choices, id} = chapter

    const story = [...userstory].find(e => e.story_id === story_id)
  
    if(story.left_off === 0 || story.left_off === null){story.left_off = 1}

    useEffect(()=>{
        fetch(`/events/${story.left_off}`).then((res) => {
        if(res.ok){res.json().then((chapter)=>{setChapter(chapter)})
        }else{
            console.log(res)
        }})// eslint-disable-next-line 
    }, [userstory]);

    function handleClick(e){
        e.preventDefault()

        fetch("/chosen", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: story.user_id, left_off:e.target.value })
        })

        fetch("/userchoices", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ event_id:id, choice_id:e.target.name, userstory_id:story.id })
        })

        fetch(`/events/${e.target.value}`).then((res) => {
            if (res.ok) {res.json().then((chapter)=>{setChapter(chapter)})}
            else {console.log(res)}
        })
    }

    return <div>
            <br></br>
                <div>
                    {image_url === "" ? null : <div><img src={image_url} alt="event"/><br></br></div>}       
                    <h1>{name}</h1>
                    <br></br>
                    <p>{long_description}</p>
                    <div>
                        {choices?.map(c=>(
                            <div key={c.id}>
                                <br></br>
                                <button value={c.next_event_id} name={c.id} onClick={(e)=>{handleClick(e)}}>
                                    {c.content}
                                </button>
                            </div>))
                        }
                    </div>
                </div>
            </div>
}

export default Chapter