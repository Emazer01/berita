export const Navbar = () => {
    const user = localStorage.getItem("user")

    return (
        <nav class="navbar navbar-expand-lg bg-body-secondary px-3 px-lg-5 sticky-top">
            <div class="container-fluid">
                <a class="navbar-brand brand" href="/">JuCo.</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav isi-nav">
                        <a class="nav-link isi" href="#" id="berita">Lelang Berita</a>
                        <a class="nav-link isi" href="#">Pasang Berita</a>
                        <a class="nav-link isi" href="#">Cari Berita</a>
                        <a class="nav-link isi" href="#">Lainnya</a>
                        <a href="/profile" className="nav-link isi d-lg-none border-top border-3 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 18 17">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            </svg>
                            {user}
                        </a>
                    </div>
                </div>
                <a href="/profile" className="text-dark text-decoration-none d-none d-lg-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="3 0 13 17">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    {user}
                </a>
                <a href="#" className="text-dark text-decoration-none d-none d-lg-block ms-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-wallet-fill me-2" viewBox="2 0 12 17">
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                    </svg>
                    0
                </a>
            </div>
        </nav>
    )
}