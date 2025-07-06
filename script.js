// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Data Prestasi (CONTOH) ---
    // Ganti ini dengan data prestasi Anda yang sebenarnya.
    // Jika Anda akan memuat data dari API, hapus array ini dan sesuaikan fungsi fetchPrestasiData.
    const allPrestasiData = [
        {
            id: 'prestasi1',
            icon: 'fas fa-trophy', // Contoh ikon Font Awesome
            title: 'Juara 1 Lomba Sains Tingkat Kabupaten',
            student: 'Budi Santoso (XII IPA)',
            date: '2024-10-26', // Format YYYY-MM-DD agar mudah difilter
            description: 'Budi Santoso berhasil meraih juara pertama dalam Lomba Sains tingkat Kabupaten Pontianak. Prestasi ini diraih berkat dedikasi dan bimbingan guru fisika, Ibu Fatimah. Lomba ini menguji kemampuan siswa dalam berpikir kritis dan memecahkan masalah sains. Budi menunjukkan keunggulan dalam setiap tahapan seleksi.'
        },
        {
            id: 'prestasi2',
            icon: 'fas fa-award',
            title: 'Medali Emas Olimpiade Matematika Provinsi',
            student: 'Siti Aminah (XI MIPA)',
            date: '2024-09-15',
            description: 'Siti Aminah berhasil menyumbangkan medali emas dalam Olimpiade Matematika tingkat Provinsi Kalimantan Barat. Kemenangan ini merupakan hasil dari latihan intensif selama berbulan-bulan dan dukungan penuh dari tim pembimbing matematika sekolah. Siti diharapkan dapat melaju ke tingkat nasional.'
        },
        {
            id: 'prestasi3',
            icon: 'fas fa-medal',
            title: 'Juara 2 Lomba Pidato Bahasa Inggris',
            student: 'Rina Dewi (X Bahasa)',
            date: '2024-08-01',
            description: 'Rina Dewi menunjukkan bakat luar biasa dalam berbahasa Inggris dengan meraih juara kedua dalam Lomba Pidato Bahasa Inggris se-Kota Pontianak. Penampilannya yang memukau dengan penguasaan tata bahasa dan intonasi yang baik membuatnya unggul di antara peserta lainnya.'
        },
        {
            id: 'prestasi4',
            icon: 'fas fa-football-ball',
            title: 'Juara 1 Turnamen Futsal Antar Sekolah',
            student: 'Tim Futsal Putra (XI & XII)',
            date: '2024-07-20',
            description: 'Tim Futsal Putra sekolah berhasil merebut gelar juara pertama dalam Turnamen Futsal Antar Sekolah. Kerja sama tim yang solid dan strategi yang matang menjadi kunci keberhasilan mereka. Kemenangan ini disambut meriah oleh seluruh warga sekolah.'
        },
        {
            id: 'prestasi5',
            icon: 'fas fa-paint-brush',
            title: 'Pameran Seni Rupa Tingkat Nasional',
            student: 'Aditya Pratama (XII Seni Budaya)',
            date: '2023-11-10',
            description: 'Karya seni rupa Aditya Pratama terpilih untuk dipamerkan dalam Pameran Seni Rupa Remaja Tingkat Nasional. Lukisan abstraknya yang berjudul "Harmoni Alam" mendapat banyak pujian dari kritikus seni dan pengunjung pameran.'
        },
        {
            id: 'prestasi6',
            icon: 'fas fa-book-reader',
            title: 'Juara 3 Lomba Debat Sejarah',
            student: 'Kelompok Debat Sejarah (X & XI)',
            date: '2023-09-22',
            description: 'Kelompok Debat Sejarah sekolah meraih juara ketiga dalam Lomba Debat Sejarah tingkat kota. Kemampuan mereka dalam menyajikan argumen, berpikir cepat, dan memahami materi sejarah dengan mendalam menjadi nilai plus.'
        },
        {
            id: 'prestasi7',
            icon: 'fas fa-microscope',
            title: 'Penelitian Ilmiah Remaja Terbaik',
            student: 'Tim Peneliti (XI MIPA)',
            date: '2023-05-18',
            description: 'Tim peneliti muda sekolah mendapatkan penghargaan sebagai "Penelitian Ilmiah Remaja Terbaik" untuk inovasi mereka dalam pengolahan limbah plastik menjadi bahan bakar alternatif. Proyek ini menunjukkan potensi besar dalam menciptakan solusi berkelanjutan.'
        },
        {
            id: 'prestasi8',
            icon: 'fas fa-music',
            title: 'Juara 1 Festival Band Akustik',
            student: 'Band "Harmoni Nada" (XII Seni Musik)',
            date: '2023-04-05',
            description: 'Band akustik sekolah, "Harmoni Nada", berhasil menjuarai Festival Band Akustik tingkat provinsi. Penampilan mereka yang energik dan harmonis dengan lagu-lagu ciptaan sendiri memukau para juri dan penonton.'
        },
        {
            id: 'prestasi9',
            icon: 'fas fa-swimmer',
            title: 'Medali Perak Kejuaraan Renang Kota',
            student: 'Maya Sari (X Olahraga)',
            date: '2022-12-01',
            description: 'Maya Sari mempersembahkan medali perak dalam Kejuaraan Renang Kota untuk gaya bebas 100 meter. Dedikasinya dalam berlatih dan semangat juangnya di lintasan sangat patut diacungi jempol.'
        },
        {
            id: 'prestasi10',
            icon: 'fas fa-chess',
            title: 'Juara 1 Turnamen Catur Antar Pelajar',
            student: 'Fahmi Rahman (XI IPA)',
            date: '2022-10-10',
            description: 'Fahmi Rahman menunjukkan kepiawaiannya dalam strategi catur dengan meraih juara pertama dalam Turnamen Catur Antar Pelajar se-Kabupaten. Kecerdasan dan ketenangannya di meja catur menjadi faktor penentu.'
        }
    ];

    let displayedPrestasiCount = 0;
    const initialPrestasiDisplayLimit = 6; // Jumlah prestasi yang ditampilkan awal
    const prestasiContainer = document.getElementById('prestasi-gallery-container');
    const yearSelect = document.getElementById('prestasi-year-select');
    const viewAllPrestasiBtn = document.getElementById('view-all-prestasi-btn');
    const modalOverlay = document.getElementById('prestasi-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // --- Slider Hero ---
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let autoSlideInterval; // Untuk mengontrol interval

    // Buat dots untuk slider
    function createDots() {
        sliderDotsContainer.innerHTML = ''; // Pastikan bersih sebelum membuat ulang
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot'); // Menggunakan class 'slider-dot' sesuai CSS
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide(); // Reset timer saat dot diklik
            });
            sliderDotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        // Hapus kelas 'active' dari semua slider item dan dots
        sliderItems.forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.slider-dot').forEach(dot => dot.classList.remove('active'));

        // Tambahkan kelas 'active' ke slider item dan dot yang sesuai
        sliderItems[index].classList.add('active');
        document.querySelectorAll('.slider-dot')[index].classList.add('active');

        currentSlide = index;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Inisialisasi slider
    if (sliderItems.length > 0) {
        createDots();
        goToSlide(0); // Pastikan slide pertama aktif saat DOMContentLoaded
        startAutoSlide();
    }

    // --- Dropdown Menu (untuk desktop dan mobile) ---
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a'); // Link utama dropdown

        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) { // Hanya aktifkan toggle di mode mobile
                e.preventDefault(); // Cegah navigasi langsung di mobile
                // Toggle kelas 'active' pada parent dropdown untuk menampilkan/menyembunyikan sub-menu
                dropdown.classList.toggle('active');

                // Tutup dropdown lain yang mungkin terbuka
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
            // Di desktop, CSS :hover akan menangani tampilan dropdown
        });
    });

    // --- Hamburger Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            navLinks.classList.add('menu-open');
            // Tutup semua dropdown saat menu utama dibuka
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        } else {
            navLinks.classList.remove('menu-open');
            // Tutup semua dropdown saat menu utama ditutup
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Tutup menu mobile saat item navigasi diklik
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                const parentLi = this.closest('li');
                const isDropdownParent = parentLi && parentLi.classList.contains('dropdown');
                const isPpdbButton = this.classList.contains('btn-nav');

                // Tutup menu jika bukan parent dropdown, atau jika itu tombol PPDB
                if (!isDropdownParent || isPpdbButton) {
                    menuToggle.checked = false;
                    navLinks.classList.remove('menu-open');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            }
        });
    });

    // Fungsi untuk menutup menu jika ukuran layar berubah dari mobile ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            if (menuToggle.checked) {
                menuToggle.checked = false;
                navLinks.classList.remove('menu-open');
            }
            // Pastikan dropdown desktop berfungsi dengan baik (hapus kelas 'active' dari mobile)
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Ticker Pengumuman ---
    const tickerItems = document.querySelectorAll('.ticker-item');
    let currentTickerItem = 0;

    function showNextTickerItem() {
        if (tickerItems.length === 0) return;

        const activeItem = document.querySelector('.ticker-item.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }

        currentTickerItem = (currentTickerItem + 1) % tickerItems.length;
        tickerItems[currentTickerItem].classList.add('active');
    }

    if (tickerItems.length > 0) {
        tickerItems[0].classList.add('active');
        setInterval(showNextTickerItem, 5000);
    }

    // --- Prestasi Section (Dynamic Filtering & Modals) ---

    // Fungsi untuk mendapatkan tahun unik dari data prestasi
    function getUniqueYears() {
        const years = new Set();
        allPrestasiData.forEach(item => {
            const year = new Date(item.date).getFullYear();
            years.add(year);
        });
        return Array.from(years).sort((a, b) => b - a); // Urutkan dari terbaru
    }

    // Fungsi untuk mengisi dropdown tahun
    function populateYearSelect() {
        const years = getUniqueYears();
        yearSelect.innerHTML = '<option value="all">Semua Tahun</option>'; // Opsi default
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    }

    // Fungsi untuk menampilkan prestasi ke DOM
    function renderPrestasi(filterYear = 'all', limit = null) {
        prestasiContainer.innerHTML = ''; // Bersihkan kontainer
        let filteredPrestasi = allPrestasiData;

        if (filterYear !== 'all') {
            filteredPrestasi = allPrestasiData.filter(item => {
                return new Date(item.date).getFullYear().toString() === filterYear;
            });
        }

        // Urutkan berdasarkan tanggal terbaru terlebih dahulu
        filteredPrestasi.sort((a, b) => new Date(b.date) - new Date(a.date));

        const prestasiToDisplay = limit ? filteredPrestasi.slice(0, limit) : filteredPrestasi;
        displayedPrestasiCount = prestasiToDisplay.length;

        if (prestasiToDisplay.length === 0) {
            prestasiContainer.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; color: var(--text-lighter);">Belum ada prestasi untuk tahun ini.</p>';
        } else {
            prestasiToDisplay.forEach(prestasi => {
                const card = document.createElement('div');
                card.classList.add('achievement-card');
                card.setAttribute('data-id', prestasi.id); // Untuk memudahkan pengambilan data saat modal

                card.innerHTML = `
                    <i class="${prestasi.icon} achievement-icon"></i>
                    <h3 class="achievement-title">${prestasi.title}</h3>
                    <p class="achievement-student">${prestasi.student}</p>
                    <p class="achievement-date">${new Date(prestasi.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                `;
                prestasiContainer.appendChild(card);
            });
        }

        // Tampilkan/sembunyikan tombol "Lihat Semua Prestasi"
        if (limit && filteredPrestasi.length > limit) {
            viewAllPrestasiBtn.style.display = 'inline-block';
            viewAllPrestasiBtn.textContent = `Lihat ${filteredPrestasi.length - limit} Prestasi Lainnya`;
        } else {
            viewAllPrestasiBtn.style.display = 'none';
        }
    }

    // Event Listener untuk filter tahun
    yearSelect.addEventListener('change', function() {
        const selectedYear = this.value;
        renderPrestasi(selectedYear, initialPrestasiDisplayLimit);
        // Pastikan tombol reset ke "Lihat Semua Prestasi" setelah filter berubah
        viewAllPrestasiBtn.textContent = `Lihat Semua Prestasi`; // Reset teks
    });

    // Event Listener untuk tombol "Lihat Semua Prestasi"
    viewAllPrestasiBtn.addEventListener('click', function() {
        const selectedYear = yearSelect.value;
        renderPrestasi(selectedYear); // Tampilkan semua tanpa limit
        this.style.display = 'none'; // Sembunyikan tombol setelah semua ditampilkan
    });

    // Event Listener untuk membuka modal saat kartu prestasi diklik
    prestasiContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.achievement-card');
        if (card) {
            const prestasiId = card.getAttribute('data-id');
            const selectedPrestasi = allPrestasiData.find(p => p.id === prestasiId);

            if (selectedPrestasi) {
                document.getElementById('modal-title').textContent = selectedPrestasi.title;
                document.getElementById('modal-student').textContent = selectedPrestasi.student;
                document.getElementById('modal-date').textContent = new Date(selectedPrestasi.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
                document.getElementById('modal-description').textContent = selectedPrestasi.description;

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Mencegah scroll body
            }
        }
    });

    // Event Listener untuk menutup modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        // Tutup modal jika klik di area overlay, bukan di dalam konten modal
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Mengembalikan scroll body
    }

    // Inisialisasi Prestasi saat halaman dimuat
    populateYearSelect();
    renderPrestasi('all', initialPrestasiDisplayLimit);


    // --- Inisialisasi Lightbox untuk Galeri Foto ---
    // Pastikan skrip lightbox sudah dimuat sebelum menginisialisasi
    // Hanya berlaku untuk .gallery-grid img
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach((img, index) => {
        // Asumsi gambar galeri memiliki path unik atau bisa diatur di sini
        img.setAttribute('data-lightbox', 'gallery-set');
        img.setAttribute('data-title', `Galeri Gambar ${index + 1}`); // Contoh caption
    });

    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': false
        });
    }

});
