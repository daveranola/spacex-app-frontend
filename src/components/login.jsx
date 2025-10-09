import { useState } from "react";

export default function Login( login ) {
    const [loggedInName, setLoggedInName] = useState("");
    const [loggedInEmail, setLoggedInEmail] = useState("");
    const [loggedInPassword, setLoggedInPassword] = useState("");
    
    return (
        <form onSubmit = {login}>
            <div>
                <input 
                placeholder="Username"
                value={loggedInName}
                onChange={(e) => setLoggedInName(e.target.value)} />
            </div>

            <div>
                <input 
                placeholder="Email"
                value={loggedInEmail}
                onChange={(e) => setLoggedInEmail(e.target.value)} />
            </div>

            <div>
                <input 
                placeholder="Password"
                value={loggedInPassword}
                onChange={(e) => setLoggedInPassword(e.target.value)} />
            </div>

            <button>Login</button>
        </form>
    )
}