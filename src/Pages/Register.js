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
        if (username!='' && password!='' && email!='') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
              username: username,
              email   : email,
              password: password
            })
            .then(function (response) {
              if (response.data=='Berhasil Register') {
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

    const handleSubmit2 = (event) => {
        event.preventDefault();
        document.getElementById("register-loading").classList.remove("d-none")
        const data = new FormData(event.currentTarget);
        const file = data.get('file')
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var Base64 = reader.result;
            //setFileBase64String(Base64);
            //console.log(Base64);
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
        const username = data.get('username')
        const password = data.get('pswd')
        const email = data.get('email')
        console.log(username, password, email, pdfFile)
        if (username!='' && password!='' && email!='') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
              username: username,
              email   : email,
              password: password
            })
            .then(function (response) {
              if (response.data=='Berhasil Register') {
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

    const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        if(selectedFile){
            if(selectedFile && selectedFile.type == 'application/pdf'){
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

    const fresh = () => {
        document.getElementById("register-fail").classList.add("opacity-0")
    }

    const toReg = () => {
        document.getElementById("register-fail").classList.add("opacity-0")
        document.getElementById("daftar-reg").classList.remove("d-none")
        document.getElementById("btn-reg").classList.add("bg-body-secondary")
        document.getElementById("daftar-war").classList.add("d-none")
        document.getElementById("btn-war").classList.remove("bg-body-secondary")
    }
    const toWar = () => {
        document.getElementById("register-fail").classList.add("opacity-0")
        document.getElementById("daftar-reg").classList.add("d-none")
        document.getElementById("btn-reg").classList.remove("bg-body-secondary")
        document.getElementById("daftar-war").classList.remove("d-none")
        document.getElementById("btn-war").classList.add("bg-body-secondary")
    }
    
    const newplugin = defaultLayoutPlugin()

    return (
        <div>
            <Tagline />
            <Navbar />
            <div className="row m-4">
                <div className="col"></div>
                <div className="col-md-8 col-lg-5">
                    <div class="alert alert-danger opacity-0" id="register-fail" role="alert">
                        A simple danger alert—check it out!
                    </div>
                    <h2 className="border-start border-4 border-dark ps-3 mb-4">Daftar</h2>
                    <button onClick={() => { toReg() }} className="btn bg-body-secondary me-2 w-25" id="btn-reg">Reguler</button>
                    <button onClick={() => { toWar() }} className="btn w-25" id="btn-war">Wartawan</button>
                    <form onSubmit={handleSubmit} className="dark mb-3" id="daftar-reg">
                        <div class="mb-3 mt-3">
                            <label for="username">Username:</label>
                            <input type="text" onChange={()=>{fresh()}} class="form-control" id="username" placeholder="Enter username" name="username" />
                        </div>
                        <div class="mb-3">
                            <label for="email">Email:</label>
                            <input type="email" onChange={()=>{fresh()}} class="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="pwd">Password:</label>
                            <input type="password" onChange={()=>{fresh()}} class="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-dark me-4">Daftar</button>
                        <a href="/login" className="text-dark">Masuk</a>
                        <div class="spinner-border ms-5 d-none" id="register-loading" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </form>
                    <form onSubmit={handleSubmit2} className="dark mb-3 d-none" id="daftar-war">
                        <div class="mb-3 mt-3">
                            <label for="username">Username:</label>
                            <input type="text" /*onChange={()=>{fresh()}}*/ class="form-control" id="username" placeholder="Enter username" name="username" />
                        </div>
                        <div class="mb-3">
                            <label for="email">Email:</label>
                            <input type="email" /*onChange={()=>{fresh()}}*/ class="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="pwd">Password:</label>
                            <input type="password" /*onChange={()=>{fresh()}}*/ class="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Surat Keterangan Redaksi (.pdf)</label>
                            <input onChange={handleChange} class="form-control" type="file" id="formFile" accept="application/pdf" name="file"/>
                        </div>
                        <div class="mb-3 pdf-view border">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                                {pdfFile && <>
                                    <Viewer fileUrl={pdfFile} plugins={[newplugin]}/>
                                </>}
                                {!pdfFile && <>No PDF</>}
                            </Worker>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-dark me-4">Daftar</button>
                        <a href="/login" className="text-dark">Masuk</a>
                        <div class="spinner-border ms-5 d-none" id="register-loading" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}