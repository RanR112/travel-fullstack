-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Jan 2025 pada 17.44
-- Versi server: 8.0.30
-- Versi PHP: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wjtour`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembeli`
--

CREATE TABLE `pembeli` (
  `id` int NOT NULL,
  `nama` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `pembeli`
--

INSERT INTO `pembeli` (`id`, `nama`, `email`) VALUES
(96, 'Randy Rafael', 'randyrafael112@gmail.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `kode` varchar(16) NOT NULL,
  `id_pembeli` int NOT NULL,
  `id_wisata` int NOT NULL,
  `jumlah` int NOT NULL,
  `total` int NOT NULL,
  `status` enum('Sudah Bayar','Belum Bayar') NOT NULL,
  `tanggal` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `kode`, `id_pembeli`, `id_wisata`, `jumlah`, `total`, `status`, `tanggal`) VALUES
(64, '9928816600988643', 96, 14, 2, 4000, 'Sudah Bayar', '2025-01-11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wisata`
--

CREATE TABLE `wisata` (
  `id` int NOT NULL,
  `nama` varchar(55) NOT NULL,
  `lokasi` varchar(55) NOT NULL,
  `kategori` varchar(55) NOT NULL,
  `harga` int NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `wisata`
--

INSERT INTO `wisata` (`id`, `nama`, `lokasi`, `kategori`, `harga`, `deskripsi`) VALUES
(1, 'Kawah Putih', 'Bandung', 'Wisata Alam', 80000, 'Kawah Putih adalah sebuah kawah vulkanik yang terletak di Gunung Patuha, Jawa Barat. Kawah ini terkenal karena warna danau di dalamnya yang berwarna putih kehijauan akibat tingginya kandungan belerang dan gas-gas vulkanik'),
(2, 'Ciherang', 'Sumedang', 'Wisata Alam', 25000, 'Wisata Kampung Ciherang, merupakan area kawasan wisata yang memanfaatkan lahan perhutani. Kawasan lebih dari 3 hektar ini dipenuhi pohon-pohon cemara dan pinus yang membuat areanya sangat sejuk meski saat siang hari.'),
(3, 'Curug Cikondang', 'Cianjur', 'Wisata Alam', 5000, 'Curug Cikondang adalah sebuah air terjun cantik yang memiliki bentuk yang tinggi dan lebar, curug ini terletak di Kabupaten Cianjur, Desa Sukadana. Bentuk dari air terjun ini mengingatkan pada air terjun Niagara yang berada di negara Amerika.'),
(4, 'Taman Safari Indonesia Bogor', 'Bogor', 'Kebun Binatang', 275000, 'Taman Safari Indonesia adalah tempat wisata keluarga berwawasan lingkungan yang berorientasi pada habitat satwa di alam bebas. Taman Safari Indonesia terletak di Desa Cibeureum Kecamatan Cisarua, Kabupaten Bogor, Jawa Barat atau yang lebih dikenal dengan kawasan Puncak'),
(5, 'Green Canyon', 'Pangandaran', 'Wisata Alam', 45000, 'Green Canyon atau Cukang Taneuh, adalah sebuah destinasi wisata alam yang terletak di Pangandaran, Jawa Barat. Tempat ini terkenal dengan keindahan alamnya yang memukau, terutama sungainya yang berwarna hijau tosca yang mengalir di antara tebing-tebing batu karang.'),
(6, 'Kebun Raya', 'Bogor', 'Objek Wisata', 25000, 'Kebun Raya Bogor atau Kebun Botani Bogor adalah sebuah kebun botani besar yang terletak di Kota Bogor, Indonesia. Kebun ini dioperasikan oleh Badan Riset dan Inovasi Nasional. Kebun ini terletak di pusat kota Bogor dan bersebelahan dengan kompleks istana kepresidenan Istana Bogor'),
(7, 'Tangkuban Perahu', 'Subang', 'Wisata Alam', 30000, 'Gunung Tangkuban Parahu adalah salah satu gunung yang terletak di Desa Ciater, Kabupaten Subang, Provinsi Jawa Barat, Indonesia. Sekitar 20 km ke arah utara Kota Bandung, dengan rimbun pohon pinus dan hamparan kebun teh di sekitarnya, Gunung Tangkuban Parahu mempunyai ketinggian setinggi 2.084 meter'),
(8, 'Orchid Forest Cikole', 'Bandung', 'Wisata Alam', 60000, 'Orchid Forest Cikole adalah hutan anggrek terbesar di Indonesia. Enggak main-main, jumlah anggrek di sini mencapai 20.000 tanaman! Selain anggrek, barisan pohon pinus yang ada di sana juga membuat pemandangan Orchid Forest Cikole menjadi sangat indah.'),
(9, 'Dusun Bambu Lembang', 'Bandung', 'Objek Wisata', 20000, 'Dusun Bambu adalah sebuah tempat wisata yang terletak di Lembang, Bandung, Jawa Barat, Indonesia. Tempat ini menawarkan berbagai fasilitas rekreasi dan kuliner yang cocok untuk dikunjungi bersama keluarga atau teman-teman. Dusun Bambu memiliki suasana alam yang sejuk dan hijau, serta berbagai wahana seperti taman bermain, restoran, dan tempat belanja.'),
(10, 'Astro Highland Ciater', 'Subang', 'Wisata Alam', 20000, 'Astro Highland Ciater Subang adalah sebuah resor peristirahatan yang terletak di Ciater, Subang, Jawa Barat, Indonesia. Ini adalah tempat populer untuk liburan karena pemandian air panas alaminya dan pemandangan pegunungan yang menakjubkan.'),
(11, 'Pantai Karang Gantungan', 'Subang', 'Pantai', 5000, 'Pantai Karang Gantungan terkenal dengan panorama alamnya yang menakjubkan, pasir putihnya yang lembut, dan air lautnya yang jernih. Terletak di Kabupaten Subang, pantai ini menjadi destinasi populer bagi wisatawan yang ingin menikmati keindahan alam dan aktivitas pantai.'),
(12, 'Maribaya Hot Spring Resort', 'Lembang', 'Wisata Alam', 35000, 'Maribaya Hot Spring Resort, terletak di Lembang, Jawa Barat, Indonesia, menawarkan pengalaman relaksasi dan pemandian air panas alami yang menarik. Resor ini dikenal dengan kualitas air belerang yang tinggi dan memiliki berbagai fasilitas yang memungkinkan pengunjung untuk menikmati berbagai aktivitas.'),
(13, 'Air Terjun Lembah Tepus', 'Bogor', 'Wisata Alam', 10000, 'Air Terjun Lembah Tepus menawarkan berbagai aktivitas menarik, seperti trekking dan hiking, camping, dan berenang di tengah hutan. Pengunjung dapat menikmati keindahan alam yang menakjubkan dan suasana tenteram di tengah hutan.'),
(14, 'Museum Geologi Bandung', 'Bandung', 'Museum', 2000, 'Fasilitas yang ada di Museum Geologi Bandung ini cukup lengkap dan terawat dengan baik, Selain ruang peraga, Museum Geologi Bandung juga memiliki fasilitas tambahan lain seperti auditorium untuk pemutaran film, seminar dan kegiatan lainnya, ruang edukasi dan poliklinik.'),
(15, 'The Great Asia Afrika', 'Bandung', 'Objek Wisata', 50000, 'Di tempat ini Anda bisa menikmati wisata bersama keluarga sambil menikmati berbagai budaya dari 7 benua dengan kuliner tradisional dari masing-masing benua tersebut. Terdapat berbagai macam bangunan iconic dari berbagai negara di sini yang bisa Anda manfaatkan untuk berfoto dan mengabadikan momen bersama keluarga dan orang tersayang.'),
(16, 'Taman Hutan Raya Ir. H. Djuanda', 'Bandung', 'Wisata Alam', 15000, 'Taman hutan ini merupakan salah satu destinasi favorit bagi warga Bandung dan sekitarnya, di sini Anda bisa menikmati suasana hutan yang sejuk, rindang dan damai tanpa perlu khawatir tersesat karena sudah disediakan jalan setapak dan jalur pejalan kaki yang terawat dengan baik.'),
(17, 'Curug Dago', 'Bandung', 'Wisata Alam', 15000, 'Curug Dago adalah sebuah air terjun yang terletak di Kecamatan Coblong, Dago, Bandung. Air terjun Curug Dago memang tidak terlalu tinggi, hanya sekitar 10 meter tingginya, namun air terjun tersembunyi ini sangatlah indah dan menarik untuk dilihat. Curug Dago tidak terlalu terkenal di telinga wisatawan, namun tidak ada salahnya mencoba datang ke Curug Dago.'),
(18, 'Farmhouse Lembang', 'Bandung', 'Objek Wisata', 30000, 'Farmhouse Lembang Bandung menjadi objek wisata yang sangat cocok untuk pilihan liburan bersama orang terdekat, seperti pasangan, teman, sahabat, hingga keluarga. Objek wisata ini tersedia untuk semua kalangan usia. Tidak heran jika setiap hari atau akhir pekan tempat ini selalu ramai oleh wisatawan.'),
(19, 'Kota Bunga Little Venice', 'Cianjur', 'Objek Wisata', 55000, 'Tempat wisata ini tidak cuma mengusung konsep miniatur dari kota Venice, tetapi juga menggabungkan budaya Eropa klasik dengan berbagai wahana permainan yang menarik.');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `pembeli`
--
ALTER TABLE `pembeli`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `KODE` (`kode`),
  ADD KEY `id_pembeli` (`id_pembeli`),
  ADD KEY `id_wisata` (`id_wisata`);

--
-- Indeks untuk tabel `wisata`
--
ALTER TABLE `wisata`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pembeli`
--
ALTER TABLE `pembeli`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT untuk tabel `wisata`
--
ALTER TABLE `wisata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_wisata`) REFERENCES `wisata` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
