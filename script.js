// script.js

document.addEventListener('DOMContentLoaded', function() {

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
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownLink.addEventListener('click', function(e) {
            // Cegah perilaku default link (navigasi) jika bukan di mode mobile
            // Di desktop, kita tetap ingin hover, jadi e.preventDefault() hanya untuk klik di mobile
            // Atau, kita bisa selalu preventDefault dan menggunakan JS untuk navigasi jika tidak ada dropdown
            if (window.innerWidth <= 991) { // Sesuaikan dengan breakpoint menu hamburger Anda
                e.preventDefault();
                // Toggle kelas 'active' pada parent dropdown untuk menampilkan/menyembunyikan
                dropdown.classList.toggle('active');

                // Tutup dropdown lain yang mungkin terbuka (hanya untuk mode mobile)
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });

        // Di luar mode mobile, pastikan dropdown-content tidak memiliki display:block dari JS
        // Ini diatur oleh CSS hover di desktop
    });

    // Tutup semua dropdown saat klik di luar area dropdown (untuk desktop)
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 991 && !e.target.closest('.dropdown')) { // Hanya untuk desktop
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active'); // Pastikan tidak ada class active yang mengganggu hover
                // Kita tidak perlu mengubah display di sini karena CSS hover yang mengontrolnya
            });
        }
    });


    // --- Hamburger Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links'); // Target ul.nav-links

    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            navLinks.classList.add('menu-open'); // Tambahkan kelas untuk menampilkan menu
            // Menutup semua dropdown saat menu utama dibuka
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        } else {
            navLinks.classList.remove('menu-open'); // Hapus kelas untuk menyembunyikan menu
            // Menutup semua dropdown saat menu utama ditutup
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Tutup menu mobile saat item navigasi diklik
    // Kecuali jika itu adalah item dropdown parent (yang memiliki sub-menu)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) { // Hanya berlaku untuk mode mobile
                // Jika yang diklik adalah link parent dropdown (memiliki dropdown-content anak)
                // DAN bukan link PPDB (karena PPDB tidak punya sub-menu)
                const parentLi = this.closest('li');
                const isDropdownParent = parentLi && parentLi.classList.contains('dropdown');
                const isPpdbButton = this.classList.contains('btn-nav'); // Check if it's the PPDB button

                if (!isDropdownParent || isPpdbButton) { // Tutup menu jika bukan parent dropdown, atau jika itu tombol PPDB
                    menuToggle.checked = false;
                    navLinks.classList.remove('menu-open');
                    // Pastikan semua dropdown tertutup saat menu utama ditutup
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            }
        });
    });

    // Fungsi untuk menutup menu jika ukuran layar berubah dari mobile ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) { // Jika kembali ke desktop view
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
            if (targetId === '#') return; // Jangan scroll jika href hanya '#'

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust this offset value based on your fixed header's height
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Tambahan 20px padding

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
        if (tickerItems.length === 0) return; // Pastikan ada item sebelum beraksi

        // Hapus 'active' dari yang saat ini aktif
        const activeItem = document.querySelector('.ticker-item.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }

        currentTickerItem = (currentTickerItem + 1) % tickerItems.length;
        tickerItems[currentTickerItem].classList.add('active');
    }

    // Aktifkan item pertama dan mulai interval
    if (tickerItems.length > 0) {
        tickerItems[0].classList.add('active');
        setInterval(showNextTickerItem, 5000);
    }

    // --- Inisialisasi Lightbox ---
    // Tambahkan atribut data-lightbox ke setiap gambar di galeri
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach((img, index) => {
        // Assuming 'image.png' needs to be unique for each, if not, adjust logic
        // For demonstration, using the same name, but in a real scenario, these would be unique paths.
        // Also, add a caption if desired, e.g., img.alt
        img.setAttribute('data-lightbox', 'gallery-set');
        img.setAttribute('data-title', `Gallery Image ${index + 1}`); // Example caption
    });

    // Pastikan skrip lightbox sudah dimuat sebelum menginisialisasi
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': false
        });
    }
});
