import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [agree, setAgree] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const signup = async () => {
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            console.error('Error during signup:', error.message);
        }
    };

    const handleContinue = () => {
        if (state === "Sign Up") {
            signup();
        } else {
            login();
        }
    };

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    {state === "Sign Up" && <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
            </div>
            <button onClick={handleContinue} disabled={!agree}>Continue</button>
            {state === "Sign Up" ?
                <p className='loginsignup-login'>Already have an account?<span onClick={() => setState("Login")}>Login here</span></p>
                : <p className='loginsignup-login'>Create an account?<span onClick={() => setState("Sign Up")}>Click here</span></p>
            }
            <div className='loginsignup-agree'>
                <input type='checkbox' name='agree' id='agree' onChange={() => setAgree(!agree)} />
                <label htmlFor='agree'>By continuing, I agree to the terms of use and privacy policy.</label>
            </div>
        </div>
    );
};

export default LoginSignup;
