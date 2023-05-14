import { Navbar } from "../Component/Navbar"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import jumbo1 from "../Image/jumbo1.jpg"
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';

export const Cekout = () => {
    const navigate = useNavigate()
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

    React.useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const berita_id = urlParams.get('id')
        console.log(berita_id);
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const profile_id = Number(localStorage.getItem('profile_id'))
        function verifwar(id, profile_id, token) {
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
        }
        function view(berita_id) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/view`, {
                berita_id: berita_id
            })
                .then(async function (response) {
                    if (response.status == 200) {
                        const daftar_berita = response.data['0']
                        console.log(daftar_berita)
                        setBeritaState(daftar_berita)
                        if (daftar_berita.profile_id != profile_id) {
                            /*to permission*/
                            navigate('../permission')
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
        }
        function penawarans(berita_id) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/penawarans`, {
                berita_id: berita_id
            })
                .then(async function (response) {
                    if (response.status == 200) {
                        const daftar_penawaran = response.data
                        const calculate = () => {
                            var harga = 0
                            for (const key in daftar_penawaran) {
                                if (document.getElementById(`pen${key}`).checked == true) {
                                    harga += Number(document.getElementById(`pen${key}`).value)
                                } else {
                                    harga += 0
                                }
                            }
                            document.getElementById('total').innerHTML = harga
                        }
                        setPenawaranState(daftar_penawaran);
                        var list = `<tr>
                                        <th class="fw-semibold px-1">Pilih</th>
                                        <th class="fw-semibold px-1">Id</th>
                                        <th class="fw-semibold px-1">Nama</th>
                                        <th class="fw-semibold px-1">Harga</th>
                                        <th class="fw-semibold px-1">Deskripsi</th>
                                    </tr>`
                        if (daftar_penawaran.length > 0) {
                            for (const key in daftar_penawaran) {
                                list += `<tr>
                                            <td>
                                                <input class="form-check-input fs-4 rounded-3 border border-tertiary border-2 shadow-sm" type="checkbox" value="${daftar_penawaran[key].harga}" id="pen${key}" name="pen${key}" />
                                            </td>
                                            <td>${daftar_penawaran[key].penawaran_id}</td>
                                            <td>${daftar_penawaran[key].profil_label}</td>
                                            <td>${daftar_penawaran[key].harga}</td>
                                            <td>${daftar_penawaran[key].deskripsi}</td>
                                        </tr>`
                            }
                            list += '<br/><br/>'
                        } else {
                            list += "<p>Belum ada penawaran</p>"
                        }
                        document.getElementById("list-penawaran").innerHTML = list
                        for (const key in daftar_penawaran) {
                            document.getElementById(`pen${key}`).onchange = calculate
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
        }
        verifwar(id, profile_id, token)
        view(berita_id)
        penawarans(berita_id)
    }, [])

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const total = document.getElementById('total').innerHTML
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');
        const profile_id = Number(localStorage.getItem('profile_id'))
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const berita_id = urlParams.get('id')
        console.log(total)
        var list_pen = []
        for (const key in penawaranState) {
            if (document.getElementById(`pen${key}`).checked == true) {
                list_pen.push(penawaranState[key].penawaran_id)
            }
        }
        console.log(list_pen)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitbayar`, {
            token: token,
            id: id,
            user: user,
            profile_id: profile_id,
            berita_id: berita_id,
            harga_total: total,
            list_pen: list_pen
        })
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    document.getElementById('submitBayarAlert').classList.remove('opacity-0')
                    document.getElementById('submitBayar-loading').classList.add('d-none')
                    document.getElementById('submitBayar-success').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('submitBayar-success').classList.add('d-none');
                    document.getElementById("submitBayar-loading").classList.remove('d-none')
                    document.getElementById('submitBayarAlert').classList.add('opacity-0')
                    navigate('../bayar')

                } else {
                    document.getElementById('submitBayarAlert').classList.remove('opacity-0')
                    document.getElementById('submitBayar-loading').classList.add('d-none')
                    document.getElementById('submitBayar-fail').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('submitBayar-fail').classList.add('d-none')
                    document.getElementById("submitBayar-loading").classList.remove('d-none')
                    document.getElementById('submitBayarAlert').classList.add('opacity-0')
                }
            })
            .catch(async function (error) {
                document.getElementById('submitBayarAlert').classList.remove('opacity-0')
                document.getElementById('submitBayar-loading').classList.add('d-none')
                document.getElementById('submitBayar-fail').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('submitBayar-fail').classList.add('d-none')
                document.getElementById("submitBayar-loading").classList.remove('d-none')
                document.getElementById('submitBayarAlert').classList.add('opacity-0')
            });
    }

    return (
        <div>
            <Navbar />
            <div className="bg-biru sampul"></div>
            <div className='row mb-5' id='landing-profile'>
                <div className="col"></div>
                {/* SIDE PROFILE */}
                <div className='col-12 col-md-3 mb-3'>
                    <div className='bg-white shadow mt-minus-150-px p-0 text-center mx-3'>
                        <div class="card rounded-0 border-0 p-0 shadow">
                            <img src={beritaState.image} class="card-img-top rounded-0" alt="..." />
                            <div class="card-body d-flex flex-column p-0">
                                <div className="p-3">
                                    <h5 class="card-title">{beritaState.judul}</h5>
                                    <p class="card-text">{beritaState.deskripsi.substring(0, 200)}</p>
                                    <p class="card-text"><small class="text-muted">{beritaState.tanggal.substring(0, 10)} | </small><small className="text-muted">{beritaState.nama}</small></p>
                                </div>
                                <div className="mt-auto border-top d-flex">
                                    <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i> Rp <span>{beritaState.harga}</span></span>
                                    <span className="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><span>1</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* POSTINGAN */}
                <div className='col-12 col-md-7'>
                    <div className='text-center text-md-start d-flex py-1'>
                        <button className='btn fw-semibold'>Penawaran</button>
                    </div>
                    <hr className='my-2' />
                    <div className="p-2 row">
                        <div className="col-12 col-md-8">
                            <form>
                                <table className="w-100 border-2 border-end text-center" id="list-penawaran">
                                    <tr>
                                        <th className="fw-semibold px-1">Pilih</th>
                                        <th className="fw-semibold px-1">Id</th>
                                        <th className="fw-semibold px-1">Nama</th>
                                        <th className="fw-semibold px-1">Harga</th>
                                        <th className="fw-semibold px-1">Deskripsi</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input class="form-check-input fs-4 rounded-3 border border-tertiary border-2 shadow-sm" type="checkbox" value="" id="" name="" />
                                        </td>
                                        <td>
                                            2
                                        </td>
                                        <td>
                                            emazer02
                                        </td>
                                        <td>
                                            50000
                                        </td>
                                        <td>
                                            gass
                                        </td>
                                    </tr>
                                    <br /><br />
                                </table>
                            </form>
                        </div>
                        <div className="col-12 col-md-4 text-center">
                            <form onSubmit={handleSubmit}>
                                <h4>Total</h4>
                                <h5>Rp <span id="total">0</span></h5>
                                <div className='px-5' id='bayar'>
                                    <div className='opacity-0' id='submitBayarAlert'>
                                        <div className='text-center my-2'>
                                            <div class="spinner-border text-dark ms-auto" role="status" id="submitBayar-loading">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="alert alert-danger p-2 rounded-3 my-2 d-none" role="alert" id="submitBayar-fail">
                                            <small><strong>Gagal Proses! </strong><br /><span id="pesan-gagal"></span></small>
                                        </div>
                                        <div class="alert alert-success p-2 rounded-3 my-2 d-none" role="alert" id="submitBayar-success">
                                            <small><strong>Berhasil! </strong></small>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-5">
                                    <button type="submit" class="btn btn-biru my-3 w-100 rounded-3 shadow">Bayar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}