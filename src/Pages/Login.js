import { Carousel } from "../Component/Carousel"
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

export const Login = () => {
    const navigate = useNavigate()
    const [fileBase64String, setFileBase64String] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("login-loading").classList.remove("d-none")
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('pswd')
        /*const file = data.get('file')
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var Base64 = reader.result;
            setFileBase64String(Base64);
            //console.log(Base64);
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
        console.log(file)
        console.log(fileBase64String)*/
        console.log(`${process.env.REACT_APP_BACKEND_URL}/login`)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email: email,
            password: password,
        })
            .then(function (response) {
                document.getElementById("login-loading").classList.add("d-none")
                if (response.data == 'Password Salah' || response.data == 'Email Tidak Valid' || response.data == null) {
                    document.getElementById("login-fail").classList.remove("opacity-0")
                } else {
                    localStorage.setItem('user', response.data.username)
                    localStorage.setItem('id', response.data.id)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('token', response.data.token)
                    navigate('../profile')
                }
            })
            .catch(function (error) {
                document.getElementById("login-fail").classList.remove("opacity-0")
                document.getElementById("login-loading").classList.add("d-none")
                console.log(error);
            });
    }

    const fresh = () => {
        document.getElementById("login-fail").classList.add("opacity-0")
        document.getElementById("login-loading").classList.add("d-none")
    }

    return (
        <div>
            <Tagline />
            <Navbar />
            <div className="row m-4">
                <div className="col"></div>
                <div className="col-md-8 col-lg-5">
                    <div class="alert alert-danger opacity-0" id="login-fail" role="alert">
                        A simple danger alert—check it out!
                    </div>
                    <h2 className="border-start border-4 border-dark ps-3">Masuk</h2>
                    <form onSubmit={handleSubmit} className="dark mb-3">
                        <div class="mb-3 mt-3">
                            <label for="email">Email:</label>
                            <input type="email" onChange={() => { fresh() }} class="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="pwd">Password:</label>
                            <input type="password" onChange={() => { fresh() }} class="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-dark me-4">Masuk</button>
                        <a href="/register" className="text-dark">Daftar</a>
                        <div class="spinner-border ms-5 d-none" id="login-loading" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}