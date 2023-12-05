import React, { useContext, useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        // Assuming you have a function in your context for handling signup
        context.signUp(userName, password);
    };

    let location = useLocation();

    // Set 'from' to path where the browser is redirected after a successful signup
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <h2>Sign Up page</h2>
            <p>Create a new account to access the protected pages</p>
            <input
                id="username"
                placeholder="Username"
                onChange={(e) => {
                    setUserName(e.target.value);
                }}
            /><br />
            <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            /><br />
            {/* Signup web form */}
            <button onClick={signUp}>Sign Up</button>
            <p>Already have an account?
                <Link to="/login">Log In!</Link></p>
        </>
    );
};

export default SignUpPage;
