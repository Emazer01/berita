import * as React from 'react';
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';
import sampul2 from "../Image/sampul2.jpg"
import sampul3 from "../Image/sampul3.jpg"
import profil from "../Image/profil.jpg"
import { Footer } from '../Component/Footer';
import { useState } from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, DefaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const Profile = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const [isLogin, setIsLogin] = React.useState(false)
    const [foto, setFoto] = React.useState({})
    const [viewPdf, setViewPdf] = React.useState()
    const newplugin = defaultLayoutPlugin()
    const [user, setUser] = React.useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('user'),
        email: localStorage.getItem('email')
    })
    const [profile, setProfile] = React.useState({})
    const [beritaState, setBeritaState] = React.useState()

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
                        localStorage.setItem('profile_id', response.data.profile.profile_id)
                        setIsLogin(true)
                        setProfile({
                            profilId: response.data.profile.profile_id,
                            namaLengkap: response.data.profile.nama_lengkap,
                            noHp: response.data.profile.no_hp,
                            foto: response.data.profile.foto,
                            suratRedaksi: response.data.profile.surat_redaksi_id,
                            level: response.data.profile.level_label,
                            bio: response.data.profile.bio
                        })
                        setFoto({
                            url: response.data.profile.foto,
                            file: {}
                        })
                    } else {
                        navigate('../login')
                    }
                })
                .catch(function (error) {
                    navigate('../login')
                });
        }

        verifikasi(user, token)
        const profile_id = localStorage.getItem('profile_id');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/beritas`, {
            token: token,
            profile_id: profile_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const daftar_berita = response.data
                    console.log(daftar_berita)
                    setBeritaState(daftar_berita)
                    var list = ''
                    for (let index = 0; index < daftar_berita.length; index++) {
                        list +=
                            `<div class="card my-3 rounded-0 border-0 shadow">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src=${daftar_berita[(daftar_berita.length - 1) - index].image} class="h-100 img-fluid object-fit-cover" alt="..." />
                                    </div>
                                    <div class="col-md-8 d-flex flex-column">
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title">${daftar_berita[(daftar_berita.length - 1) - index].judul}</h5>
                                            <p class="card-text m-0 fs-6">${daftar_berita[(daftar_berita.length - 1) - index].deskripsi.substring(0, 200)}...</p>
                                            <p class="card-text m-0 mt-auto"><small class="text-muted">${daftar_berita[(daftar_berita.length - 1) - index].tanggal.substring(0, 10)}</small></p>
                                        </div>
                                        <div class="border-top d-flex">
                                            <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                            <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                            <a href="/view/?id=${daftar_berita[(daftar_berita.length - 1) - index].berita_id}" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    }
                    if (daftar_berita.length < 1) {
                        list += `<p class='text-muted'>Belum ada Postingan</p>`
                    }
                    document.getElementById("list-posting").innerHTML = list
                } else {
                    console.log('Tidak berhasil mengambil postingan')
                    return
                }
            })
            .catch(async function (error) {
                console.log(error)
                return
            });
    }, [])

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("updateProfile-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const namalengkap = data.get('namalengkap')
        const notelepon = data.get('notelepon')
        const bio = data.get('bio')
        const fotoUrl = foto.url
        if (foto.file.size > 75000) {
            document.getElementById('updateProfile-loading').classList.add('d-none')
            document.getElementById('updateProfile-fail').classList.remove('d-none');
            await sleep(2000);
            document.getElementById('updateProfile-fail').classList.add('d-none')
            document.getElementById("simpan-profil").classList.add('disabled')
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateprofile`, {
                token: token,
                id: id,
                namaLengkap: namalengkap,
                noTelepon: notelepon,
                bio: bio,
                fotoUrl: fotoUrl
            })
                .then(async function (response) {
                    if (response.status == 200) {
                        document.getElementById('updateProfile-loading').classList.add('d-none')
                        document.getElementById('updateProfile-success').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('updateProfile-success').classList.add('d-none')
                        document.getElementById("simpan-profil").classList.add('disabled')
                        window.location.reload()
                    } else {
                        document.getElementById('updateProfile-loading').classList.add('d-none')
                        document.getElementById('updateProfile-fail').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('updateProfile-fail').classList.add('d-none')
                        document.getElementById("simpan-profil").classList.add('disabled')
                    }
                })
                .catch(async function (error) {
                    document.getElementById('updateProfile-loading').classList.add('d-none')
                    document.getElementById('updateProfile-fail').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('updateProfile-fail').classList.add('d-none')
                    document.getElementById("simpan-profil").classList.add('disabled')
                });
        }
    }

    const handleSubmitAkun = async (event) => {
        event.preventDefault();
        document.getElementById("updateAkun-loading").classList.remove('d-none')
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const data = new FormData(event.currentTarget);
        const username = data.get('username')
        const email = data.get('email')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateakun`, {
            token: token,
            id: id,
            user: username,
            email: email
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('updateAkun-loading').classList.add('d-none')
                    document.getElementById('updateAkun-success').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('updateAkun-success').classList.add('d-none')
                    document.getElementById("simpan-akun").classList.add('disabled')
                    window.location.reload()
                    localStorage.setItem('user', username)
                    localStorage.setItem('email', email)
                } else {
                    document.getElementById('updateAkun-loading').classList.add('d-none')
                    document.getElementById('updateAkun-fail').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('updateAkun-fail').classList.add('d-none')
                    document.getElementById("simpan-akun").classList.add('disabled')
                }
            })
            .catch(async function (error) {
                document.getElementById('updateAkun-loading').classList.add('d-none')
                document.getElementById('updateAkun-fail').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('updateAkun-fail').classList.add('d-none')
                document.getElementById("simpan-akun").classList.add('disabled')
            });

    }

    const handleChangeAkun = (e) => {
        document.getElementById('simpan-akun').classList.remove('disabled')
    }

    const handleChange = (e) => {
        document.getElementById('simpan-profil').classList.remove('disabled')
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setFoto({
                        url: e.target.result,
                        file: selectedFile
                    })
                }
            }
            else {
                setFoto(null)
            }
        }
        else {
            console.log("Select File")
        }
    }

    const toLanding = () => {
        document.getElementById('landing-profile').classList.remove("d-none")
        document.getElementById('editProfile').classList.add("d-none")
    }
    const toProfile = () => {
        document.getElementById('landing-profile').classList.add("d-none")
        document.getElementById('editProfile').classList.remove("d-none")
        document.getElementById('dataDiri-page').classList.remove("d-none")
        document.getElementById('password-page').classList.add("d-none")
        document.getElementById('redaksi-page').classList.add("d-none")
        document.getElementById('dataDiri-btn').classList.add("fw-semibold")
        document.getElementById('password-btn').classList.add("text-muted")
        document.getElementById('dataDiri-btn').classList.remove("text-muted")
        document.getElementById('password-btn').classList.remove("fw-semibold")
        document.getElementById('redaksi-btn').classList.remove("fw-semibold")
        document.getElementById('redaksi-btn').classList.add("text-muted")
    }
    const toPassword = () => {
        document.getElementById('dataDiri-page').classList.add("d-none")
        document.getElementById('password-page').classList.remove("d-none")
        document.getElementById('redaksi-page').classList.add("d-none")
        document.getElementById('dataDiri-btn').classList.remove("fw-semibold")
        document.getElementById('password-btn').classList.remove("text-muted")
        document.getElementById('dataDiri-btn').classList.add("text-muted")
        document.getElementById('password-btn').classList.add("fw-semibold")
        document.getElementById('redaksi-btn').classList.remove("fw-semibold")
        document.getElementById('redaksi-btn').classList.add("text-muted")
    }
    const toRedaksi = () => {
        document.getElementById('dataDiri-page').classList.add("d-none")
        document.getElementById('password-page').classList.add("d-none")
        document.getElementById('redaksi-page').classList.remove("d-none")
        document.getElementById('dataDiri-btn').classList.remove("fw-semibold")
        document.getElementById('dataDiri-btn').classList.add("text-muted")
        document.getElementById('password-btn').classList.remove("fw-semibold")
        document.getElementById('password-btn').classList.add("text-muted")
        document.getElementById('redaksi-btn').classList.add("fw-semibold")
        document.getElementById('redaksi-btn').classList.remove("text-muted")
    }

    return (
        <div className='bg-f5'>
            <Navbar />
            <div className="bg-biru sampul"></div>
            {/* LANDING PROFILE */}
            <div className='row mb-5' id='landing-profile'>
                <div className="col"></div>
                {/* SIDE PROFILE */}
                <div className='col-12 col-md-3 mb-3'>
                    <div className='bg-white shadow mt-minus-150-px p-0 text-center'>
                        <div className='text-center m-3 p-3'>
                            <img src={profile.foto} className="rounded-circle profil object-fit-cover" />
                        </div>
                        <h3 className='font-nunito fw-bold text-center mx-3'>{profile.namaLengkap}</h3>
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
                {/* POSTINGAN */}
                <div className='col-12 col-md-7'>
                    <div className='text-center text-md-start d-flex py-1'>
                        <button className='btn fw-semibold'>Postingan</button>
                        <button className='btn text-muted'>Insight</button>
                    </div>
                    <hr className='my-2' />
                    <div id='list-posting'>

                    </div>
                </div>
                <div className="col"></div>
            </div>
            {/* EDIT PROFILE */}
            <div className='row mb-5 mt-minus-150-px d-none' id='editProfile'>
                <div className="col"></div>
                <div className='col-10 shadow py-4 bg-white'>
                    <button onClick={() => { toLanding() }} className='btn d-md-none'><i class="bi bi-arrow-left fs-4"></i></button>
                    {/* HEAD EDIT PROFILE */}
                    <div className='row mt-minus-60-px' id='divhead'>
                        <div className='col-12 col-md-3 d-flex justify-content-between'>
                            <div>
                                <button onClick={() => { toLanding() }} className='btn d-none d-md-block'><i class="bi bi-arrow-left fs-4"></i></button>
                            </div>
                            <div className='text-center'>
                                <img src={profile.foto} className="rounded-circle profil object-fit-cover border border-white border-5" />
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
                            <button onClick={toProfile} className='btn fw-semibold' id='dataDiri-btn'>Data Diri</button>
                            <button onClick={toPassword} className='btn text-muted' id='password-btn'>Password</button>
                            <button onClick={toRedaksi} className='btn text-muted' id='redaksi-btn'>Redaksi</button>
                        </div>
                        {/* DATA DIRI PAGE */}
                        <div className='row m-2 mt-4' id='dataDiri-page'>
                            {/* UPDATE PROFILE */}
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Profil</h5>
                                <form onSubmit={handleSubmit} className="dark mb-5">
                                    <div className='row my-4'>
                                        <div className='col-6'>
                                            <img src={foto.url} className='w-100 aspect-ratio-1 rounded-circle object-fit-cover' />
                                        </div>
                                        <div className='col-6 my-3'>
                                            <label for="formFile" class="font-nunito fw-bold">
                                                Pilih foto<br />
                                                <small className='text-muted'>max 70 KB</small>
                                            </label>
                                            <input onChange={handleChange} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" type="file" accept="image/*" id="formFile" name='foto' />
                                        </div>
                                    </div>
                                    <div id='divnama'>
                                        <label for="namalengkap" className="font-nunito fw-bold">Nama Lengkap</label>
                                        <input onChange={handleChange} type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="namalengkap" placeholder="Nama Lengkap" name="namalengkap" defaultValue={profile.namaLengkap} />
                                    </div>
                                    <div class="my-3">
                                        <label for="notelepon" className="font-nunito fw-bold">No Telepon</label>
                                        <input onChange={handleChange} type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="notelepon" placeholder="No Telepon" name="notelepon" defaultValue={profile.noHp} />
                                    </div>
                                    <div class="my-3">
                                        <label for="Bio" class="font-nunito fw-bold">Bio</label>
                                        <textarea onChange={handleChange} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="bio" rows="3" placeholder='Bio' name='bio' defaultValue={profile.bio} ></textarea>
                                    </div>
                                    <div>
                                        <div className='d-flex'>
                                            <button type="submit" class="btn btn-biru my-3 rounded-3 shadow disabled" id='simpan-profil'>Simpan</button>
                                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="updateProfile-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 mb-1 d-none" role="alert" id="updateProfile-fail">
                                            <small><strong>Gagal Memperbarui! </strong><span id='pesanGagal'>Data tidak valid</span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 mb-1 d-none" role="alert" id="updateProfile-success">
                                            <small><strong>Berhasil Memperbarui! </strong></small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* UPDATE AKUN */}
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Akun</h5>
                                <form onSubmit={handleSubmitAkun} className="dark mb-5">
                                    <div>
                                        <label for="username" className="font-nunito fw-bold">Username</label>
                                        <input onChange={handleChangeAkun} type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="username" placeholder="Enter Username" name="username" defaultValue={user.name} />
                                    </div>
                                    <div class="my-3">
                                        <label for="email" className="font-nunito fw-bold">Email</label>
                                        <input onChange={handleChangeAkun} type="email" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="email" placeholder="Enter email" name="email" defaultValue={user.email} />
                                    </div>
                                    <div class="my-3">
                                        <label for="pwd" className="font-nunito fw-bold">Password</label><br />
                                        ************&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={toPassword} class="btn">Change Password</button>
                                    </div>
                                    <div>
                                        <div className='d-flex'>
                                            <button type="submit" class="btn btn-biru my-3 rounded-3 shadow disabled" id='simpan-akun'>Simpan</button>
                                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="updateAkun-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 mb-1 d-none" role="alert" id="updateAkun-fail">
                                            <small><strong>Gagal Memperbarui! </strong><span id='pesanGagal'>Data tidak valid</span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 mb-1 d-none" role="alert" id="updateAkun-success">
                                            <small><strong>Berhasil Memperbarui! </strong></small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* PASSWORD PAGE */}
                        <div className='row m-2 mt-4' id='password-page'>
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Password</h5>
                                <form onSubmit={handleSubmitAkun} className="dark mb-5">
                                    <div>
                                        <label for="oldpw" className="font-nunito fw-bold">Old Password</label>
                                        <input onChange={handleChangeAkun} type="password" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="oldpw" placeholder="Enter Old Password" name="oldpw" />
                                    </div>
                                    <div class="my-3">
                                        <label for="newpw" className="font-nunito fw-bold">New Password</label>
                                        <input onChange={handleChangeAkun} type="password" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="newpw" placeholder="Enter New Password" name="newpw" />
                                    </div>
                                    <div class="my-3">
                                        <label for="conpw" className="font-nunito fw-bold">Confirm Password</label>
                                        <input onChange={handleChangeAkun} type="password" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="conpw" placeholder="Enter Confirm Password" name="conpw" />
                                    </div>
                                    <div>
                                        <div className='d-flex'>
                                            <button type="submit" class="btn btn-biru my-3 rounded-3 shadow disabled" id='simpan-password'>Simpan</button>
                                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="updatePassword-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 mb-1 d-none" role="alert" id="updatePassword-fail">
                                            <small><strong>Gagal Memperbarui! </strong><span id='pesanGagal'>Data tidak valid</span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 mb-1 d-none" role="alert" id="updatePassword-success">
                                            <small><strong>Berhasil Memperbarui! </strong></small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='col-12 col-md-6 px-3 pe-md-5 d-flex align-items-center'>
                                <p className='text-muted'>
                                    <small>
                                        Catatan :<br />
                                        >> Terdiri dari minimal 8 karakter, lebih banyak lebih baik<br />
                                        >> Merupakan campuran dari huruf dan angka/simbol<br />
                                        >> Terdapat huruf kapital dan huruf kecil<br />
                                        <br /><br /><br /><br /><br />
                                    </small>
                                </p>
                            </div>
                        </div>
                        {/* REDAKSI PAGE */}
                        <div className='row m-2 mt-4' id='redaksi-page'>
                            <div className='col-12 col-md-6 px-3 pe-md-5'>
                                <h5 className='p-2 mb-3 fw-bold font-nunito border-bottom border-3 border-danger w-25'>Redaksi</h5>
                                <form onSubmit={handleSubmitAkun} className="dark mb-5">
                                    <div>
                                        <label for="nama-redaksi" className="font-nunito fw-bold">Nama Redaksi</label>
                                        <input onChange={handleChangeAkun} type="text" class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="nama-redaksi" placeholder="Nama Redaksi" name="nama-redaksi" />
                                    </div>
                                    <div class="my-3">
                                        <label for="file-redaksi" className="font-nunito fw-bold">File Redaksi (.pdf)</label>
                                        <input class="form-control rounded-3 border border-tertiary border-2 shadow-sm" type="file" accept="application/pdf" id="file-redaksi" name='file-redaksi' />
                                    </div>
                                    <div>
                                        <div className='d-flex'>
                                            <button type="submit" class="btn btn-biru my-3 rounded-3 shadow disabled" id='simpan-password'>Simpan</button>
                                            <div class="spinner-border text-dark ms-auto d-none" role="status" id="updatePassword-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 mb-1 d-none" role="alert" id="updatePassword-fail">
                                            <small><strong>Gagal Memperbarui! </strong><span id='pesanGagal'>Data tidak valid</span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 mb-1 d-none" role="alert" id="updatePassword-success">
                                            <small><strong>Berhasil Memperbarui! </strong></small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='col-12 col-md-6 px-3 pe-md-5 d-flex align-items-center'>
                                <div className='pdf-view d-none' id='pdf-viewer'>
                                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
                                        {viewPdf && <>
                                            <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                                        </>
                                        }
                                        {!viewPdf && <></>}
                                    </Worker>
                                </div>
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