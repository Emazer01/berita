import * as React from 'react';
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import axios from 'axios';
import { Buffer } from "buffer";
import { useNavigate } from 'react-router-dom';
import sampul2 from "../Image/sampul2.jpg"
import sampul3 from "../Image/sampul3.jpg"
import profil from "../Image/profil.jpg"
import { Footer } from '../Component/Footer';
import { useState } from "react";

export const Profile = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const [isLogin, setIsLogin] = React.useState(false)
    const [foto, setFoto] = React.useState('')

    const [user, setUser] = React.useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('user'),
        email: localStorage.getItem('email')
    })
    const [profile, setProfile] = React.useState({})

    React.useEffect(() => {
        // 1. Ambil data user dari localstorage
        const user = localStorage.getItem('user');
        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        // 2. buat fungsi verifikasi token yang sama seperti di halaman home
        function verifikasi(user, token) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
                token: token
            })
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data.profile)
                        setIsLogin(true)
                        setProfile({
                            namaLengkap: response.data.profile.nama_lengkap,
                            noHp: response.data.profile.no_hp,
                            foto: response.data.profile.foto,
                            suratRedaksi: response.data.profile.surat_redaksi_id,
                            level: response.data.profile.level_label,
                            bio: response.data.profile.bio
                        })
                        setFoto(response.data.profile.foto)
                    } else {
                        navigate('../login')
                    }
                })
                .catch(function (error) {
                    navigate('../login')
                });
        }
        // panggil fungsi verifikasi token di bawah sini
        verifikasi(user, token)
        // 3. Lakukan setUser dengan data user yang didapat dari localstorage
        //setUser({
        //    id: id,
        //    username: user,
        //    email: email
        //})
    }, [])

