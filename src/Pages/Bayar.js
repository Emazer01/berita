import { Navbar } from "../Component/Navbar"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';

export const Bayar = () => {
    const navigate = useNavigate()
    const [transaksiState, setTransaksiState] = React.useState({
        judul: '',
        nama: '',
        deskripsi: '',
        image: '',
        tanggal: '',
        file: '',
    })

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const transaksi_id = urlParams.get('id')
        console.log(transaksi_id)
        const profile_id = Number(localStorage.getItem('profile_id'))
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/viewtransaksi`, {
            token: token,
            profile_id: profile_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const daftar_transaksi = response.data
                    console.log(daftar_transaksi)
                    var list_transaksi = ''
                    for (let index = 0; index < daftar_transaksi.length; index++) {
                        if (daftar_transaksi[index].transaksi_id == transaksi_id) {
                            setTransaksiState(daftar_transaksi[index])
                        }
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
    }, [])

    return (
        <div>
            <Navbar />
            <div className="bg-biru sampul"></div>
            <div className='row mb-5 mt-minus-150-px' id='editProfile'>
                <div className="col"></div>
                <div className='col-10 shadow py-4 bg-white row'>
                    <div className='col-12 col-md-4 mb-3'>
                        <div className='bg-white shadow p-0 text-center mx-3'>
                            <div class="card rounded-0 border-0 p-0 shadow">
                                <img src={transaksiState.image} class="card-img-top rounded-0" alt="..." />
                                <div class="card-body d-flex flex-column p-0">
                                    <div className="p-3">
                                        <h5 class="card-title">{transaksiState.judul}</h5>
                                        <p class="card-text"><small class="text-muted">{transaksiState.tanggal.substring(0, 10)} | </small><small className="text-muted">{transaksiState.nama}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 p-4">
                        <h3 className="fs-1">Bayar</h3>
                        <div className="col-12 col-md-6">
                            <table className="my-4 w-100">
                                <tr>
                                    <th>Nominal</th>
                                    <td className="text-end py-2">{transaksiState.harga_total}</td>
                                </tr>
                                <tr>
                                    <th>Metode</th>
                                    <td className="text-end py-2">Transfer</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td className="text-end py-2">{transaksiState.status_transaksi_label}</td>
                                </tr>
                            </table>
                            <button class='btn-biru fs-4 p-2 w-100'>Sudah Bayar</button>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>

            <Footer />
        </div>
    )
}