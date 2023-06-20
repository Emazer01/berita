import { Carousel } from "../Component/Carousel"
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Footer } from "../Component/Footer";
import logo from "../Image/logo.png"

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
                    navigate('../profil')
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
        <div className="bg-f5">
            <Navbar />
            <div className="bg-biru h-55-vh"></div>
            <div className="row mb-5 mt-minus-50-vh">
                <div className="col"></div>
                <div className="col-10 col-md-6 col-lg-5 bg-body-tertiary shadow row">
                    <div className="col"></div>
                    <div className="col-10 col-lg-8 py-4">
                        <div className="d-flex mt-5">
                            <h2 className="font-nunito fw-bold">MASUK</h2>
                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="login-loading">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <p className="text-muted mb-1">
                            <small>Masukkan data anda dibawah</small>
                        </p>
                        <div class="alert alert-danger p-2 rounded-3 opacity-0 mb-1" role="alert" id="login-fail">
                            <small><strong>Gagal Masuk! </strong>Email/Password salah</small>
                        </div>
                        <form onSubmit={handleSubmit} className="dark mb-5">
                            <div>
                                <label for="email" className="font-nunito fw-bold">Email<span className="text-danger">*</span></label>
                                <input type="email" onChange={() => { fresh() }} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="email" placeholder="Enter email" name="email" />
                            </div>
                            <div class="my-4">
                                <label for="pwd" className="font-nunito fw-bold">Password<span className="text-danger">*</span></label>
                                <input type="password" onChange={() => { fresh() }} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="pwd" placeholder="Enter password" name="pswd" />
                            </div>
                            <button type="submit" class="btn btn-biru my-3 w-100 rounded-3 shadow">Masuk</button>
                            <p className="text-center">
                                <small className="text-muted">Tidak punya akun? </small>
                                <small className="fw-semibold"><a href="/register" className="text-dark text-decoration-none">Daftar!</a></small>
                            </p>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}