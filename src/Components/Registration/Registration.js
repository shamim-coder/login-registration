import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../Utilities/Firebase.init";

const auth = getAuth(app);

const Registration = ({ setRegistered }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [displayMsg, setDisplayMsg] = useState("");

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    sendEmailVerification(auth.currentUser).then(() => {
                        console.log(user.user.displayName);
                        setDisplayMsg("Your account has been created, please check your email for verification");
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <h3>Sign up for free!</h3>
            <FloatingLabel controlId="RegEmail" label="Email address" className="mb-3">
                <Form.Control onBlur={(e) => setEmail(e.target.value)} className="border-0 border-bottom rounded-0" type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="RegName" label="Full Name" className="mb-3 ">
                <Form.Control onBlur={(e) => setName(e.target.value)} className="border-0 border-bottom rounded-0" type="text" placeholder="Shamim Reza" />
            </FloatingLabel>
            <FloatingLabel controlId="RegPassword" label="Password">
                <Form.Control onBlur={(e) => setPassword(e.target.value)} className="border-0 border-bottom rounded-0" type="password" placeholder="Password" />
            </FloatingLabel>
            <p className="my-4">
                <small>
                    I agree to the <a href="/">privacy policy</a> and <a href="/">terms of service</a>.
                </small>
            </p>
            <input onClick={handleSubmit} className="btn btn-primary" type="submit" value="Sign up with email" /> <br />
            <button onClick={() => setRegistered(true)} className="btn btn-link">
                Already have an account?
            </button>
            <div className="show-message">
                <p className="text-success">{displayMsg}</p>
            </div>
        </>
    );
};

export default Registration;
