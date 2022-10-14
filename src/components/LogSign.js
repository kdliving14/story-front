import Logo from "./images/Logo.png"

function LogSign(){
    return (
        <div>
            <img src={Logo} alt={"logo"}/>
            <div>
                <div>
                    <a href="/login">Login</a>       
                    <a href="/signup">Signup</a>
                </div>
            </div>
      </div>
      )
}
export default LogSign