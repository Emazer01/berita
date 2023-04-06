import { Navbar } from "../Component/Navbar"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import axios from 'axios';

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin, DefaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const View = () => {
    const [beritaState, setBeritaState] = React.useState({
        judul: '',
        nama: '',
        deskripsi: '',
        image: '',
        tanggal: '',
        file: '',
    })
    const [levelState, setLevelState] = React.useState({
        level_id: 3
    })
    const [penawaranState, setPenawaranState] = React.useState({})

    const newplugin = defaultLayoutPlugin()

    React.useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const berita_id = urlParams.get('id')
        console.log(berita_id);
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const profile_id = Number(localStorage.getItem('profile_id'))
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifwar`, {
            token: token,
            id: id,
            profile_id: profile_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const level = response.data['0']
                    console.log(level)
                    setLevelState(level)
                } else {
                    console.log('Tidak berhasil mengambil postingan')
                    return
                }
            })
            .catch(async function (error) {
                console.log(error)
                return
            });

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/view`, {
            berita_id: berita_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const daftar_berita = response.data['0']
                    console.log(daftar_berita)
                    if (daftar_berita.file) {
                        document.getElementById("pdf-viewer").classList.remove("d-none")
                    }
                    setBeritaState(daftar_berita)
                    if (daftar_berita.profile_id == profile_id) {
                        document.getElementById("pengajuan").classList.add("d-none")
                        document.getElementById("lanjutkan").innerHTML = "<a class='btn btn-biru px-5'>Lanjutkan</a>"
                    } else {
                        document.getElementById("pengajuan").classList.remove("d-none")
                    }

                } else {
                    console.log('Tidak berhasil mengambil postingan')
                    return
                }
            })
            .catch(async function (error) {
                console.log(error)
                return
            });

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/penawarans`, {
            berita_id: berita_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const daftar_penawaran = response.data
                    console.log(daftar_penawaran)
                    setPenawaranState(daftar_penawaran)
                    var list = `<table class="w-100 text-white">`
                    if (daftar_penawaran.length>0) {
                        for (const key in daftar_penawaran) {
                            list += `<tr class="border bg-biru">
                                        <th class='py-1'>${daftar_penawaran[key].profil_label}</th>
                                        <td>Rp ${daftar_penawaran[key].harga}</td>
                                    </tr>`
                        }
                    } else {
                        list += "<p>Belum ada penawaran</p>"
                    }
                    list += "</table>"
                    document.getElementById("daftar-penawaran").innerHTML = list
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

    const handleSubmitPenawaran = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');
        const profile_id = Number(localStorage.getItem('profile_id'))
        const harga = data.get('harga')
        const note = data.get('note')
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const berita_id = urlParams.get('id')
        if (levelState.level_id < 3 && profile_id != beritaState.profile_id) {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitpenawaran`, {
                token: token,
                id: id,
                user: user,
                profile_id: profile_id,
                berita_id: berita_id,
                harga: harga,
                note: note
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('submitPenawaranAlert').classList.remove('opacity-0')
                        document.getElementById('submitPenawaran-loading').classList.add('d-none')
                        document.getElementById('submitPenawaran-success').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('submitPenawaran-success').classList.add('d-none');
                        document.getElementById("submitPenawaran-loading").classList.remove('d-none')
                        document.getElementById('submitPenawaranAlert').classList.add('opacity-0')
                        window.location.reload()

                    } else {
                        document.getElementById('submitPenawaranAlert').classList.remove('opacity-0')
                        document.getElementById('submitPenawaran-loading').classList.add('d-none')
                        document.getElementById('submitPenawaran-fail').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('submitPenawaran-fail').classList.add('d-none')
                        document.getElementById("submitPenawaran-loading").classList.remove('d-none')
                        document.getElementById('submitPenawaranAlert').classList.add('opacity-0')
                    }
                })
                .catch(async function (error) {
                    document.getElementById('submitPenawaranAlert').classList.remove('opacity-0')
                    document.getElementById('submitPenawaran-loading').classList.add('d-none')
                    document.getElementById('submitPenawaran-fail').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('submitPenawaran-fail').classList.add('d-none')
                    document.getElementById("submitPenawaran-loading").classList.remove('d-none')
                    document.getElementById('submitPenawaranAlert').classList.add('opacity-0')
                });
        } else {
            console.log("Level tidak mencukupi")
            document.getElementById("pesan-gagal").innerHTML = "Belum terdaftar Wartawan"
            document.getElementById('submitPenawaranAlert').classList.remove('opacity-0')
            document.getElementById('submitPenawaran-loading').classList.add('d-none')
            document.getElementById('submitPenawaran-fail').classList.remove('d-none');
            await sleep(2000);
            document.getElementById('submitPenawaran-fail').classList.add('d-none')
            document.getElementById("submitPenawaran-loading").classList.remove('d-none')
            document.getElementById('submitPenawaranAlert').classList.add('opacity-0')
        }
    }

    return (
        <div>
            <Navbar />
            <div className="bg-biru sampul"></div>
            <div className='row mb-5' id=''>
                <div className="col"></div>
                {/*ATTRIBUT SIDE*/}
                <div className='col-12 col-md-4'>
                    <div className='bg-white shadow mt-minus-150-px p-0 text-center'>
                        <div className='text-center'>
                            <img src={beritaState.image} alt='News Picture' className="img-fluid w-100" />
                        </div>
                        <div className="pb-3 px-3 mt-3">
                            <table className="w-100">
                                <tr>
                                    <th className="text-start font-nunito col-4">Harga</th>
                                    <td className="text-start p-2 fs-5">Rp {beritaState.harga}</td>
                                </tr>
                                <tr>
                                    <th className="text-start font-nunito col-4">Status</th>
                                    <td className="text-start p-2 fs-5">{beritaState.level_label}</td>
                                </tr>
                                <tr>
                                    <th className="text-start font-nunito">Kedaluwarsa</th>
                                    <td className="text-start p-2 fs-5">{beritaState.waktu} Hari</td>
                                </tr>
                                <tr>
                                    <th className="text-start font-nunito">Kategori</th>
                                    <td className="text-start p-2 fs-5">{beritaState.kategori_label}</td>
                                </tr>
                                <tr>
                                    <th className="text-start font-nunito col-3">Note</th>
                                    <td className="text-start p-2 fs-5">{beritaState.note}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='bg-white shadow mt-4 p-2 text-center'>
                        <h5 className="font-nunito fw-semibold">Daftar Tawaran</h5>
                        <div className="p-2" id="daftar-penawaran">
                            <table className="w-100 text-white">
                                <tr className="border bg-biru">
                                    <th className=" rounded-2">Emazer02</th>
                                    <td>Rp 50000</td>
                                </tr>
                                <tr className="border bg-biru rounded-2">
                                    <th>Emazer02</th>
                                    <td>Rp 50000</td>
                                </tr>
                            </table>
                        </div>
                        <div class='p-2 w-100 text-end' id="lanjutkan"></div>
                    </div>
                    <div className='bg-white shadow mt-4 p-2 text-center' id="pengajuan">
                        <h5 className="font-nunito fw-semibold">Pengajuan Penawaran</h5>
                        <div className="p-3">
                            <form onSubmit={handleSubmitPenawaran}>
                                <table className="w-100">
                                    <tr>
                                        <th className="text-start font-nunito col-3">Harga</th>
                                        <td className="text-end p-2">
                                            <div className='input-group rounded-3 border border-tertiary border-1 shadow-sm'>
                                                <span class="input-group-text text-muted" id="basic-addon1">Rp</span>
                                                <input type="number" class="form-control p-1" id="harga" placeholder="Harga" name="harga" aria-describedby="basic-addon1" min={beritaState.harga} defaultValue={beritaState.harga} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-nunito col-3">Note</th>
                                        <td className="text-end p-2">
                                            <textarea class="form-control rounded-3 border border-tertiary border-2 shadow-sm" id="note" rows="2" placeholder='Note' name='note' ></textarea>
                                        </td>
                                    </tr>
                                </table>
                                <div className='mx-5 px-5' id='penawaran'>
                                    <div className='opacity-0' id='submitPenawaranAlert'>
                                        <div className='text-center my-2'>
                                            <div class="spinner-border text-dark ms-auto" role="status" id="submitPenawaran-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 my-2 d-none" role="alert" id="submitPenawaran-fail">
                                            <small><strong>Gagal Kirim Penawaran! </strong><br/><span id="pesan-gagal"></span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 my-2 d-none" role="alert" id="submitPenawaran-success">
                                            <small><strong>Berhasil Kirim Penawaran! </strong></small>
                                        </div>
                                    </div>
                                    <button type="submit" className='w-100 btn btn-biru rounded-3'>Ajukan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*MAIN SIDE*/}
                <div className='col-12 col-md-6 p-3'>
                    <div className="px-3">
                        <div class="my-3">
                            <label for="judul" className="font-nunito fw-bold fs-3">{beritaState.judul}</label>
                        </div>
                        <div class="my-3">
                            <label for="nama" className="font-nunito fw-bold text-muted">{beritaState.nama}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{beritaState.tanggal.substring(0, 10)}</label>
                        </div>
                        <div class="my-3">
                            <label for="deskripsi" class="font-nunito fw-bold">{beritaState.deskripsi}</label>
                        </div>
                        <div className='pdf-view d-none' id='pdf-viewer'>
                            <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
                                {beritaState.file && <>
                                    <Viewer fileUrl={beritaState.file} plugins={[newplugin]} />
                                </>
                                }
                                {!beritaState.file && <></>}
                            </Worker>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}