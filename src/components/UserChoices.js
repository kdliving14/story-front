
function UserChoices({event, choice, image_url}){
return (
    <div>
        {image_url === "" ? null : <img src={image_url} alt="choice"/>}
        <h2>Event:</h2> 
        <p>{event}</p>
        <br></br>
        <h2>Choice:</h2>
        <p>{choice}</p>
    </div>
)
}

export default UserChoices