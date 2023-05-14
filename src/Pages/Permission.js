import { Footer } from "../Component/Footer"
import { Navbar } from "../Component/Navbar"

export const Permission = () => {
    return(
        <div>
            <Navbar />
            <div className="bg-biru h-55-vh text-white p-5 gede text-center">
                <i class="bi bi-sign-do-not-enter-fill"></i>
                <h1>Anda tidak mendapatkan akses ke halaman ini</h1>
            </div>
            <Footer />
        </div>
    )
}