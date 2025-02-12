import React, { useEffect, useState, useCallback, useRef } from 'react';
import './main.css';
import Data from './data.json';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuClipboardCheck } from 'react-icons/lu';
import Loader from '../Loader.jsx'
import nodest from '../../Assets/nodata.png';
import { getPembeli, addPembeli, getTransaksi, addTransaksi, updateTransaksi ,sendEmail } from "../../Services/api";


const Main = ({ filter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPembelian, setIsPembelian] = useState(false);
    const [isTransaksi, setIsTransaksi] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [filtered, setFiltered] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState('')
    const [detailTransaksi, setDetailTransaksi] = useState({});
    const [pembeli, setPembeli] = useState([]);
    const [form, setForm] = useState({ nama: "", email: ""});
    const [dataTransaksi, setDataTransaksi] = useState([]);
    const [tanggal, setTanggal] = useState('');

    const kodeRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getPembeli();
                setPembeli(fetchedData);
                console.log(pembeli)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [isPembelian]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getTransaksi();
                setDataTransaksi(fetchedData);
                console.log(dataTransaksi)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [isPembelian]);


    useEffect(() => {
        if (isOpen || isPembelian || isTransaksi) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen, isPembelian, isTransaksi]);

    const applyFilter = useCallback(() => {
        const filteredData = Data.filter((destination) => {
            if (Object.values(filter).every((value) => value === '')) {
                return true;
            }

            if (!filter.fees) {
                return (
                    (filter.location === '' ||
                        destination.location.toLowerCase().includes(filter.location.toLowerCase())) &&
                    (filter.tag === '' || destination.tag.toLowerCase() === filter.tag.toLowerCase())
                );
            }

            const priceRange = filter.fees.split(' - ');
            const lowerPrice = parseInt(priceRange[0].replace('Rp ', '').replace('.', ''));
            const upperPrice = parseInt(priceRange[1].replace('Rp ', '').replace('.', ''));

            const destinationPrice = parseInt(destination.fees.replace('Rp ', '').replace('.', ''));

            return (
                (filter.location === '' ||
                    destination.location.toLowerCase().includes(filter.location.toLowerCase())) &&
                (filter.tag === '' || destination.tag.toLowerCase() === filter.tag.toLowerCase()) &&
                (filter.fees === '' || (destinationPrice >= lowerPrice && destinationPrice <= upperPrice))
            );
        });
        setFiltered(filteredData);
    }, [filter]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handlePesan = (id) => {
        setSelectedId(id);
        setIsOpen(true);
        if (isOpen === false) {
            setForm({ nama: "", email: "" })
            setQuantity(1);
        }
    };

    const handlePembelian = () => {
        setIsPembelian(!isPembelian);
    };

    const handleKode = async (e) => {
        e.preventDefault();

        setIsPembelian(false)
        const foundTransaction = dataTransaksi.find(transaksi => transaksi.kode === kodeRef.current.value);
        console.log(foundTransaction)

        if (foundTransaction) {
            // Cari pembeli berdasarkan id_pembeli
            const foundPembeli = pembeli.find(item => item.id === foundTransaction.id_pembeli);
            // Cari wisata berdasarkan id_wisata
            const foundWisata = filtered.find(item => item.id === foundTransaction.id_wisata);
    
            // Gabungkan data transaksi dengan data pembeli dan wisata
            const detailedTransaction = {
                ...foundTransaction,
                nama: foundPembeli ? foundPembeli.nama : "Nama tidak ditemukan",
                email: foundPembeli ? foundPembeli.email : "Email tidak ditemukan",
                destinasi: foundWisata ? foundWisata.destTitle : "Destinasi tidak ditemukan",
            };
    
            setDetailTransaksi(detailedTransaction); // Simpan data lengkap transaksi
            try {
                // Perbarui status transaksi menjadi "Sudah Bayar"
                await updateTransaksi(foundTransaction.id, { status: "Sudah Bayar" });
    
                // Update local state untuk mencerminkan perubahan
                setDataTransaksi((prevData) =>
                    prevData.map((item) =>
                        item.id === foundTransaction.id ? { ...item, status: "Sudah Bayar" } : item
                    )
                );
    
                setIsTransaksi(true); // Tampilkan detail transaksi
                // alert("Pembayaran berhasil! Status transaksi telah diperbarui.");
            } catch (error) {
                console.error("Gagal memperbarui transaksi:", error);
                // alert("Terjadi kesalahan saat memperbarui status transaksi.");
            }
        } else {
            setIsTransaksi(false); // Sembunyikan detail transaksi jika tidak ditemukan
            alert("Kode transaksi tidak ditemukan!");
        }
    
    }

    return (
        <section className="main container section" id="Main">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Destinasi Wisata
                </h3>
                <button data-aos="fade-left" className='btn flex' onClick={handlePembelian}><b>Pembayaran</b> <LuClipboardCheck className="icon" /></button>
            </div>

            <div className="secContent grid">
                {filtered.length > 0 ? (
                    filtered.map(({ id, imgSrc, destTitle, location, tag, fees, loc, description }) => (
                        <div key={id} data-aos="fade-up" data-aos-delay="100" className="singleDestination">
                            <div className="imageDiv">
                                <img src={imgSrc} alt={destTitle} />
                            </div>

                            <div className="cardInfo">
                                <h4 className="destTitle">{destTitle}</h4>
                                <span className="continent flex">
                                    <HiOutlineLocationMarker className="icon" />
                                    <span className="name">{location}</span>
                                </span>

                                <div className="fees flex">
                                    <div className="tag">
                                        <span>{tag}</span>
                                    </div>
                                    <div className="price">
                                        <h5>{fees}</h5>
                                    </div>
                                </div>

                                <div className="desc">
                                    <p>{description}</p>
                                </div>

                                <div className="buttonInfo flex">
                                    <a href={loc}>
                                        <button className="btn flex">
                                            LOKASI <HiOutlineLocationMarker className="icon" />
                                        </button>
                                    </a>

                                    <button className="btn flex" onClick={() => handlePesan(id)}>
                                        PESAN <LuClipboardCheck className="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div data-aos="fade-up" className="noData">
                        <img src={nodest} alt="no destinations" />
                        <h3>Oops!! Destinasi Anda Tidak Tersedia</h3>
                    </div>
                )}
            </div>

            {isOpen && selectedId && (
                <div className="pesanContent">
                    <div className="modalOverlay" />
                    <div className="detailContent" data-aos="fade-up" >
                        {filtered
                            .filter((item) => item.id === selectedId)
                            .map(({ id, destTitle, location, fees }) => {
                                const ticketPrice = parseInt(fees.replace('Rp ', '').replace('.', ''));
                                const totalPrice = ticketPrice * quantity;
                            
                                const incrementQuantity = () => setQuantity((prev) => prev + 1);
                                const decrementQuantity = () => {
                                    if (quantity > 1) setQuantity((prev) => prev - 1);
                                };
                            
                                const handleSubmit = async (e) => {
                                    e.preventDefault();
                                    setIsSubmitting(true);
                                    setPrice(totalPrice);
                                    // alert(
                                    //     `Pesanan Berhasil!\nNama: ${form.nama}\nEmail: ${form.email}\nJumlah Tiket: ${quantity}\nTotal Harga: Rp ${totalPrice.toLocaleString()}`
                                    // );
                                
                                    try {
                                        // Tambahkan pembeli terlebih dahulu
                                        const pembeliResult = await addPembeli(form);
                                        const idPembeli = pembeliResult.id; // ID pembeli baru dari response
                                        // alert(pembeliResult.message);
                                
                                        // Generate kode transaksi
                                        const kodeRandom = () => {
                                            let randomNumber = '';
                                            for (let i = 0; i < 16; i++) {
                                                randomNumber += Math.floor(Math.random() * 10);
                                            }
                                            return randomNumber;
                                        };
                                        const kodeTransaksi = kodeRandom();
                                
                                        // Tambahkan transaksi
                                        const transaksiData = {
                                            id_pembeli: idPembeli,
                                            kode: kodeTransaksi,
                                            id_wisata: selectedId,
                                            tanggal: tanggal,
                                            jumlah: quantity,
                                            total: totalPrice,
                                            status: 'Belum Bayar',
                                        };

                                        setDetailTransaksi({
                                            nama: form.nama,
                                            email: form.email,
                                            destinasi: destTitle,
                                            tanggal: tanggal,
                                            jumlah: quantity,
                                            total: totalPrice,
                                            kode: kodeTransaksi
                                        })
                                
                                        const transaksiResult = await addTransaksi(transaksiData);

                                        await sendEmail({
                                                nama: form.nama,
                                                email: form.email,
                                                destinasi: destTitle,
                                                tanggal: tanggal,
                                                jumlah: quantity,
                                                kodeTransaksi: kodeTransaksi,
                                                totalHarga: totalPrice.toLocaleString(),
                                            });

                                        // alert(transaksiResult.message);
                                
                                        setForm({ nama: "", email: "" }); // Reset form
                                        setQuantity(1);
                                    } catch (error) {
                                        console.error("Error adding data:", error);
                                        // alert("Terjadi kesalahan saat menyimpan data.");
                                    } finally {
                                        setIsSubmitting(false); // Sembunyikan loader setelah proses selesai
                                    }
                                
                                    setIsOpen(false);
                                    setTimeout(() => setIsPembelian(true), 300);
                                };
                                
                            
                                return (
                                    <form key={id} className="purchaseForm" onSubmit={handleSubmit}>
                                        {/* Close Icon */}
                                        <button
                                            type="button"
                                            className="closeButton"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            ✖
                                        </button>
                                
                                        {/* Ticket Information */}
                                        <h3>{destTitle}</h3>
                                        <p>Lokasi: {location}</p>
                                        <p>Harga Tiket: {fees}</p>
                                
                                        {/* User Inputs */}
                                        <label>
                                            Nama:
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({...form, nama: e.target.value})}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Email:
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({...form, email: e.target.value})}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Tanggal:
                                            <input
                                                type="date"
                                                value={form.tanggal}
                                                onChange={(e) => setTanggal(e.target.value)}
                                                required
                                            />
                                        </label>
                                
                                        {/* Ticket Quantity */}
                                        <div className="quantityControl">
                                            <button
                                                type="button"
                                                onClick={decrementQuantity}
                                                disabled={quantity <= 1}
                                                className='pesanbtn'
                                            >
                                                -
                                            </button>
                                            <span>{quantity}</span>
                                            <button type="button" onClick={incrementQuantity} className='pesanbtn'>
                                                +
                                            </button>
                                        </div>
                                
                                        {/* Total Price */}
                                        <p>Total Harga: Rp {totalPrice.toLocaleString()}</p>
                                
                                        {/* Submit Button */}
                                        {isSubmitting ? (
                                            <Loader />
                                        ) : (
                                            <button type="submit" className="btn">
                                                PESAN
                                            </button>
                                        )}
                                    </form>
                                );
                            })}
                    </div>
                </div>
            )}
            {isPembelian && (
                <div className='pesanContent'>
                <div className='modalOverlay' />
                <div className='detailContent' data-aos='fade-up'>
                    <form className='purchaseForm' onSubmit={handleKode}>
                        <button
                            type="button"
                            className="closeButton"
                            onClick={() => setIsPembelian(false)}
                        >
                            ✖
                        </button>
                        <h3>Pembayaran</h3>
                        <p>Silahkan lakukan pembayaran ke Virtual Account ini:</p>
                        <p className='va'>8740 0812 5580 2706</p>
                        <p className='infobayar'><b>*</b>Jika pembayaran sudah berhasil, silahkan cek email untuk menerima kode pembayaran<b>*</b></p>
                        <label>Kode Pembayaran:
                            <input type="text" required ref={kodeRef}/>
                        </label>
                            <p>Total Harga: Rp {price.toLocaleString()}</p>
                        <button type='submit' className="btn">
                            KIRIM
                        </button>
                    </form>
                </div>
            </div>
            )}
            {isTransaksi && (
                <div className='pesanContent'>
                    <div className='modalOverlay' />
                    <div className='detailContent' data-aos='fade-up'>
                        {detailTransaksi && (
                            <div className="purchaseForm">
                                <h1>Tiket Sudah Terverifikasi</h1>
                                <br />
                                <h3>Detail Tiket</h3>
                                <p><strong>Nama:</strong> {detailTransaksi.nama}</p>
                                <p><strong>Email:</strong> {detailTransaksi.email}</p>
                                <p><strong>Destinasi:</strong> {detailTransaksi.destinasi}</p>
                                <p><strong>Tanggal:</strong> {detailTransaksi.tanggal}</p>
                                <p><strong>Jumlah:</strong> {detailTransaksi.jumlah}</p>
                                <p><strong>Total Harga:</strong> Rp {detailTransaksi.total.toLocaleString()}</p>
                                <br />
                                <p className='infobayar'><b>*</b>Gunakan tiket pada email sebagai bukti pemesanan<b>*</b></p>
                                <br />
                                <button className="btn" onClick={() => setIsTransaksi(false)}>Konfirmasi</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}
        </section>
    );
};

export default Main;