import { Carousel } from "../Component/Carousel"
import { Footer } from "../Component/Footer"
import { Navbar } from "../Component/Navbar"

import olahraga from "../Image/kategori/olahraga.jpg"
import politik from "../Image/kategori/politik.jpg"
import teknologi from "../Image/kategori/teknologi.jpg"
import budaya from "../Image/kategori/budaya.jpg"
import bisnis from "../Image/kategori/bisnis.jpg"
import fashion from "../Image/kategori/fashion.jpg"
import kesehatan from "../Image/kategori/kesehatan.jpg"
import lainnya from "../Image/kategori/lainnya.jpg"

export const Cari = () => {

    return (
        <div>
            <Navbar />
            <div className="row bg-biru">
                <div className="col"></div>
                <div className="col-10 col-md-8 col-lg-4 p-1 d-flex">
                    <i class="bi bi-search text-white fs-5 border border-white m-0 px-2 border-3"></i>
                    <input type="text" class="form-control rounded-0 border-0 " id="cariJudul" placeholder="Cari" name="cariJudul" />
                </div>
                <div className="col"></div>
            </div>
            <div className="row bg-f5">
                <div className="col"></div>
                <div className="col-lg-10">
                    <div className="bg-biru h-55-vh my-3"></div>
                    <div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3">Kategori</p>
                        </div>
                        <div className="mb-3 row mx-lg-1">
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={olahraga} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Olahraga</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={politik} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Politik</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={teknologi} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Sains & Teknologi</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={budaya} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Budaya</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={bisnis} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Bisnis & Financial</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={fashion} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Fashion & Beauty</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={kesehatan} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Kesehatan</span>
                            </a>
                            <a href="#kat" className="card text-bg-dark btn border-0 col-6 col-md-4 col-lg-3 p-0">
                                <img src={lainnya} className="card-img rounded-0 h-100 img-fluid object-fit-cover" alt="..."/>
                                <span className="card-img-overlay rounded-0 fw-semibold kat-ovr">Lainnya</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3">Lelang Berita</p>
                        </div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3"> </p>
                        </div>
                    </div><div>
                        <div className="bg-white mb-2" id="kat">
                            <p className="fw-semibold p-2 px-3">Kategori</p>
                        </div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3"> </p>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}