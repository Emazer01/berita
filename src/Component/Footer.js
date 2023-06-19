import logo from "../Image/logo-putih.png"

export const Footer = () => {
    return (
        <div className="bg-biru p-5 text-white row">
            <div className="col-12 col-md-8 col-lg-5 text-center my-3">
                <img src={logo} className="brand"/><br/><br/>
                <p className="opacity-50">copyright © 2023 | JUCO NEWS</p>
            </div>
            <div className="col-12 col-md-4 col-lg-3 text-center my-3 text-md-end text-lg-start">
                <a href="#" className="text-decoration-none text-white"><p>Kebijakan Privasi</p></a>
                <a href="/ketentuan" className="text-decoration-none text-white"><p>Ketentuan Layanan</p></a>
                <a href="#" className="text-decoration-none text-white"><p>JUCO NEWS.inc</p></a>
            </div>
            <div className="col-12 col-lg-4 my-3 border-top pt-3">
                <div className="d-flex justify-content-center justify-content-lg-end text-center">
                    <a href="#" className="text-decoration-none text-white ms-4"><p>Tentang</p></a>
                    <a href="#" className="text-decoration-none text-white ms-4"><p>Kontak</p></a>
                    <a href="#" className="text-decoration-none text-white ms-4"><p>Karir</p></a>
                    <a href="#" className="text-decoration-none text-white ms-4"><p>Kupon</p></a>
                </div>
                <div className="d-flex justify-content-center justify-content-lg-end text-center my-2">
                    <a href="#" className="text-decoration-none text-white fs-4 ms-2"><i class="bi bi-instagram"></i></a>
                    <a href="#" className="text-decoration-none text-white fs-4 ms-2"><i class="bi bi-twitter"></i></a>
                    <a href="#" className="text-decoration-none text-white fs-4 ms-2"><i class="bi bi-whatsapp"></i></a>
                    <a href="#" className="text-decoration-none text-white fs-4 ms-2"><i class="bi bi-line"></i></a>
                    <a href="#" className="text-decoration-none text-white fs-4 ms-2"><i class="bi bi-telegram"></i></a>
                </div>
            </div>
        </div>
    )
}