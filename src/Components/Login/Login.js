import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import app from "../../Utilities/Firebase.init";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const auth = getAuth(app);

const Login = ({ setRegistered }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(true);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setVerified(user.emailVerified);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const [forgot, setForgot] = useState(false);

    return (
        <>
            <div className={`forgot ${forgot && "d-none"}`}>
                <h3>Login to your account</h3>
                <p className="d-flex align-items-center justify-content-center">
                    Don't have an account?
                    <button onClick={() => setRegistered(false)} className="btn btn-link">
                        Sign Up Free!
                    </button>
                </p>
                <FloatingLabel controlId="loginEmail" label="Email address" className="mb-3">
                    <Form.Control onBlur={(e) => setEmail(e.target.value)} className="border-0 border-bottom rounded-0" type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="loginPassword" label="Password">
                    <Form.Control onBlur={(e) => setPassword(e.target.value)} className="border-0 border-bottom rounded-0" type="password" placeholder="Password" />
                </FloatingLabel>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                            Remember me
                        </label>
                    </div>
                    <button onClick={() => setForgot(true)} className="btn btn-link">
                        Forgot password?
                    </button>
                </div>
                <input onClick={handleLogin} className="btn btn-primary w-100" type="submit" value="Login with email" /> <br />
                <p className="text-danger">{!verified && "Your are not verified user, please verify your account with your verification link."}</p>
                <h3 className={!verified ? "text-danger" : "text-success"}>{user && user.displayName}</h3>
            </div>

            <ForgotPassword useForgot={[forgot, setForgot]} />
        </>
    );
};

export default Login;
