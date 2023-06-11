import { Carousel } from "../Component/Carousel"
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import jumbo1 from "../Image/jumbo1.jpg"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import axios from 'axios';

export const Main = () => {

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/main`)
            .then(async function (response) {
                if (response.status == 200) {
                    const daftar_berita = response.data
                    console.log(daftar_berita)
                    var listRow = ''
                    for (let index = 0; index < daftar_berita.length; index++) {
                        listRow +=
                            `<div class="card my-3 rounded-0 border-0 shadow">
                                <div class="row g-0">
                                    <div class="col-md-12 d-flex flex-column">
                                        <div class="card-body p-2">
                                            <h5 class="card-title">${daftar_berita[index].judul}</h5>
                                        </div>
                                        <div class="border-top d-flex">
                                            <p class="card-text m-1 mx-2"><small class="text-muted">${daftar_berita[index].tanggal.substring(0, 10)} | </small><small class="text-muted">${daftar_berita[index].nama}</small></p>
                                            <span class="card-text my-1 text-danger ms-auto mx-2"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>${daftar_berita[index].harga}</span></small></span>
                                            <a href="/view/?id=${daftar_berita[index].berita_id}" class="btn rounded-0 btn-biru ">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    }
                    if (daftar_berita.length < 1) {
                        listRow += `<p class='text-muted'>Belum ada Postingan</p>`
                    }
                    document.getElementById("row-view").innerHTML = listRow
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

    const row = () => {
        document.getElementById("row-btn").classList.add("d-none")
        document.getElementById("grid-btn").classList.remove("d-none")
        document.getElementById("row-view").classList.remove("d-none")
        document.getElementById("grid-view").classList.add("d-none")
    }
    const grid = () => {
        document.getElementById("row-btn").classList.remove("d-none")
        document.getElementById("grid-btn").classList.add("d-none")
        document.getElementById("row-view").classList.add("d-none")
        document.getElementById("grid-view").classList.remove("d-none")
    }
    return (
        <div>
            <Navbar />
            <Carousel />
            <div className="row mt-4 p-4 bg-f5">
                <div className="col"></div>
                <div className="col-lg-7 mx-2">
                    <div className="px-3 pt-2 bg-white d-flex shadow">
                        <a href="" className="text-decoration-none text-black me-5 border-bottom">
                            <p className="fw-semibold border-bottom border-danger border-3">Berita Terbaru</p>
                        </a>
                        <button className="ms-auto btn mb-1 d-none" id="row-btn" onClick={row}>
                            <i class="bi bi-hdd-stack-fill"></i>
                        </button>
                        <button className="ms-auto btn mb-1 d-none" id="grid-btn" onClick={grid}>
                            <i class="bi bi-grid-fill"></i>
                        </button>
                    </div>
                    <div id="row-view">
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-12 d-flex flex-column">
                                    <div class="card-body p-2">
                                        <h5 class="card-title placeholder-glow">
                                            <span class="placeholder col-6 placeholder-lg bg-dark"></span>
                                        </h5>
                                    </div>
                                    <div class="border-top d-flex">
                                        <p class="card-text m-1 mx-2 w-25"><small class="text-muted placeholder-glow"><span class="placeholder col-12 bg-dark"></span></small></p>
                                        <span class="card-text my-1 text-danger ms-auto mx-2 w-25"><small className="placeholder-glow w-25"><span class="placeholder col-12 bg-danger"></span></small></span>
                                        <a href="" class="btn rounded-0 btn-biru col-1"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-12 d-flex flex-column">
                                    <div class="card-body p-2">
                                        <h5 class="card-title placeholder-glow">
                                            <span class="placeholder col-6 placeholder-lg bg-dark"></span>
                                        </h5>
                                    </div>
                                    <div class="border-top d-flex">
                                        <p class="card-text m-1 mx-2 w-25"><small class="text-muted placeholder-glow"><span class="placeholder col-12 bg-dark"></span></small></p>
                                        <span class="card-text my-1 text-danger ms-auto mx-2 w-25"><small className="placeholder-glow w-25"><span class="placeholder col-12 bg-danger"></span></small></span>
                                        <a href="" class="btn rounded-0 btn-biru col-1"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-12 d-flex flex-column">
                                    <div class="card-body p-2">
                                        <h5 class="card-title placeholder-glow">
                                            <span class="placeholder col-6 placeholder-lg bg-dark"></span>
                                        </h5>
                                    </div>
                                    <div class="border-top d-flex">
                                        <p class="card-text m-1 mx-2 w-25"><small class="text-muted placeholder-glow"><span class="placeholder col-12 bg-dark"></span></small></p>
                                        <span class="card-text my-1 text-danger ms-auto mx-2 w-25"><small className="placeholder-glow w-25"><span class="placeholder col-12 bg-danger"></span></small></span>
                                        <a href="" class="btn rounded-0 btn-biru col-1"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-12 d-flex flex-column">
                                    <div class="card-body p-2">
                                        <h5 class="card-title placeholder-glow">
                                            <span class="placeholder col-6 placeholder-lg bg-dark"></span>
                                        </h5>
                                    </div>
                                    <div class="border-top d-flex">
                                        <p class="card-text m-1 mx-2 w-25"><small class="text-muted placeholder-glow"><span class="placeholder col-12 bg-dark"></span></small></p>
                                        <span class="card-text my-1 text-danger ms-auto mx-2 w-25"><small className="placeholder-glow w-25"><span class="placeholder col-12 bg-danger"></span></small></span>
                                        <a href="" class="btn rounded-0 btn-biru col-1"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <a href="/cari">
                            <button className="btn btn-outline-danger rounded-0 my-3 p-3 fw-semibold px-5 shadow">VIEW MORE</button>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 mx-2">
                    <div>
                        <p className="fw-semibold mt-2">Informasi Lebih<i class="ms-2 bi bi-envelope-fill"></i></p>
                        <div className="p-3 bg-white">
                            <h6 className="fw-normal py-2">Langganan</h6>
                            <form>
                                <input type="email" class="form-control rounded-0 p-3 my-3" id="email" placeholder="Email" name="email" />
                                <button type="button" class="btn btn-danger rounded-0 p-2 px-4 mb-3">KIRIM</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className="row p-4 bg-f5">
                <div className="col"></div>
                <div className="col-lg-10 mx-2">
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}