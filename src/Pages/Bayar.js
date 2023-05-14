import { Navbar } from "../Component/Navbar"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';

export const Bayar = () => {
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
                            console.log(`Harga = ${harga}`)
                            document.getElementById('total').innerHTML = harga
                        }
                        console.log(daftar_penawaran)
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

    return (
        <div>
            <Navbar />
            <div className="bg-biru sampul"></div>
            
            <Footer />
        </div>
    )
}