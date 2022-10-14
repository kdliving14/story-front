import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

function Signup(){

    const [errors, setErrors] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        username:"",
        password:"",
        image_url:""
    })

    const {name, username, password, image_url} = formData

    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()

        fetch(`/users`,{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, name, password, image_url})
        })
        .then((res) => {
            if (res.ok){res.json().then(() => {alert("Account made successfully. Please login with the account details you used."); navigate(`/login`)})}
            else{res.json().then(data => {setErrors(data.errors)})}})
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    let err;

    if (errors){
        err = [...new Set(errors)]
    }
    
    return(<div>
    <br></br>
    {err ? err?.map(e=>(<h1 key={e}>{e}</h1>)) : null}
    <form onSubmit={onSubmit}>
            <input  
                type="text" 
                name="name"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="First Name"/>
            <input  
                type="text"
                name="image_url"
                autoComplete="off"
                value={image_url}
                onChange={handleChange}
                placeholder="Profile Image URL"/>
            <input
                type="text" 
                name="username"
                autoComplete="off"
                value={username}
                onChange={handleChange}
                placeholder="Username"/>
            <input  
                type="password"
                name="password"
                autoComplete="off"
                value={password}
                onChange={handleChange}
                placeholder="Password"/>
        <br></br>
        <button type="submit">Submit</button>
    </form>    
    </div>)

}

export default Signup