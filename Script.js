// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk slider hero
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Buat dots untuk slider
    sliderItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        sliderDots.appendChild(dot);
    });
    
    function goToSlide(index) {
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderItems[index].classList.add('active');
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Fungsi untuk dropdown menu
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            content.classList.toggle('show');
            
            // Tutup dropdown lainnya
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                }
            });
        });
    });
    
    // Tutup dropdown saat klik di luar
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('show');
            });
        }
    });
    
    // Fungsi untuk hamburger menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            navLinks.style.display = 'block';
            setTimeout(() => {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
            }, 10);
        } else {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        }
    });
    
    // Tutup menu mobile saat item diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Fungsi untuk smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fungsi untuk ticker pengumuman
    const tickerItems = document.querySelectorAll('.ticker-item');
    let currentTickerItem = 0;
    
    function showNextTickerItem() {
        tickerItems[currentTickerItem].classList.remove('active');
        currentTickerItem = (currentTickerItem + 1) % tickerItems.length;
        tickerItems[currentTickerItem].classList.add('active');
    }
    
    // Aktifkan item pertama
    if (tickerItems.length > 0) {
        tickerItems[0].classList.add('active');
        setInterval(showNextTickerItem, 5000);
    }
    
    // Inisialisasi lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': false
        });
    }
});
