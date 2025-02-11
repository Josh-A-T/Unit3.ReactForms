import { useState } from "react";

export default function SignUpForm({ setToken }) { // Accept setToken as a prop
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Sign up failed.");
            }

            // Call setToken to update the token in App.jsx
            console.log("Token received:", result.token);
            setToken(result.token); // Update the token in the parent component
            setSuccess("Sign up successful!"); 
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>

                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}