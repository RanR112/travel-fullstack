import React, {useState, useEffect} from 'react'
import './home.css'
import { GrLocation } from "react-icons/gr"
import { FaSearch } from "react-icons/fa";




const Home = ({ filter, setFilter }) => {
    // State untuk menyimpan nilai input dari form
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState('Semua Kategori');
    const [selectedPrice, setSelectedPrice] = useState('Semua Harga');

    useEffect(() => {
        setSearch(filter.location);
        setSelectedTag(filter.tag !== '' ? filter.tag : 'Semua Kategori');
        setSelectedPrice(filter.fees !== '' ? filter.fees : 'Semua Harga');
    }, [filter]);

    // Fungsi untuk menangani perubahan input dari form dan mengirimkan nilai filter ke komponen Main
    const handleSearch = () => {
        const filter = {
            location: search,
            tag: selectedTag !== 'Semua Kategori' ? selectedTag : '',
            fees: selectedPrice !== 'Semua Harga' ? selectedPrice : ''
        };
        setFilter(filter);
    };


    return (
        <section className="home" id='Home'>
            <div className="layer"></div>
            <img src="https://c.pxhere.com/photos/5a/01/reflection_fuji_japan_mountain_lake_travel_landmark_morning-871522.jpg!d" alt="pemandangan"/>

            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos="fade-up" className="smallText">
                        Selamat Datang
                    </span>
                    
                    <h1 data-aos="fade-up" className="homeTitle">
                        Cari Wisata Anda
                    </h1>
                </div>

                <form data-aos="fade-up" className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">Cari Lokasi Wisata Anda:</label>
                        <div className="input flex">
                            <input type="text" placeholder='Cth: Bandung' value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <GrLocation className='icon'/>
                        </div>
                    </div>
                    <div className="tagInput">
                        <label htmlFor="tag">Cari Berdasarkan Kategori:</label>
                        <div className="input flex">
                            <select className="tagForm" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                                <option selected>Semua Kategori</option>
                                <option value="Wisata Alam">Wisata Alam</option>
                                <option value="Kebun Binatang">Kebun Binatang</option>
                                <option value="Objek Wisata">Objek Wisata</option>
                                <option value="Pantai">Pantai</option>
                                <option value="Museum">Museum</option>
                            </select>
                        </div>
                    </div>
                    <div className="priceInput">
                        <div className="label_total">
                            <label htmlFor="price">Cari Berdasarkan Harga:</label>
                            <div className="input flex">
                                <select className="tagForm" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                                    <option selected>Semua Harga</option>
                                    <option value="Rp 0 - Rp 50.000">Rp 0 - Rp 50.000</option>
                                    <option value="Rp 50.000 - Rp 100.000">Rp 50.000 - Rp 100.000</option>
                                    <option value="Rp 100.000 - Rp 200.000">Rp 100.000 - Rp 200.000</option>
                                    <option value="Rp 200.000 - Rp 500.000">Rp 200.000 - Rp 500.000</option>
                                </select>
                            </div>

                        </div>
                        
                    </div>

                    <a href="#Main">
                        <div className="searchOptions flex" onClick={handleSearch}>
                                <FaSearch className='icon'/>
                                <span>CARI</span>
                        </div>
                    </a>
                </form>
            </div>

        </section>
    )
}

export default Home