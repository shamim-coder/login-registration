import { faFacebookF, faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Logo from "../../Images/logo.png";
import "./UserManage.css";

const UserManage = () => {
    const [registered, setRegistered] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="login-registration-container ">
            <div className="row">
                <div className="col-lg-5 p-5 bg-dark bg-opacity-75 text-light">
                    <img className="img-fluid w-75 my-5" src={Logo} alt="" />
                    <p>Login using social media to get quick access</p>
                    <button className="mb-3 facebook-color border-0 text-light w-100 py-2 rounded d-flex justify-content-center align-items-center gap-2">
                        <FontAwesomeIcon icon={faFacebookF} /> Signin With Facebook
                    </button>
                    <button className="mb-3 twitter-color border-0 text-light w-100 py-2 rounded d-flex justify-content-center align-items-center gap-2">
                        <FontAwesomeIcon icon={faTwitter} /> Signin With Twitter
                    </button>
                    <button className="mb-3 google-color border-0 text-light w-100 py-2 rounded d-flex justify-content-center align-items-center gap-2">
                        <FontAwesomeIcon icon={faGoogle} /> Signin With Google
                    </button>
                    <button className="mb-3 github-color border-0 text-light w-100 py-2 rounded d-flex justify-content-center align-items-center gap-2">
                        <FontAwesomeIcon icon={faGithub} /> Signin With Github
                    </button>
                </div>
                <div className="col-lg-7 bg-white p-5 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className={`signup p-5 ${registered && "d-none"}`}>
                            <Registration setRegistered={setRegistered} />
                        </div>
                        <div className={`login p-5 ${!registered && "d-none"}`}>
                            <Login setRegistered={setRegistered} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserManage;
