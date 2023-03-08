import logo from "../Image/logo.png"

export const Navbar = () => {
    const user = localStorage.getItem("user")

    return (
        <div className="sticky-top">
            <div className="text-center bg-white">
                <div></div>
                <a href="#" className="d-none d-lg-block"><img className="brand" src={logo} /></a>
                <div></div>
            </div>
            <nav class="navbar navbar-expand-lg bg-white px-3 px-lg-5">
                <div class="container-fluid">
                    <a href="#" className="d-lg-none">
                        <img className="brand" src={logo} />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div class="navbar-nav isi-nav">
                            <a class="nav-link isi fw-bold" href="/" id="beranda">Beranda</a>
                            <a class="nav-link isi fw-bold" href="#" id="lelang">Lelang Berita</a>
                            <a class="nav-link isi fw-bold" href="#" id="pasang">Pasang Berita</a>
                            <a class="nav-link isi fw-bold" href="/cari" id="cari">Cari Berita</a>
                            <a class="nav-link isi fw-bold text-danger" href="#">Terbaru</a>
                            <a class="nav-link isi fw-bold" href="/profil">Profil</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}