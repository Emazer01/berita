import jumbo1 from "../Image/jumbo1.jpg"
import jumbo2 from "../Image/jumbo2.jpg"
import jumbo3 from "../Image/jumbo3.jpg"
import jumbo4 from "../Image/jumbo4.jpg"

export const Carousel = () => {
    return (
        <div id="demo" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
            </div>
            <div class="carousel-inner bg-biru">
                <div class="carousel-item active">
                    <div class="carousel-caption text-lg-start row">
                        <div className="col-12 col-lg-6 pb-3">
                            <img src={jumbo1} className="w-100 my-2"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h2 className="mt-lg-5">Terkini, Terakurat, Terpercaya</h2><br/>
                            <p>Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item active">
                    <div class="carousel-caption text-lg-start row">
                        <div className="col-12 col-lg-6 pb-3">
                            <img src={jumbo1} className="w-100 my-2"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h2 className="mt-lg-5">Terkini, Terakurat, Terpercaya</h2><br/>
                            <p>Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item active">
                    <div class="carousel-caption text-lg-start row">
                        <div className="col-12 col-lg-6 pb-3">
                            <img src={jumbo1} className="w-100 my-2"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h2 className="mt-lg-5">Terkini, Terakurat, Terpercaya</h2><br/>
                            <p>Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item active">
                    <div class="carousel-caption text-lg-start row">
                        <div className="col-12 col-lg-6 pb-3">
                            <img src={jumbo1} className="w-100 my-2"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h2 className="mt-lg-5">Terkini, Terakurat, Terpercaya</h2><br/>
                            <p>Dapatkan berita terbaru yang akurat, dan tentunya berasal dari sumber yang terpercaya.</p>
                        </div>
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