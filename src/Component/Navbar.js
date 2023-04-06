import logo from "../Image/logo.png"

export const Navbar = () => {
    const user = localStorage.getItem("user")

    return (
        <div className="sticky-top">
            <div className="text-center bg-white">
                <div></div>
                <a href="/" className="d-none d-lg-block"><img className="brand" src={logo} /></a>
                <div></div>
            </div>
            <nav class="navbar navbar-expand-lg bg-white px-3 px-lg-5">
                <div class="container-fluid">
                    <a href="/" className="d-lg-none text-decoration-none p-0">
                        <img className="brand" src={logo} />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div className="w-25"></div>
                        <div class="navbar-nav isi-nav w-50 justify-content-center">
                            <a class="nav-link isi fw-bold" href="/" id="beranda">Beranda</a>
                            <a class="nav-link isi fw-bold" href="#" id="lelang">Lelang Berita</a>
                            <a class="nav-link isi fw-bold" href="/cari" id="cari">Cari Berita</a>
                            <a class="nav-link isi fw-bold" href="#" id="kategori">Kategori</a>
                            <a class="nav-link isi fw-bold text-danger" href="#">Terbaru</a>
                        </div>
                        <div class="navbar-nav isi-nav w-25 justify-content-end">
                            <a class="nav-link fw-bold fs-4 p-0 mx-3" href="/profil"><i class="bi bi-gear-fill"></i></a>
                            <a class="nav-link fw-bold bg-biru text-white px-2" href="/pasang">Pasang Berita</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}