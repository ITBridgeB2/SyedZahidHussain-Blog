import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:9090/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("username", data.message)
        

            navigate("/postslist"); // Redirect to the dashboard or homepage
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to The Explorer</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>New here? <a href="/register">Create an account</a></p>
        </div>
    );
};

export default Login;
