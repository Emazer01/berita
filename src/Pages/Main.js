import { Carousel } from "../Component/Carousel"
import { Navbar } from "../Component/Navbar"
import { Tagline } from "../Component/Tagline"
import jumbo1 from "../Image/jumbo1.jpg"
import jumbo2 from "../Image/jumbo2.jpg"
import jumbo3 from "../Image/jumbo3.jpg"
import jumbo4 from "../Image/jumbo4.jpg"
import olahraga from "../Image/olahraga.jpg"
import event from "../Image/event.jpg"
import gaya from "../Image/gaya.jpg"
import sains from "../Image/sains.jpg"
import wisata from "../Image/wisata.jpg"
import { Footer } from "../Component/Footer"

export const Main = () => {
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
                        <button className="ms-auto btn mb-1" id="row-btn" onClick={row}>
                            <i class="bi bi-hdd-stack-fill"></i>
                        </button>
                        <button className="ms-auto btn mb-1 d-none" id="grid-btn" onClick={grid}>
                            <i class="bi bi-grid-fill"></i>
                        </button>
                    </div>
                    <div id="row-view" className="d-none">
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={jumbo1} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={jumbo1} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={jumbo1} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 rounded-0 border-0 shadow">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={jumbo1} class="h-100 img-fluid object-fit-cover" alt="..." />
                                </div>
                                <div class="col-md-8 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i><small>Rp <span>100.000</span></small></span>
                                        <span class="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><small><span>1</span></small></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="grid-view">
                        <div className="mt-2 row">
                            <div class="card col-12 col-md mx-3 my-2 rounded-0 border-0 p-0 shadow">
                                <img src={jumbo1} class="card-img-top rounded-0" alt="..." />
                                <div class="card-body d-flex flex-column p-0">
                                    <div className="p-3">
                                        <h5 class="card-title">John Lewis, civil rights giant, crosses infamous Selma bridge one final time</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="mt-auto border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i> Rp <span>100.000</span></span>
                                        <span className="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><span>1</span></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="card col-12 col-md mx-3 my-2 rounded-0 border-0 p-0 shadow">
                                <img src={jumbo1} class="card-img-top rounded-0" alt="..." />
                                <div class="card-body d-flex flex-column p-0">
                                    <div className="p-3">
                                        <h5 class="card-title">John Lewis, civil rights giant, crosses infamous Selma bridge one final time</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="mt-auto border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i> Rp <span>100.000</span></span>
                                        <span className="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><span>1</span></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 row">
                            <div class="card col-12 col-md mx-3 my-2 rounded-0 border-0 p-0 shadow">
                                <img src={jumbo1} class="card-img-top rounded-0" alt="..." />
                                <div class="card-body d-flex flex-column p-0">
                                    <div className="p-3">
                                        <h5 class="card-title">John Lewis, civil rights giant, crosses infamous Selma bridge one final time</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="mt-auto border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i> Rp <span>100.000</span></span>
                                        <span className="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><span>1</span></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="card col-12 col-md mx-3 my-2 rounded-0 border-0 p-0 shadow">
                                <img src={jumbo1} class="card-img-top rounded-0" alt="..." />
                                <div class="card-body d-flex flex-column p-0">
                                    <div className="p-3">
                                        <h5 class="card-title">John Lewis, civil rights giant, crosses infamous Selma bridge one final time</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <p class="card-text"><small class="text-muted">3 mins ago | </small><small className="text-muted">Lucy Hiddleston</small></p>
                                    </div>
                                    <div className="mt-auto border-top d-flex">
                                        <span class="card-text ms-2 my-1 text-danger"><i class="bi bi-eject-fill mx-2"></i> Rp <span>100.000</span></span>
                                        <span className="card-text ms-2 my-1"><i class="bi bi-file-earmark-plus-fill mx-2"></i><span>1</span></span>
                                        <a href="#" class="btn rounded-0 btn-biru ms-auto">LIHAT<i class="bi bi-caret-right-fill"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <a href="#">
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
                <div className="col-lg-10 mx-3">
                    <p className="fw-semibold mt-2">Editorial's Pick<i class="ms-2 bi bi-star-fill"></i></p>
                    <div className="row">
                        <div class="card my-3 border-0 col-12 col-md-6 bg-f5">
                            <div class="row g-0">
                                <div class="col-md-5">
                                    <img src={jumbo1} class="img-fluid rounded-1" alt="..." />
                                </div>
                                <div class="col-md-7 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card my-3 border-0 col-12 col-md-6 bg-f5">
                            <div class="row g-0">
                                <div class="col-md-5">
                                    <img src={jumbo1} class="img-fluid rounded-1" alt="..." />
                                </div>
                                <div class="col-md-7 d-flex flex-column">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                                </div>
                            </div>
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