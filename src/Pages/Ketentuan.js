import { Navbar } from "../Component/Navbar"
import { Footer } from "../Component/Footer"
import * as React from 'react';
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';
import logo from "../Image/logo.png"

export const Ketentuan = () => {
    return (
        <div className="bg-f5">
            <Navbar />
            <div className="bg-biru sampul"></div>
            <div className='row mb-5 mt-minus-150-px' id='editProfile'>
                <div className="col"></div>
                <div className='col-10 shadow p-5 bg-white row'>
                    <h1 className="my-4">Ketentuan Layanan</h1>
                    <div className="row">
                        <div className="col-8">
                            <p>Selamat datang di aplikasi JuCo. Dalam menggunakan layanan kami, Anda diharapkan mematuhi dan setuju dengan ketentuan yang diuraikan di bawah ini. Ketentuan ini mengatur penggunaan aplikasi oleh jurnalis/wartawan dan narasumber. Silakan membaca ketentuan ini dengan seksama sebelum menggunakan layanan kami.</p>
                            <div>
                                <h5>1.	Jurnalis/Wartawan</h5>
                                <p className="ps-4">a. Surat Redaksi Asli<br />
                                    <small className="ps-3">Untuk menjadi pengguna jurnalis/wartawan dalam aplikasi kami, Anda diharuskan untuk memasukkan nomor dan salinan surat redaksi asli dari media atau organisasi berita yang valid dan diakui secara hukum.</small>
                                </p>
                                <p className="ps-4">b.	Informasi Akurat<br />
                                    <small className="ps-3">Anda bertanggung jawab untuk menyediakan berita yang akurat dan dapat dipertanggungjawabkan. Anda harus memastikan bahwa setiap berita yang Anda sampaikan atau jual melalui aplikasi tidak mengandung informasi palsu atau menyesatkan.</small>
                                </p>
                                <p className="ps-4">c.	Penghormatan terhadap Etika Jurnalistik<br />
                                    <small className="ps-3">Anda harus mengikuti prinsip-prinsip etika jurnalistik, termasuk kejujuran, objektivitas, dan keberimbangan dalam melaporkan berita. Anda juga harus menjaga integritas dan independensi dalam pekerjaan jurnalistik Anda.</small>
                                </p>
                                <p className="ps-4">d.	Kepatuhan Hukum<br />
                                    <small className="ps-3">Anda harus mematuhi semua undang-undang, peraturan, dan ketentuan yang berlaku terkait dengan jurnalistik dan publikasi berita.</small>
                                </p>
                            </div>
                            <div>
                                <h5>2.	Narasumber</h5>
                                <p className="ps-4">a.	Konten yang Dilarang<br />
                                    <small className="ps-3">Anda dilarang menyampaikan atau menjual berita yang mengandung konten yang dapat dianggap sebagai SARA (Suku, Agama, Ras, dan Antar-golongan) atau melanggar hukum atau etika yang berlaku. Setiap pelanggaran terhadap ketentuan ini akan mengakibatkan tindakan tegas, termasuk penangguhan atau penghapusan akun.</small>
                                </p>
                                <p className="ps-4">b.	Keaslian Berita<br />
                                    <small className="ps-3">Anda bertanggung jawab untuk menyediakan berita yang benar-benar merupakan karya Anda sendiri atau Anda memiliki izin untuk menyampaikan atau menjualnya. Anda tidak boleh menggunakan berita orang lain tanpa izin yang sah.</small>
                                </p>
                                <p className="ps-4">c.	Kerahasiaan dan Privasi<br />
                                    <small className="ps-3">Kami menghargai kerahasiaan dan privasi narasumber. Namun, Anda harus memahami bahwa informasi yang Anda berikan dalam berita dapat menjadi publik dan dapat diakses oleh pengguna lain. Kami tidak bertanggung jawab atas penggunaan informasi oleh pihak ketiga setelah informasi tersebut dipublikasikan.</small>
                                </p>
                                <p className="ps-4">d.	 Konten yang Dibeli<br />
                                    <small className="ps-3">Dalam hal Anda menjual berita, Anda harus memastikan bahwa berita tersebut memenuhi standar kualitas yang ditetapkan oleh aplikasi kami. Kami berhak untuk meninjau dan menolak berita yang tidak memenuhi kriteria yang ditetapkan.</small>
                                </p>
                            </div>
                            <div>
                                <h5>3.	Hak Cipta</h5>
                                <p className="ps-4">a.	Kepemilikan Konten<br />
                                    <small className="ps-3">Anda tetap menjadi pemilik hak cipta dari berita yang Anda sampaikan atau jual melalui aplikasi kami. Namun, dengan menggunakan layanan kami, Anda memberikan kepada kami hak non-eksklusif untuk menyimpan, menggandakan, dan mendistribusikan berita tersebut sesuai dengan ketentuan dan kebijakan kami.</small>
                                </p>
                                <p className="ps-4">b.	Pelanggaran Hak Cipta<br />
                                    <small className="ps-3">Kami menghormati hak cipta orang lain dan mengharapkan Anda untuk melakukannya juga. Jika Anda percaya bahwa hak cipta Anda telah dilanggar oleh pengguna lain, silakan hubungi kami untuk melaporkan pelanggaran tersebut.</small>
                                </p>
                            </div>
                            <div>
                                <h5>4.	Penyalahgunaan Aplikasi</h5>
                                <p className="ps-4">a.	Pelanggaran Ketentuan<br />
                                    <small className="ps-3">Pelanggaran terhadap ketentuan layanan ini dapat mengakibatkan tindakan yang sesuai, termasuk pembekuan atau penghapusan akun.</small>
                                </p>
                                <p className="ps-4">b.	Pembaruan Ketentuan<br />
                                    <small className="ps-3">Kami berhak untuk memperbarui atau mengubah ketentuan layanan ini dari waktu ke waktu. Setiap perubahan akan diinformasikan kepada pengguna melalui pemberitahuan di aplikasi atau melalui kontak yang telah Anda berikan.</small>
                                </p>
                            </div>
                            <div>
                                <h5>5.	Pembayaran dan Komisi Aplikasi </h5>
                                <p className="ps-4">
                                    Pembayaran dan Komisi Aplikasi ini akan mengambil komisi dari semua penjualan yang dilakukan melalui platform. Tingkat komisi akan diungkapkan kepada jurnalis dan informan sebelum mereka setuju untuk menjual berita mereka. Pembayaran akan dilakukan kepada jurnalis atau narasumber setelah berita terjual.
                                </p>
                            </div>
                            <div>
                                <h5>6.	Penghentian Akun</h5>
                                <p className="ps-4">
                                    Aplikasi berhak untuk menghentikan akun jurnalis atau narasumber yang melanggar ketentuan layanan ini. Aplikasi juga dapat menghapus berita apa pun.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <img className="w-100" src={logo} />
                        </div>
                    </div>

                </div>
                <div className="col"></div>
            </div>
            <Footer />
        </div>
    )
}