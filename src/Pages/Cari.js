import { Carousel } from "../Component/Carousel"
import { Footer } from "../Component/Footer"
import { Navbar } from "../Component/Navbar"

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
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3"> </p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3">Kategori</p>
                        </div>
                        <div className="bg-white mb-2">
                            <p className="fw-semibold p-2 px-3"> </p>
                        </div>
                    </div><div>
                        <div className="bg-white mb-2">
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