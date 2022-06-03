import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import app from "../../Utilities/Firebase.init";

const auth = getAuth(app);

const ForgotPassword = ({ useForgot }) => {
    const [forgot, setForgot] = useForgot;
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage(`Send a password reset email to ${email}`);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const changeToLogin = () => {
        setForgot(false);
    };
    return (
        <div className={!forgot && "d-none"}>
            <FloatingLabel controlId="forgotEmail" label="Email address" className="mb-3">
                <Form.Control onBlur={(e) => setEmail(e.target.value)} className="border-0 border-bottom rounded-0" type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <input onClick={handleForgotPassword} className="btn btn-primary w-100" type="submit" value="Forgot your password" /> <br />
            <p>{message}</p>
            <button onClick={changeToLogin} className="btn btn-link">
                Login your account
            </button>
        </div>
    );
};

export default ForgotPassword;
