import React, {useRef, useEffect} from 'react'
import Swal from 'sweetalert2';
import './footer.css'
import { FiSend } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import logob from "../../Assets/logoblack.png"
import logow from "../../Assets/logowhite.png"



const Footer = ({ theme, setFilter }) => {
    // Fungsi untuk memilih destinasi ketika destinasi pada footer diklik
    const setFavoriteDestination = (destination) => {
        setFilter(filter => ({
            ...filter,
            location: destination
        }));
    };

    const formRef = useRef(null);

    useEffect(() => {
        const form = formRef.current;
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const action = e.target.action;
            fetch(action, {
                method: 'POST',
                body: data,
            })
            .then(() => {
                if (theme === 'light') {
                    Swal.fire({
                        title: "Terkirim",
                        text: "Terimakasih atas masukan Anda",
                        icon: "success",
                        confirmButtonColor: '#1086cb'
                    });
                } else {
                    Swal.fire({
                        title: "Terkirim",
                        text: "Terimakasih atas masukan Anda",
                        icon: "success",
                        background: "#1c1c1c",
                        color:'white',
                        confirmButtonColor: '#ef7934'
                    });
                }
                form.reset();
            });
        };

    form.addEventListener("submit", handleSubmit);

    return () => {
        form.removeEventListener("submit", handleSubmit);
        };
    }, [theme]);

    return (
    <section className="footer" id="Footer">
        <div className="layer"></div>
        <img className="imgbg" src="https://c.pxhere.com/photos/84/22/beach_ocean_sand_water_horizon-99073.jpg!d" alt="pantai"/>

        <div className="secContent container">
            <div className="contactDiv flex" id='Contact'>
                <div data-aos="fade-up" className="text">
                    <small>SEMOGA WISATA ANDA MENYENANGKAN</small>
                    <h2>Berikan Masukkan Anda</h2>
                </div>

                <form className="inputDiv flex" id='my-form' method='POST' ref={formRef} action='https://script.google.com/macros/s/AKfycbxgwFZQABCuFR22V-xZx4SubUF9m3-LSGB0V0eGJkQ9CKXlptzNfdrCkl86jAshH6us/exec'>
                    <input data-aos="fade-up" name='Masukan' type="text" placeholder='Ketik masukan...' />
                    <button data-aos="fade-up" className="btn flex" type='submit'>
                        KIRIM <FiSend className='icon'/>
                    </button>
                </form>
            </div>

            <div className="footerCard flex">
                <div className="footerIntro flex" id='About'>
                    <div className="logoDiv">
                        <img data-aos="fade-up" src={theme !== 'light' ? logow : logob} alt="logo" className='icon'/>
                        <h4 data-aos="fade-up" className='logo flex'>West Java Tour</h4>
                    </div>

                    <div data-aos="fade-up" className="footerParagraph">
                    West Java Tour adalah sebuah platform daring yang didedikasikan untuk menyediakan informasi lengkap tentang destinasi wisata di provinsi Jawa Barat, Indonesia. Didirikan dengan tujuan untuk membantu wisatawan lokal dan internasional dalam menemukan keindahan dan kekayaan budaya yang ada di Jawa Barat. West Java Tour telah menjadi salah satu sumber terpercaya untuk perencanaan perjalanan dan rekomendasi tempat wisata.
                    </div>

                    <div data-aos="fade-up" className="footerSocials" id="Contact">
                        <FaInstagram className='icon'/>
                        <FaFacebookSquare className='icon'/>
                        <FaXTwitter className='icon'/>
                        <AiOutlineYoutube className='icon'/>
                    </div>
                </div>

                <div className="footerLinks grid">
                    {/* Group 1 */}
                    <div data-aos="fade-up" className="linkGroup">
                        <span className="groupTitle">
                            JASA KAMI
                        </span>

                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Hotel
                        </li>
                        
                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Tiket Pesawat
                        </li>

                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Tiket Kereta Api
                        </li>

                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Tiket Bus & Travel
                        </li>

                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Antar Jemput
                        </li>

                        <li className="footerList flex">
                            <FaChevronRight className='icon'/>
                            Rental Mobil
                        </li>

                    </div>
                    {/* Group 2 */}
                    <div data-aos="fade-up" className="linkGroup">
                        <span className="groupTitle">
                            PARTNER
                        </span>

                        <li className="footerList flex">
                            <a href="https://www.indonesia.travel/gb/en/home.html"><FaChevronRight className='icon'/>
                            Pesona Indonesia
                            </a>
                        </li>
                        
                        <li className="footerList flex">
                            <a href="https://www.traveloka.com/id-id"><FaChevronRight className='icon'/>
                            Traveloka
                            </a>
                        </li>

                        <li className="footerList flex">
                            <a href="https://www.reddoorz.com/id-id/"><FaChevronRight className='icon'/>
                            Reddoorz
                            </a>
                        </li>

                        <li className="footerList flex">
                            <a href="https://www.agoda.com/"><FaChevronRight className='icon'/>
                            Agoda
                            </a>
                        </li>

                        <li className="footerList flex">
                            <a href="https://www.kai.id/"><FaChevronRight className='icon'/>
                            KAI
                            </a>
                        </li>

                        <li className="footerList flex">
                            <a href="https://www.sinarjayagroup.co.id/"><FaChevronRight className='icon'/>
                            Sinar Jaya
                            </a>
                        </li>

                    </div>
                    {/* Group 3 */}
                    <div data-aos="fade-up" className="linkGroup">
                        <span className="groupTitle">
                            FAVORIT
                        </span>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Bandung')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Bandung
                            </a>
                        </li>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Bogor')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Bogor
                            </a>
                        </li>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Cianjur')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Cianjur
                            </a>
                        </li>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Subang')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Subang
                            </a>
                        </li>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Sumedang')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Sumedang
                            </a>
                        </li>

                        <li className="footerList flex" onClick={() => setFavoriteDestination('Pangandaran')}>
                            <a href="#Main"><FaChevronRight className='icon' />
                            Pangandaran
                            </a>
                        </li>

                    </div>
                    
                </div>

                <div className="footerDiv flex">
                    <small>&copy; 2024 West Java Tour. All Right Reserved.</small>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Footer