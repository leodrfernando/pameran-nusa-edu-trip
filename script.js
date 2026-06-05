// Memastikan seluruh elemen DOM web dimuat dengan aman
document.addEventListener("DOMContentLoaded", function () {

    // 1. HAMBURGER MENU PADA MODUL SELULER (MOBILE MOVEMENT)
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            
            // Animasi rotasi sederhana tombol hamburger
            const bars = mobileMenu.querySelectorAll(".bar");
            bars.forEach(bar => bar.classList.toggle("change"));
        });

        // Menutup menu otomatis jika salah satu navigasi link diklik oleh pengunjung
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // 2. SMOOTH SCROLL (PERPINDAHAN HALAMAN HALUS)
    const links = document.querySelectorAll('.nav-menu a[href^="#"]');
    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Mencegah lompatan kasar bawaan browser
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Menghitung kompensasi jarak agar tidak tertutup menu navigasi atas yang melayang
                window.scrollTo({
                    top: targetSection.offsetTop - 75,
                    behavior: "smooth"
                });
            }
        });
    }

    // 3. SCROLL INTERACTION ANIMATION (MUNCUL PERLAHAN KETIKA DI-SCROLL)
    const animatedSections = document.querySelectorAll(".section-animate");

    function checkVisibility() {
        const triggerPoint = window.innerHeight * 0.85; // Menentukan ambang area pandang

        animatedSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerPoint) {
                section.classList.add("show"); // Membuka modul kelas efek CSS show
            }
        });
    }

    // Jalankan kalkulasi pengecekan saat pertama dibuka dan setiap kali di-scroll
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);

    // 4. FALLBACK PENANGANAN ERROR LINK GAMBAR RUSAK / KOSONG
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("error", function () {
            // Sembunyikan elemen gambar asli yang rusak
            this.style.display = "none";
            
            // Buat kotak penanda pengganti (fallback container)
            const fallbackContainer = document.createElement("div");
            fallbackContainer.style.width = this.className.includes("team-img") ? "140px" : "100%";
            fallbackContainer.style.height = this.className.includes("team-img") ? "140px" : "200px";
            fallbackContainer.style.backgroundColor = "#e0e0e0";
            fallbackContainer.style.color = "#555";
            fallbackContainer.style.display = "flex";
            fallbackContainer.style.alignItems = "center";
            fallbackContainer.style.justifyContent = "center";
            fallbackContainer.style.borderRadius = window.getComputedStyle(this).borderRadius;
            fallbackContainer.style.margin = "10px auto";
            fallbackContainer.style.fontSize = "0.9rem";
            fallbackContainer.style.padding = "10px";
            fallbackContainer.style.textAlign = "center";
            fallbackContainer.innerText = "Gambar belum ditambahkan";
            
            // Sisipkan wadah pengganti tepat di posisi elemen gambar yang error
            this.parentNode.insertBefore(fallbackContainer, this.nextSibling);
        });
    });

});