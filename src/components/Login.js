import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

function LoginSignup({updateUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false)

    const navigate = useNavigate();

    function handleSubmitLogin(e) {
    
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
            })
            .then((res) => {
                if (res.ok){res.json().then(user => {updateUser(user); navigate(`/`)})}
                else{res.json().then(data => setErrors(data.error))}})
    }

    return (
        <div>
        <br></br>
        {errors ? <h1>{errors}</h1> : null}

        <form onSubmit={handleSubmitLogin}>
            <div>
            <div>
                <input
                type="text" 
                name="username"
                autoComplete="off"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"/>
            </div>
            <div>
                <input
                type="password"
                name="password"
                autoComplete="off"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"/>
            </div>
            <button type="submit">Login</button>
            </div>
        </form>
      </div>
    )      
}
export default LoginSignup