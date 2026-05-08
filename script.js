/* =========================
   LOADING SCREEN
========================= */
window.addEventListener("load", () => {
    const loading = document.getElementById("loadingContainer");

    setTimeout(() => {
        loading.style.opacity = "0";
        loading.style.pointerEvents = "none";

        setTimeout(() => {
            loading.style.display = "none";
        }, 500);

        startAnimations();
    }, 1200);
});

/* =========================
   GSAP ANIMATIONS
========================= */
function startAnimations() {

    if (typeof gsap !== "undefined") {

        gsap.from(".profile-image-wrapper", {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        });

        gsap.from(".profile-name", {
            duration: 1,
            y: 40,
            opacity: 0,
            delay: 0.3
        });

        gsap.from(".profile-username", {
            duration: 1,
            y: 20,
            opacity: 0,
            delay: 0.5
        });

        gsap.from(".profile-bio", {
            duration: 1,
            y: 20,
            opacity: 0,
            delay: 0.7
        });

        gsap.from(".main-button", {
            duration: 1,
            y: 40,
            opacity: 0,
            delay: 0.9
        });

        gsap.from(".action-btn", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            delay: 1
        });

        gsap.from(".social-card", {
            duration: 1,
            y: 60,
            opacity: 0,
            stagger: 0.1,
            delay: 1.2
        });

    }
}

/* =========================
   MOBILE NAVBAR
========================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* =========================
   DARK / LIGHT MODE
========================= */
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = darkToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");
    }

});

/* =========================
   LOAD SAVED THEME
========================= */
window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        const icon = darkToggle.querySelector("i");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }

});

/* =========================
   SOCIAL CARD MODALS
========================= */
const socialCards = document.querySelectorAll(".social-card");

socialCards.forEach(card => {

    card.addEventListener("click", () => {

        const platform = card.dataset.platform;

        if (platform === "youtube") {
            openModal("youtubeModal");
        }

        if (platform === "tiktok") {
            openModal("tiktokModal");
        }

    });

});

/* =========================
   OPEN MODAL
========================= */
function openModal(id) {

    const modal = document.getElementById(id);

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal(id) {

    const modal = document.getElementById(id);

    modal.classList.remove("active");

    document.body.style.overflow = "auto";
}

/* =========================
   CLOSE MODAL OUTSIDE CLICK
========================= */
window.addEventListener("click", (e) => {

    document.querySelectorAll(".modal").forEach(modal => {

        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }

    });

});

/* =========================
   ESC KEY CLOSE MODAL
========================= */
window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("active");
        });

        document.body.style.overflow = "auto";
    }

});

/* =========================
   COPY PROFILE LINK
========================= */
const copyLink = document.getElementById("copyLink");

copyLink.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(window.location.href);

        showToast("Link profile berhasil disalin!");

    } catch (error) {

        showToast("Gagal menyalin link!");

    }

});

/* =========================
   SHARE BUTTON
========================= */
const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

    if (navigator.share) {

        try {

            await navigator.share({
                title: "Blacki Imut",
                text: "Kunjungi profile Blacki Imut",
                url: window.location.href
            });

        } catch (error) {
            console.log(error);
        }

    } else {

        openModal("shareModal");

    }

});

/* =========================
   QR BUTTON
========================= */
const qrBtn = document.getElementById("qrBtn");

qrBtn.addEventListener("click", () => {
    openModal("qrModal");
});

/* =========================
   DOWNLOAD QR
========================= */
function downloadQR() {

    const qrImage = document.querySelector(".qr-code");

    const link = document.createElement("a");

    link.href = qrImage.src;
    link.download = "blacki-imut-qr.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    showToast("QR Code berhasil didownload!");
}

/* =========================
   SHARE FUNCTIONS
========================= */
function shareToWhatsApp() {

    const text = encodeURIComponent(
        "Kunjungi profile Blacki Imut 🚀 " + window.location.href
    );

    window.open(
        `https://wa.me/?text=${text}`,
        "_blank"
    );
}

function shareToTelegram() {

    const text = encodeURIComponent(
        "Kunjungi profile Blacki Imut 🚀"
    );

    window.open(
        `https://t.me/share/url?url=${window.location.href}&text=${text}`,
        "_blank"
    );
}

function shareToTwitter() {

    const text = encodeURIComponent(
        "Kunjungi profile Blacki Imut 🚀"
    );

    window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${window.location.href}`,
        "_blank"
    );
}

function shareToFacebook() {

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank"
    );
}

function copyShareLink() {

    navigator.clipboard.writeText(window.location.href);

    showToast("Link berhasil disalin!");
}

/* =========================
   TOAST NOTIFICATION
========================= */
function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast-notification";

    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}

/* =========================
   TOAST STYLE
========================= */
const toastStyle = document.createElement("style");

toastStyle.innerHTML = `
.toast-notification {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(
        135deg,
        #00d4ff,
        #8b5cf6
    );
    color: white;
    padding: 16px 24px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    z-index: 999999;
    transform: translateY(120px);
    opacity: 0;
    transition: all 0.35s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.toast-notification.show {
    transform: translateY(0);
    opacity: 1;
}

@media (max-width: 768px) {
    .toast-notification {
        right: 20px;
        left: 20px;
        bottom: 20px;
        justify-content: center;
    }
}
`;

document.head.appendChild(toastStyle);

/* =========================
   PARALLAX EFFECT
========================= */
window.addEventListener("mousemove", (e) => {

    const particles = document.getElementById("particles");

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    particles.style.transform = `
        translate(
            ${x * 20}px,
            ${y * 20}px
        )
    `;
});

/* =========================
   BUTTON RIPPLE EFFECT
========================= */
document.querySelectorAll("button, .main-button").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 700);

    });

});

/* =========================
   RIPPLE STYLE
========================= */
const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `
button,
.main-button {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ripple-effect 0.7s linear;
    pointer-events: none;
}

@keyframes ripple-effect {
    from {
        width: 0;
        height: 0;
        opacity: 1;
    }

    to {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}
`;

document.head.appendChild(rippleStyle);

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/* =========================
   AUTO YEAR FOOTER
========================= */
const footerYear = document.querySelector(".footer-content p");

if (footerYear) {

    footerYear.innerHTML =
        `&copy; ${new Date().getFullYear()} Blacki Imut. All rights reserved.`;
}
