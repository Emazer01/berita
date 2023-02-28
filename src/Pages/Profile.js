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

export const Profile = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const [isLogin, setIsLogin] = React.useState(false)

    const [user, setUser] = React.useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('user'),
        email: localStorage.getItem('email')
    })

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
                    if (response.status == 200 && id == response.data.id) {
                        if (response.data.priv == 1) {
                            document.getElementById('btn-admin').classList.remove('d-none')
                        }
                        setIsLogin(true)
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
        setUser({
            id: id,
            username: user,
            email: email
        })
    }, [])

    const toListing = () => {
        document.getElementById("btn-listing").classList.add("sideActive","bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("tab-listing").classList.remove("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toProfile = () => {
        document.getElementById("btn-listing").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-profile").classList.add("sideActive","bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.remove("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toRedaksi = () => {
        document.getElementById("btn-listing").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-redaksi").classList.add("sideActive","bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.remove("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toPassword = () => {
        document.getElementById("btn-listing").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-password").classList.add("sideActive","bg-body-secondary")
        document.getElementById("btn-dompet").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.remove("d-none")
        document.getElementById("tab-dompet").classList.add("d-none")
    }
    const toDompet = () => {
        document.getElementById("btn-listing").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-profile").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-redaksi").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-password").classList.remove("sideActive","bg-body-secondary")
        document.getElementById("btn-dompet").classList.add("sideActive","bg-body-secondary")
        document.getElementById("tab-listing").classList.add("d-none")
        document.getElementById("tab-profile").classList.add("d-none")
        document.getElementById("tab-redaksi").classList.add("d-none")
        document.getElementById("tab-password").classList.add("d-none")
        document.getElementById("tab-dompet").classList.remove("d-none")
    }

    return (
        <div>
            <Tagline />
            <Navbar />
            <div className="row mx-2 mx-lg-5">
                <div className="col"></div>
                <img src={sampul2} alt="Los Angeles" class="col-12 col-md-10 d-md-none" />
                <img src={sampul3} alt="Los Angeles" class="col-12 col-md-10 d-none d-md-block" />
                <div className="col"></div>
            </div>
            <div className='row mx-2 mx-lg-5 sampul-profil'>
                <div className='col'></div>
                <div className='col-12 col-md-9 row'>
                    <img src={profil} alt="Los Angeles" class="profil col-1 rounded-circle object-fit-cover" />
                    <h1 className='col p-2'>{user.username}</h1>
                </div>
                <div className='col'></div>
            </div>
            <div className="row mx-2 mx-lg-5">
                <div className="col"></div>
                <div className="col-12 col-md-2 mt-5">
                    <button onClick={() => { toListing() }} className='btn cari sideActive bg-body-secondary w-100 text-start' id='btn-listing'><i class="bi bi-file-earmark-text-fill"></i><span className='ms-2'>Listing</span></button>
                    <button onClick={() => { toProfile() }} className='btn cari w-100 text-start' id='btn-profile'><i class="bi bi-person-fill"></i><span className='ms-2'>Profil</span></button>
                    <button onClick={() => { toRedaksi() }} className='btn cari w-100 text-start' id='btn-redaksi'><i class="bi bi-file-earmark-person-fill"></i><span className='ms-2'>Redaksi</span></button><br></br>
                    <button onClick={() => { toPassword() }} className='btn cari w-100 text-start' id='btn-password'><i class="bi bi-lock-fill"></i><span className='ms-2'>Password</span></button><br></br>
                    <button onClick={() => { toDompet() }} className='btn cari w-100 text-start' id='btn-dompet'><i class="bi bi-wallet-fill"></i><span className='ms-2'>Dompet</span></button><br></br>
                    <button onClick={() => { logout() }} className='btn cari w-100 text-start' id='btn-logout'><i class="bi bi-box-arrow-left"></i><span className='ms-2'>Logout</span></button><br></br>
                </div>
                <div className="col-12 col-md-8 border border-2 mt-5 p-4" id='tab-listing'>
                    <h2>Listing</h2>
                </div>
                <div className="col-12 col-md-8 border border-2 mt-5 p-4 d-none" id='tab-profile'>
                    <h2>Profil</h2>
                    <form /*onSubmit={handleSubmit}*/ className="dark mb-3">
                        <table className='container m-auto mt-2' id='profileForm'>
                            <tr>
                                <th className='col-md-3 py-3'>Username</th>
                                <td><input type="text" /*onChange={() => { removeSubmitDisabled() }}*/ class="form-control" id="username" placeholder="Enter username" name="username" defaultValue={user.username} /></td>
                            </tr>
                            <tr>
                                <th className="py-3">Email</th>
                                <td><input type="email" /*onChange={() => { removeSubmitDisabled() }}*/ class="form-control" id="email" placeholder="Enter email" name="email" defaultValue={user.email} /></td>
                            </tr>
                            <tr>
                                <th className="py-3">Password</th>
                                <td>************&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={() => { toPassword() }} class="btn btn-dark">Change Password</button></td>
                            </tr>
                        </table>
                        <tr>
                            <th className="py-3">
                                <button type="submit" class="btn btn-dark disabled" id='submitChanges'>Save Changes</button>
                            </th>
                            <td>
                                <div class="spinner-border d-none" role="status" id='loadingUpdate'>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class='alert alert-danger d-none' id='alertsalah'>
                                    <strong>Can't Update!</strong> Profile doesn't change.
                                </div>
                                <div class='alert alert-success d-none' id='alertsukses'>
                                    <strong>Success!</strong> Profile has been change.
                                </div>
                            </td>
                        </tr>
                    </form>
                </div>
                <div className="col-12 col-md-8 border border-2 mt-5 p-4 d-none" id='tab-redaksi'>
                    <h2>Redaksi</h2>
                </div>
                <div className="col-12 col-md-8 border border-2 mt-5 p-4 d-none" id='tab-password'>
                    <h2>Password</h2>
                </div>
                <div className="col-12 col-md-8 border border-2 mt-5 p-4 d-none" id='tab-dompet'>
                    <h2>Dompet</h2>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}