document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    // Cek preferensi dark mode dari penyimpanan lokal
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Deteksi preferensi sistem operasi
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light-mode';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
    });

    // Hamburger Menu
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Tutup menu saat link diklik (untuk mobile)
    document.querySelectorAll('.nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

// Initialize Slick Carousel for services section
    // Ensure jQuery is loaded before this script runs
    if (typeof jQuery !== 'undefined') {
        $('.service-carousel').slick({
            infinite: true,
            slidesToShow: 3, // Show 3 items at a time on desktop
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000, // Slightly slower autoplay for a softer feel
            speed: 800, // Transition speed (milliseconds) - makes sliding smoother
            dots: true, // Show navigation dots
            arrows: true, // Show navigation arrows
            cssEase: 'ease-in-out', // Smooth transition timing function
            responsive: [
                {
                    breakpoint: 992, // Tablet and smaller
                    settings: {
                        slidesToShow: 2, // Show 2 items
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768, // Mobile and smaller
                    settings: {
                        slidesToShow: 1, // Show 1 item
                        slidesToScroll: 1
                    }
                }
            ]
        });
    } else {
        console.error("jQuery is not loaded. Slick Carousel requires jQuery.");
    }

    // Pastikan filter selection 'all' dijalankan saat DOMContentLoaded
    filterSelection("all");

    // Add active class to the current button (highlight it)
    // Event listener ini sekarang tidak perlu lagi secara eksplisit mengubah kelas 'active'
    // karena filterSelection() sudah menangani itu. Namun, tetap diperlukan untuk trigger filterSelection
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
            // filterSelection akan dipanggil oleh onclick di HTML button
            // Kita bisa menghapus kode ini jika onclick di HTML button sudah memanggil filterSelection
            // Jika Anda ingin event listener ini yang mengatur filter, pastikan onclick di HTML dihapus
            // Untuk menghindari duplikasi, kita akan biarkan onclick di HTML yang memanggil filterSelection
            // dan pastikan filterSelection() sendiri yang mengatur kelas 'active'.
            // Maka, bagian ini hanya akan berfungsi sebagai "pemantau" atau bisa dihapus
            // jika filterSelection() dipanggil dari onclick pada button HTML.
        });
    }
});


// Fungsi untuk menambah kelas (sudah ada)
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Fungsi untuk menghapus kelas (sudah ada)
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Fungsi filterSelection yang Diperbarui
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";

    // Sembunyikan semua elemen terlebih dahulu
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
    }

    // Tambahkan kelas "show" ke elemen yang difilter
    for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf(c) > -1) {
            w3AddClass(x[i], "show");
        }
    }

    // ************ LOGIKA PENTING UNTUK MENGAKTIFKAN TOMBOL ************
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");

    for (var i = 0; i < btns.length; i++) {
        // Hapus kelas 'active' dari semua tombol
        w3RemoveClass(btns[i], "active");

        // Tambahkan kelas 'active' ke tombol yang sesuai
        // Menggunakan data-category untuk identifikasi yang lebih baik
        if (btns[i].getAttribute('data-category') === c) {
            w3AddClass(btns[i], "active");
        }
        // Penanganan khusus untuk "Show all" jika 'c' adalah string kosong (setelah diset c = "")
        else if (c === "" && btns[i].getAttribute('data-category') === "all") {
            w3AddClass(btns[i], "active");
        }
    }
    // *****************************************************************
}

// Fungsi baru untuk scroll dan filter
function scrollToPortfolioAndFilter(category) {
    // Scroll ke bagian portfolio
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Panggil fungsi filterSelection yang sudah diperbarui
    filterSelection(category);
}


// Inisialisasi filter saat halaman dimuat
// filterSelection("all"); // Pindahkan ini ke DOMContentLoaded atau hapus jika sudah ada di sana

// Modal functionality (sudah ada)
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const images = document.querySelectorAll(".clickable-img");
const closeBtn = document.querySelector(".close");

// Buka modal saat gambar diklik
images.forEach(function(img) {
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
});

// Klik tombol close (X)
closeBtn.onclick = function () {
    modal.style.display = "none";
};

// Klik di luar gambar = tutup modal
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
};