/*
    const handleChange = async (event) => {
        event.preventDefault();
        console.log("masuk handlechange")
        const data = new FormData(event.currentTarget);
        const file = data.get('foto')
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var Base64 = reader.result;
            setFoto(Base64);
            //console.log(Base64);
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
        console.log(file)
        console.log(foto)
    }
*/
    const handleChange = async (event) => {
        console.log('masuk')
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const file = data.get('foto')
        console.log(file)
    }

    const toLanding = () => {
        document.getElementById('landing-profile').classList.remove("d-none")
        document.getElementById('editProfile').classList.add("d-none")
    }
    const toProfile = () => {
        document.getElementById('landing-profile').classList.add("d-none")
        document.getElementById('editProfile').classList.remove("d-none")
        var a = Buffer.from(profile.foto, 'base64')
        var s = a.toJSON()
        console.log(s)
    }
    const toRedaksi = () => {
        document.getElementById("btn-listing").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-redaksi").classList.add("sideActive", "bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.remove("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toPassword = () => {
        document.getElementById("btn-listing").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-password").classList.add("sideActive", "bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.remove("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toDompet = () => {
        document.getElementById("btn-listing").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive", "bg-body-secondary")
        document.getElementById("btn-dompet").classList.add("sideActive", "bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.remove("d-none")
    }

    console.log(profile.namaLengkap)
    return (
        <div className='bg-f5'>
            <Navbar />
            <div className="bg-biru sampul"></div>
            <div className='row mb-5' id='landing-profile'>
                <div className="col"></div>
                <div className='col-12 col-md-3 mb-3'>
                    <div className='bg-white shadow mt-minus-150-px p-0 text-center'>
                        <div className='text-center m-3 p-3'>
                            <img src={profile.foto} className="rounded-circle profil" />
                        </div>
                        <h3 className='font-nunito fw-bold text-center m-2'>{profile.namaLengkap}</h3>
                        <h5>@{user.name}</h5>
                        <p className='text-muted text-center m-3 mx-4'><small>{profile.bio}</small></p>
                        <button onClick={() => { toProfile() }} className='btn btn-dark rounded-pill my-2 w-50'><i class="bi bi-pencil-fill"></i>&nbsp;&nbsp;&nbsp;Edit Profile</button><br />
                        <button onClick={() => { logout() }} className='btn btn-outline-danger rounded-pill w-50 mb-3'>Keluar</button>
                        <hr />
                        <div className='d-flex justify-content-center p-3'>
                            <div className='row w-100'>
                                <p className='col-6 text-start p-0'><strong>Status</strong></p>
                                <p className='col-6 text-end'><button className='btn btn-biru rounded-pill p-0 px-3'><small>{profile.level}</small></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-7 p-1 ps-4'>
                    <div className='text-center text-md-start d-flex'>
                        <button className='btn border-0 fw-semibold'>Postingan</button>
                        <button className='btn border-0 text-muted'>Insight</button>
                    </div>
                    <hr className='my-2' />
                    <div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={sampul2} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={sampul2} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={sampul2} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className='row mb-5 mt-minus-150-px d-none' id='editProfile'>
                <div className="col"></div>
                <div className='col-10 shadow py-4 bg-white'>
                    <button onClick={() => { toLanding() }} className='btn d-md-none'><i class="bi bi-arrow-left fs-4"></i></button>
                    <div className='row mt-minus-60-px'>
                        <div className='col-12 col-md-3 d-flex justify-content-between'>
                            <div>
                                <button onClick={() => { toLanding() }} className='btn d-none d-md-block'><i class="bi bi-arrow-left fs-4"></i></button>
                            </div>
                            <div className='text-center'>
                                <img src={profile.foto} className="rounded-circle profil border border-white border-5" />
                            </div>
                            <div></div>
                        </div>
                        <div className='col-12 col-md-9 d-flex align-items-center p-0'>
                            <div className='m-3 text-center text-md-start w-100'>
                                <h2 className='font-nunito fw-bold'>{profile.namaLengkap}</h2>
                                <p>@{user.name}</p>
                                <p><button className='btn btn-biru rounded-pill p-0 px-4'><small>{profile.level}</small></button></p>
                            </div>
                        </div>
                    </div>
                    <div className='mx-md-5 mt-4'>
                        <div className='text-center text-md-start d-flex'>
                            <button className='btn fw-semibold'>Data Diri</button>
                            <button className='btn text-muted'>Password</button>
                        </div>
                        <div className='row m-2 mt-4'>
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Akun</h5>
                                <form className="dark mb-5">
                                    <div>
                                        <label for="username" className="font-nunito fw-bold">Username</label>
                                        <input type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="username" placeholder="Enter Username" name="username" defaultValue={user.name} />
                                    </div>
                                    <div class="my-3">
                                        <label for="email" className="font-nunito fw-bold">Email</label>
                                        <input type="email" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="email" placeholder="Enter email" name="email" defaultValue={user.email} />
                                    </div>
                                    <div class="my-3">
                                        <label for="pwd" className="font-nunito fw-bold">Password</label><br />
                                        ************&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={() => { toPassword() }} class="btn">Change Password</button>
                                    </div>
                                    <button type="submit" class="btn btn-biru my-3 rounded-3 shadow">Simpan</button>
                                </form>
                            </div>
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Profil</h5>
                                <form className="dark my-4">
                                    <div className='row'>
                                        <img src={foto} className='col-6' />
                                        <div className='col-6 my-3'>
                                            <label for="formFile" class="font-nunito fw-bold">Pilih foto</label>
                                            <input onChange={()=>{handleChange()}} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" type="file" accept="image/*" id="formFile" name='foto'/>
                                            <button type="submit" class="btn btn-biru my-3 rounded-3 shadow">Simpan</button>
                                        </div>
                                    </div>
                                </form>
                                <form className="dark mb-5">
                                    <div>
                                        <label for="username" className="font-nunito fw-bold">Nama Lengkap</label>
                                        <input type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="namalengkap" placeholder="Nama Lengkap" name="namalengkap" defaultValue={profile.namaLengkap} />
                                    </div>
                                    <div class="my-3">
                                        <label for="email" className="font-nunito fw-bold">No Telepon</label>
                                        <input type="email" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="notelepon" placeholder="No Telepon" name="notelepon" defaultValue={profile.noHp} />
                                    </div>
                                    <div class="my-3">
                                        <label for="Bio" class="font-nunito fw-bold">Bio</label>
                                        <textarea class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="bio" rows="3" placeholder='Bio' name='bio' defaultValue={profile.bio} ></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-biru my-3 rounded-3 shadow">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}