import jumbo1 from "../Image/jumbo1.jpg"
import jumbo2 from "../Image/jumbo2.jpg"
import jumbo3 from "../Image/jumbo3.jpg"
import jumbo4 from "../Image/jumbo4.jpg"

export const Carousel = () => {
    return(
        <div id="demo" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
            </div>
            <div class="carousel-inner">
                 <div class="carousel-item active">
                    <img src={jumbo1} alt="Los Angeles" class="carousel-img"/>
                    <div class="carousel-caption text-start">
                        <h1 className="col-12 col-lg-6">Terkini, Terakurat, Terpercaya</h1><br/>
                        <p className="col-12 col-lg-6">Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        <br/><br/><br/><br/>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src={jumbo2} alt="Chicago" class="carousel-img"/>
                    <div class="carousel-caption text-start">
                        <h1 className="col-12 col-lg-6">Waspada berita HOAX!</h1><br/>
                        <p className="col-12 col-lg-6">Dalam JuCo., kita berfokus pada mencari fakta dan memberikan informasi secara faktual.</p>
                        <br/><br/><br/><br/>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src={jumbo3} alt="New York" class="carousel-img"/>
                    <div class="carousel-caption text-start">
                        <h1 className="col-12 col-lg-6">Terkini, Terakurat, Terpercaya</h1><br/>
                        <p className="col-12 col-lg-6">Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        <br/><br/><br/><br/>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src={jumbo4} alt="New York" class="carousel-img"/>
                    <div class="carousel-caption text-start">
                        <h1 className="col-12 col-lg-6">Sebarkan Event mu</h1><br/>
                        <p className="col-12 col-lg-6">Jangkau redaksi untuk penyebaran informasi secara cepat. Semakin banyak yang tau, semakin ramai event mu</p>
                        <br/><br/><br/><br/>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    )
}