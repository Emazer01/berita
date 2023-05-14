import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../Component/Footer"
import { Navbar } from "../Component/Navbar"
import axios from 'axios';
import placeholderImage from "../Image/placeholder-image.png"
import event from "../Image/event.jpg"

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, DefaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const Pasang = () => {
    const navigate = useNavigate()
    const [foto, setFoto] = React.useState({
        url: placeholderImage,
        file: ''
    })
    const [viewPdf, setViewPdf] = React.useState(null)
    const newplugin = defaultLayoutPlugin()
    const [profile, setProfile] = React.useState({})
    const [isLogin, setIsLogin] = React.useState(false)

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
                    } else {
                        navigate('../login')
                    }
                })
                .catch(function (error) {
                    navigate('../login')
                });
        }

        verifikasi(user, token)
    }, [])

    const handleChangeFoto = (e) => {
        let selectedFile = e.target.files[0]
        console.log(selectedFile.size)
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
    const handleChangePdf = (e) => {
        document.getElementById("pdf-viewer").classList.remove("d-none")
        let selectedFile = e.target.files[0]
        console.log(selectedFile.size)
        if (selectedFile) {
            if (selectedFile) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setViewPdf(e.target.result)
                }
            }
            else {
                setViewPdf(null)
            }
        }
        else {
            console.log("Select File")
        }
    }

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const profile_id = Number(localStorage.getItem('profile_id'))
        const judul = data.get('judul')
        const nama = data.get('nama')
        const deskripsi = data.get('deskripsi')
        let lelang = data.get('lelang')
        if (lelang == null) {
            lelang = 2
        }
        const date = new Date()
        const harga = data.get('harga')
        const note = data.get('note')
        const kategori = Number(data.get('kategori'))
        const fotoUrl = foto.url
        const file = viewPdf
        console.log(foto.file.size)
        console.log(judul, nama, lelang, deskripsi, harga, kategori, note,date)
        if (foto.file.size > 1200000) {
            document.getElementById('submitBeritaAlert').classList.remove('opacity-0')
            document.getElementById('submitBerita-loading').classList.add('d-none')
            document.getElementById('submitBerita-fail').classList.remove('d-none');
            await sleep(2000);
            document.getElementById('submitBerita-fail').classList.add('d-none')
            document.getElementById("submitBerita-loading").classList.remove('d-none')
            document.getElementById('submitBeritaAlert').classList.add('opacity-0')
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitberita`, {
                token: token,
                id: id,
                profile_id: profile_id,
                judul: judul,
                nama: nama,
                deskripsi: deskripsi,
                lelang: lelang,
                harga: harga,
                date:date,
                kategori: kategori,
                note: note,
                fotoUrl: fotoUrl,
                file: file
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('submitBeritaAlert').classList.remove('opacity-0')
                        document.getElementById('submitBerita-loading').classList.add('d-none')
                        document.getElementById('submitBerita-success').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('submitBerita-success').classList.add('d-none');
                        document.getElementById("submitBerita-loading").classList.remove('d-none')
                        document.getElementById('submitBeritaAlert').classList.add('opacity-0')
                        navigate('../profil')
                    } else {
                        document.getElementById('submitBeritaAlert').classList.remove('opacity-0')
                        document.getElementById('submitBerita-loading').classList.add('d-none')
                        document.getElementById('submitBerita-fail').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('submitBerita-fail').classList.add('d-none')
                        document.getElementById("submitBerita-loading").classList.remove('d-none')
                        document.getElementById('submitBeritaAlert').classList.add('opacity-0')
                    }
                })
                .catch(async function (error) {
                    document.getElementById('submitBeritaAlert').classList.remove('opacity-0')
                    document.getElementById('submitBerita-loading').classList.add('d-none')
                    document.getElementById('submitBerita-fail').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('submitBerita-fail').classList.add('d-none')
                    document.getElementById("submitBerita-loading").classList.remove('d-none')
                    document.getElementById('submitBeritaAlert').classList.add('opacity-0')
                });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="bg-biru sampul"></div>
            <form onSubmit={handleSubmit}>
                <div className='row mb-5' id=''>
                    <div className="col"></div>
                    {/*ATTRIBUT SIDE*/}
                    <div className='col-12 col-md-4'>
                        <div className='bg-white shadow mt-minus-150-px p-0 text-center'>
                            <div className='text-center'>
                                <img src={foto.url} alt='News Picture' className="img-fluid" />
                            </div>
                            <div className='my-3 px-5'>
                                <label for="formFile" class="font-nunito fw-bold">
                                    Pilih foto<br />
                                    <small className='text-muted'>max 1 MB</small>
                                </label>
                                <div className="px-5">
                                    <input onChange={handleChangeFoto} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" type="file" accept="image/*" id="formFile" name='foto' />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="pb-3 px-3">
                                <table className="w-100">
                                    <tr>
                                        <th className="text-start font-nunito col-3">Lelang</th>
                                        <td className="text-end p-2">
                                            <div class="form-check form-switch fs-3">
                                                <input class="form-check-input border border-tertiary border-2 shadow-sm" type="checkbox" role="switch" id="lelang" value='1' name="lelang" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-nunito col-3">Harga</th>
                                        <td className="text-end p-2">
                                            <div className='input-group rounded-3 border border-tertiary border-1 shadow-sm'>
                                                <span class="input-group-text text-muted" id="basic-addon1">Rp</span>
                                                <input type="number" class="form-control p-1" id="harga" placeholder="Harga" name="harga" aria-describedby="basic-addon1" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-nunito col-3">Kategori</th>
                                        <td className="text-end p-2">
                                            <select class="form-select" aria-label="Default select example" name='kategori'>
                                                <option value="1">Olahraga</option>
                                                <option value="2">Politik</option>
                                                <option value="3">Sains & Teknologi</option>
                                                <option value="4">Budaya</option>
                                                <option value="5">Bisnis dan Financial</option>
                                                <option value="6">Fashion & Beauty</option>
                                                <option value="7">Kesehatan</option>
                                                <option value="8" selected>Lainnya</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-nunito col-3">Note</th>
                                        <td className="text-end p-2">
                                            <textarea class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="note" rows="2" placeholder='Note' name='note' ></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-nunito col-3">File (.pdf)</th>
                                        <td className="text-end p-2">
                                            <input onChange={handleChangePdf} class="form-control rounded-3 border border-tertiary border-2 shadow-sm" type="file" accept="application/pdf" id="formFile" name='file' />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/*MAIN SIDE*/}
                    <div className='col-12 col-md-6 p-3'>
                        <div className="px-3">
                            <div class="my-3">
                                <label for="judul" className="font-nunito fw-bold fs-5">Judul</label>
                                <input type="text" class="form-control rounded-0 border-0 border-bottom border-3 fs-4 fw-semibold" id="judul" placeholder="" name="judul" />
                            </div>
                            <div class="my-3">
                                <label for="nama" className="font-nunito fw-bold">Nama</label>
                                <input type="text" class="form-control rounded-0 border-0 border-bottom border-3" id="nama" placeholder="" name="nama" />
                            </div>
                            <div class="my-3">
                                <label for="deskripsi" class="font-nunito fw-bold">Deskripsi</label>
                                <textarea class="form-control rounded-0 border-0 border-bottom border-3" id="deskripsi" rows="5" placeholder='' name='deskripsi' ></textarea>
                            </div>
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
                        <div className='mx-5 px-5 py-2' id='pasang'>
                            <div className='opacity-0' id='submitBeritaAlert'>
                                <div className='text-center my-2'>
                                    <div class="spinner-border text-dark ms-auto" role="status" id="submitBerita-loading">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="alert alert-danger p-2 rounded-3 my-2 d-none" role="alert" id="submitBerita-fail">
                                    <small><strong>Gagal Upload Berita! </strong></small>
                                </div>
                                <div class="alert alert-success p-2 rounded-3 my-2 d-none" role="alert" id="submitBerita-success">
                                    <small><strong>Berhasil Upload Berita! </strong></small>
                                </div>
                            </div>
                            <button type="submit" className='w-100 btn btn-biru rounded-3'>Pasang</button>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </form>
            <Footer />
        </div>
    )
}