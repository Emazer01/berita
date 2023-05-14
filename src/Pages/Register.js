import { Carousel } from "../Component/Carousel"
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, DefaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Footer } from "../Component/Footer";

export const Register = () => {
    const navigate = useNavigate()
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("register-loading").classList.remove("d-none")
        const data = new FormData(event.currentTarget);
        const username = data.get('username')
        const password = data.get('pswd')
        const email = data.get('email')
        var wartawan = data.get('wartawan')
        if (wartawan==null) {
            wartawan = 3
        }
        console.log(wartawan)
        if (username != '' && password != '' && email != '' && wartawan !=null) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                username: username,
                email: email,
                password: password,
                wartawan: wartawan
            })
                .then(function (response) {
                    if (response.data == 'Berhasil Register') {
                        navigate('../login')
                    } else {
                        document.getElementById("register-loading").classList.add("d-none")
                        document.getElementById("register-fail").classList.remove("opacity-0")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    document.getElementById("register-loading").classList.add("d-none")
                    document.getElementById("register-fail").classList.remove("opacity-0")
                });
        } else {
            document.getElementById("register-loading").classList.add("d-none")
            document.getElementById("register-fail").classList.remove("opacity-0")
        }
    }
    /*
        const handleChange = (e) => {
            let selectedFile = e.target.files[0]
            if (selectedFile) {
                if (selectedFile && selectedFile.type == 'application/pdf') {
                    let reader = new FileReader()
                    reader.readAsDataURL(selectedFile)
                    reader.onload = (e) => {
                        setPdfFile(e.target.result)
                    }
                }
                else {
                    setPdfFile(null)
                }
            }
            else {
                console.log("Select File")
            }
        }
    */
    const fresh = () => {
        document.getElementById("register-fail").classList.add("opacity-0")
    }

    const newplugin = defaultLayoutPlugin()

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
                            <h2 className="font-nunito fw-bold">DAFTAR</h2>
                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="register-loading">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <p className="text-muted mb-1"><small>Selamat datang! Masukkan data anda dibawah</small></p>
                        <div class="alert alert-danger p-2 rounded-3 opacity-0 mb-1" role="alert" id="register-fail">
                            <small><strong>Gagal Daftar! </strong>Email/Password tidak valid</small>
                        </div>
                        <form onSubmit={handleSubmit} className="dark mb-5">
                            <div>
                                <label for="username" className="font-nunito fw-bold">Username</label><br/><small>(min 6 char)</small>
                                <input type="text" onChange={() => { fresh() }} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="username" placeholder="Enter username" name="username" />
                            </div>
                            <div class="my-3">
                                <label for="email" className="font-nunito fw-bold">Email</label>
                                <input type="email" onChange={() => { fresh() }} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="email" placeholder="Enter email" name="email" />
                            </div>
                            <div class="my-3">
                                <label for="pwd" className="font-nunito fw-bold">Password</label><br/><small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                <input type="password" onChange={() => { fresh() }} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="pwd" placeholder="Enter password" name="pswd" />
                            </div>
                            <div class="form-check px-5">
                                <input class="form-check-input fs-4 rounded-3 border border-tertiary border-2 shadow-sm" type="checkbox" value="2" id="flexCheckDefault" name="wartawan"/>
                                    <label class="form-check-label font-nunito fw-bold p-2" for="flexCheckDefault">
                                        Daftar sebagai wartawan
                                    </label>
                            </div>
                            <button type="submit" class="btn btn-biru my-3 w-100 rounded-3 shadow">Daftar</button>
                            <p className="text-center">
                                <small className="text-muted">Sudah punya akun? </small>
                                <small className="fw-semibold"><a href="/login" className="text-dark text-decoration-none">Masuk!</a></small>
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