document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    //          GLOBAL / UNIVERSAL FUNCTIONS
    //          (Header, Mobile Menu)
    // =====================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                navLinks.classList.add('active');
            } else {
                navLinks.classList.remove('active');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Adjust breakpoint if necessary
                    menuToggle.checked = false;
                    navLinks.classList.remove('active');
                }
            });
        });
    }


    // =====================================
    //             HERO SLIDER
    // =====================================
    const sliderItems = document.querySelectorAll('.hero-slider .slider-item');
    const sliderDotsContainer = document.querySelector('.hero-slider .slider-dots');
    let currentSlide = 0;
    let slideInterval;

    if (sliderItems.length > 0) {
        // Create dots
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
            sliderDotsContainer.appendChild(dot);
        });

        const sliderDots = document.querySelectorAll('.slider-dot');

        function showSlide(index) {
            sliderItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
            sliderDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            showSlide(currentSlide);
        }

        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideShow();
        }

        // Initialize slider
        showSlide(currentSlide);
        startSlideShow();
    }


    // =====================================
    //          ANNOUNCEMENT TICKER
    // =====================================
    const tickerContentWrapper = document.querySelector('.announcement-ticker .ticker-content');
    if (tickerContentWrapper) {
        const tickerItems = tickerContentWrapper.querySelectorAll('.ticker-item');
        let currentTickerIndex = 0;
        const intervalTime = 3000; // Change announcement every 3 seconds

        // Only run if there are ticker items
        if (tickerItems.length > 0) {
            function showTickerItem(index) {
                tickerItems.forEach((item, i) => {
                    if (i === index) {
                        item.classList.add('active'); // Add 'active' class
                    } else {
                        item.classList.remove('active'); // Remove 'active' class from others
                    }
                });
            }

            function nextTickerItem() {
                currentTickerIndex = (currentTickerIndex + 1) % tickerItems.length;
                showTickerItem(currentTickerIndex);
            }

            // Display the first item immediately
            showTickerItem(currentTickerIndex);

            // Start the interval for changing announcements
            setInterval(nextTickerItem, intervalTime);
        }
    }


    // =====================================
    //        DATA: ACHIEVEMENTS & NEWS
    //        (Moved here for central access)
    // =====================================
    const allPrestasiData = [
        {
            title: 'Juara 1 Lomba Sains Tingkat Provinsi',
            student: 'Muhammad Fatih',
            year: 2024,
            date: '20 Mei 2024',
            description: 'Siswa kami, Muhammad Fatih, berhasil meraih juara pertama dalam kompetisi sains tahunan tingkat provinsi, menunjukkan keunggulan dalam bidang Fisika. Prestasinya membawa kebanggaan bagi madrasah dan menjadi inspirasi bagi siswa lainnya. Persiapan yang matang dan bimbingan guru yang intensif menjadi kunci keberhasilannya.',
            icon: 'fas fa-medal'
        },
        {
            title: 'Tim Debat Raih Medali Emas Nasional',
            student: 'Tim Debat MATQ (Ahmad, Sarah, Budi)',
            year: 2024,
            date: '15 April 2024',
            description: 'Tim debat sekolah kami kembali mengharumkan nama sekolah dengan meraih medali emas di ajang debat tingkat nasional. Mereka menunjukkan kemampuan berpikir kritis, argumentasi yang kuat, dan kerjasama tim yang solid. Kemenangan ini adalah buah dari latihan rutin dan dedikasi.',
            icon: 'fas fa-trophy'
        },
        {
            title: 'Siswa Kami Dominasi Lomba Renang Regional',
            student: 'Khalid dan Aisyah',
            year: 2024,
            date: '01 Maret 2024',
            description: 'Tiga siswa berhasil menyabet berbagai medali emas dan perak dalam kejuaraan renang regional, membuktikan bakat olahraga mereka. Dedikasi mereka dalam berlatih dan semangat kompetisi patut diacungi jempol. Semoga prestasi ini terus memotivasi mereka untuk berprestasi di tingkat yang lebih tinggi.',
            icon: 'fas fa-swimmer'
        },
        {
            title: 'Juara Hafalan 30 Juz Tingkat Nasional',
            student: 'Fatimah Az-Zahra',
            year: 2023,
            date: '10 November 2023',
            description: 'Fatimah Az-Zahra berhasil meraih gelar juara pertama dalam Musabaqah Hifzil Quran (MHQ) 30 juz tingkat nasional. Prestasinya ini menunjukkan komitmen dan kesungguhan dalam menghafal dan memahami Al-Quran.',
            icon: 'fas fa-quran'
        },
        {
            title: 'Lomba Kaligrafi Terbaik Se-Kabupaten',
            student: 'Hasan Al-Farabi',
            year: 2023,
            date: '25 September 2023',
            description: 'Karya kaligrafi Hasan Al-Farabi memukau juri dan berhasil meraih posisi pertama dalam lomba kaligrafi antar madrasah se-kabupaten. Keindahan tulisan dan pesan yang disampaikan dalam karyanya menjadi daya tarik utama.',
            icon: 'fas fa-paint-brush'
        },
        {
            title: 'Finalis Olimpiade Matematika Nasional',
            student: 'Siti Aminah',
            year: 2023,
            date: '12 Agustus 2023',
            description: 'Siti Aminah berhasil melaju hingga babak final dalam Olimpiade Matematika tingkat nasional, bersaing dengan siswa-siswa terbaik dari seluruh Indonesia. Prestasinya ini membuktikan bahwa siswa madrasah juga unggul dalam bidang ilmu umum.',
            icon: 'fas fa-calculator'
        },
        {
            title: 'Juara Umum Pidato Bahasa Arab Se-Provinsi',
            student: 'Maryam Aliyah',
            year: 2022,
            date: '05 Juli 2022',
            description: 'Maryam Aliyah menunjukkan kefasihan dan keberaniannya dalam berpidato bahasa Arab, meraih juara umum di kompetisi tingkat provinsi. Kemampuannya ini mencerminkan kuatnya program bahasa di madrasah.',
            icon: 'fas fa-microphone'
        },
        {
            title: 'Tim Basket Putra Raih Juara 2 Tingkat Kota',
            student: 'Tim Basket MATQ Putra',
            year: 2022,
            date: '18 Juni 2022',
            description: 'Tim basket putra madrasah berhasil meraih juara kedua dalam turnamen basket antar sekolah tingkat kota. Kerja keras dan semangat tim yang tinggi membuahkan hasil yang membanggakan.',
            icon: 'fas fa-basketball-ball'
        }
        // Add more achievement data here
    ];

    const allNewsData = [
        {
            title: 'Penerimaan Santri Baru TA 2025/2026 Dimulai!',
            date: '3 Juli 2025',
            category: 'PPDB',
            description: 'Pendaftaran Peserta Didik Baru (PPDB) Madrasah Aliyah Tahfizul Quran untuk Tahun Ajaran 2025/2026 Gelombang 1 telah resmi dibuka. Jangan lewatkan kesempatan emas untuk bergabung dengan keluarga besar MATQ dan meraih pendidikan berkualitas yang memadukan ilmu agama dan umum. Informasi lengkap mengenai jadwal, syarat, dan prosedur pendaftaran dapat diakses di halaman PPDB kami.',
            image: 'https://raw.githubusercontent.com/ridhopryg/Madrasah-aliyah1/main/images/Berita%20PPDB.jpeg'
        },
        {
            title: 'Wisuda Tahfiz Angkatan Ke-5 Berlangsung Sukses',
            date: '20 Juni 2025',
            category: 'Acara',
            description: 'Alhamdulillah, acara Wisuda Tahfiz Angkatan Ke-5 Madrasah Aliyah Tahfizul Quran telah berlangsung sukses dan khidmat. Sebanyak 50 santri telah diwisuda sebagai penghafal 30 juz Al-Quran, menandai selesainya perjalanan mulia mereka dalam menghafal Kitabullah. Acara ini dihadiri oleh orang tua, guru, dan tokoh masyarakat, menjadi momen haru dan penuh kebanggaan.',
            image: 'https://via.placeholder.com/300x180/5c7a9b/ffffff?text=Berita+Wisuda'
        },
        {
            title: 'Workshop Tahsin & Tajwid untuk Asatidz',
            date: '15 Mei 2025',
            category: 'Pelatihan',
            description: 'Madrasah Aliyah Tahfizul Quran secara rutin mengadakan workshop untuk meningkatkan kompetensi guru (asatidz) dalam bidang tahsin dan tajwid Al-Quran. Workshop ini bertujuan untuk memastikan kualitas pengajaran tahfiz yang optimal dan sesuai dengan kaidah tajwid yang benar, demi melahirkan generasi penghafal Al-Quran yang mutqin.',
            image: 'https://via.placeholder.com/300x180/6a8eaf/ffffff?text=Berita+Workshop'
        },
        {
            title: 'Khotmil Quran Akbar Menjelang Ramadhan',
            date: '10 Maret 2025',
            category: 'Acara',
            description: 'Menyambut bulan suci Ramadhan, seluruh santri dan asatidz Madrasah Aliyah Tahfizul Quran menggelar acara Khotmil Quran Akbar. Kegiatan ini merupakan wujud syukur dan upaya mempererat hubungan dengan Al-Quran sebelum memasuki bulan penuh berkah.',
            image: 'https://via.placeholder.com/300x180/7b9bc0/ffffff?text=Berita+Khotmil'
        },
        {
            title: 'Kunjungan Studi ke Pusat Tahfiz Nasional',
            date: '20 Februari 2025',
            category: 'Edukasi',
            description: 'Siswa-siswi pilihan berkesempatan melakukan kunjungan studi ke salah satu pusat tahfiz terkemuka di tingkat nasional. Kunjungan ini diharapkan dapat memberikan inspirasi dan motivasi bagi para santri dalam menghafal Al-Quran serta menambah wawasan tentang metode tahfiz modern.',
            image: 'https://via.placeholder.com/300x180/8da7c4/ffffff?text=Berita+Kunjungan'
        }
        // Add more news data here
    ];


    // =====================================
    //      HIGHLIGHTS SECTION (Index.html)
    //      (Latest Achievements & News)
    // =====================================
    const prestasiHighlightContainer = document.getElementById('prestasi-highlight-container');
    const newsHighlightContainer = document.getElementById('news-highlight-container');

    if (prestasiHighlightContainer) {
        // Display 3 latest achievements
        const latestPrestasi = allPrestasiData.slice(0, 3);
        latestPrestasi.forEach(prestasi => {
            const card = document.createElement('article');
            card.classList.add('news-item'); // Reuse news-item class for styling
            card.innerHTML = `
                <h3>${prestasi.title}</h3>
                <p class="date"><i class="far fa-calendar-alt"></i> ${prestasi.date} | <i class="fas fa-user-graduate"></i> ${prestasi.student}</p>
                <p>${prestasi.description.substring(0, 100)}...</p>
                <a href="#" class="read-more show-prestasi-modal"
                   data-title="${prestasi.title}"
                   data-student="${prestasi.student}"
                   data-date="${prestasi.date}"
                   data-description="${prestasi.description}">Baca Selengkapnya <i class="fas fa-angle-right"></i></a>
            `;
            prestasiHighlightContainer.appendChild(card);
        });
    }

    if (newsHighlightContainer) {
        // Display 3 latest news
        const latestNews = allNewsData.slice(0, 3);
        latestNews.forEach(news => {
            const article = document.createElement('article');
            article.classList.add('news-item');
            article.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <h3>${news.title}</h3>
                <p class="date"><i class="far fa-calendar-alt"></i> ${news.date} | <i class="fas fa-tags"></i> ${news.category}</p>
                <p>${news.description.substring(0, 100)}...</p>
                <a href="#" class="read-more">Baca Selengkapnya <i class="fas fa-angle-right"></i></a>
            `;
            newsHighlightContainer.appendChild(article);
        });
    }


    // =====================================
    //       DYNAMIC ACHIEVEMENTS SECTION
    //       (Prestasi Page / Full List)
    // =====================================
    const prestasiGalleryContainer = document.getElementById('prestasi-gallery-container');
    const prestasiYearSelect = document.getElementById('prestasi-year-select');
    const viewAllPrestasiBtn = document.getElementById('view-all-prestasi-btn');
    const prestasiModalOverlay = document.getElementById('prestasi-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalStudent = document.getElementById('modal-student');
    const modalDate = document.getElementById('modal-date');
    const modalDescription = document.getElementById('modal-description');

    // Only run this block if the elements exist (i.e., you've added the full prestasi section to the page)
    if (prestasiGalleryContainer && prestasiYearSelect) {
        let displayedPrestasiCount = 6; // Number of achievements displayed initially
        const increment = 6; // Number of achievements added on "Load More" click

        function populateYearSelect() {
            const years = [...new Set(allPrestasiData.map(p => p.year))].sort((a, b) => b - a);
            prestasiYearSelect.innerHTML = '<option value="all">Semua Tahun</option>';
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                prestasiYearSelect.appendChild(option);
            });
        }

        function renderPrestasi() {
            prestasiGalleryContainer.innerHTML = ''; // Clear previous content
            const currentYearFilter = prestasiYearSelect.value;
            let filteredPrestasi = allPrestasiData;

            if (currentYearFilter !== 'all') {
                filteredPrestasi = allPrestasiData.filter(p => p.year == currentYearFilter);
            }

            const limitedPrestasi = filteredPrestasi.slice(0, displayedPrestasiCount);

            limitedPrestasi.forEach(prestasi => {
                const card = document.createElement('div');
                card.classList.add('achievement-card');
                card.innerHTML = `
                    <i class="${prestasi.icon} achievement-icon"></i>
                    <h3 class="achievement-title">${prestasi.title}</h3>
                    <p class="achievement-student">Oleh: ${prestasi.student}</p>
                    <p class="achievement-date">${prestasi.date}</p>
                    <button class="btn primary-btn show-prestasi-modal"
                            data-title="${prestasi.title}"
                            data-student="${prestasi.student}"
                            data-date="${prestasi.date}"
                            data-description="${prestasi.description}">Detail</button>
                `;
                prestasiGalleryContainer.appendChild(card);
            });

            // Show/hide "Lihat Semua" button
            if (displayedPrestasiCount < filteredPrestasi.length) {
                if (viewAllPrestasiBtn) viewAllPrestasiBtn.style.display = 'inline-block';
            } else {
                if (viewAllPrestasiBtn) viewAllPrestasiBtn.style.display = 'none';
            }
        }

        // Event Listeners for Prestasi Section
        prestasiYearSelect.addEventListener('change', function() {
            displayedPrestasiCount = 6; // Reset count on filter change
            renderPrestasi();
        });

        if (viewAllPrestasiBtn) {
            viewAllPrestasiBtn.addEventListener('click', function() {
                displayedPrestasiCount += increment;
                renderPrestasi();
            });
        }

        // Modal Functionality for Prestasi Details
        document.body.addEventListener('click', function(event) {
            if (event.target.classList.contains('show-prestasi-modal')) {
                event.preventDefault(); // Prevent default link behavior
                const data = event.target.dataset;
                modalTitle.textContent = data.title;
                modalStudent.textContent = `Oleh: ${data.student}`;
                modalDate.textContent = data.date;
                modalDescription.textContent = data.description;
                prestasiModalOverlay.classList.add('active');
            }
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function() {
                prestasiModalOverlay.classList.remove('active');
            });
        }

        if (prestasiModalOverlay) {
            prestasiModalOverlay.addEventListener('click', function(event) {
                if (event.target === prestasiModalOverlay) { // Close when clicking outside content
                    prestasiModalOverlay.classList.remove('active');
                }
            });
        }

        // Initial render on page load for Prestasi section
        populateYearSelect();
        renderPrestasi();
    }
});
