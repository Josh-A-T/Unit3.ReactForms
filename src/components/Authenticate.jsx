import { useState } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        setSuccessMessage(null); // Clear previous success message
        setError(null);          // Clear previous error message

        try {
            if (!token) {
                throw new Error("No token provided. Please sign up first.");
            }

            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/authenticate",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Authentication failed.");
            }

            setSuccessMessage(result.message || "Authentication successful!");
        } catch (error) {
            setError(error.message || "An error occurred during authentication.");
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
}
