/* ============================
   PRODUCT IMAGE ZOOM + SWIPE
============================ */

let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImg");
let currentImages = [];
let currentIndex = 0;

// OPEN MODAL
document.querySelectorAll(".product-img").forEach((img) => {
    img.addEventListener("click", () => {
        currentImages = JSON.parse(img.dataset.images);
        currentIndex = 0;
        modal.style.display = "flex";
        modalImg.src = currentImages[currentIndex];
    });
});

// CLOSE MODAL
document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
};

// NEXT IMAGE
document.querySelector(".next").onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
};

// PREV IMAGE
document.querySelector(".prev").onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
};

// SWIPE SUPPORT
let touchStartX = 0;

modalImg.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

modalImg.addEventListener("touchend", (e) => {
    let touchEndX = e.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50) {
        document.querySelector(".next").click();
    } else if (touchEndX - touchStartX > 50) {
        document.querySelector(".prev").click();
    }
});


/* ============================
        CATEGORY FILTER
============================ */

const categoryButtons = document.querySelectorAll(".category-btn");
const products = document.querySelectorAll(".product-card");

categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {

        // ACTIVE BUTTON STYLE
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        let category = btn.dataset.category;

        // FILTER PRODUCT
        products.forEach((product) => {
            if (category === "all") {
                product.style.display = "block";
            } else if (product.dataset.category === category) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});


/* ============================
           SEARCH BAR
============================ */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    let text = searchInput.value.toLowerCase();

    products.forEach((product) => {
        let name = product.querySelector(".product-title").innerText.toLowerCase();

        if (name.includes(text)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});


/* ============================
       ANIMATION ON SCROLL
============================ */

const cards = document.querySelectorAll(".product-card");

function revealCards() {
    let trigger = window.innerHeight * 0.85;

    cards.forEach((card) => {
        let top = card.getBoundingClientRect().top;

        if (top < trigger) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.7s ease";
});

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);



/* ======================================
   MAGNETIC HOVER — CLEAN IMPLEMENTATION
   (Replaces broken block)
====================================== */

(function initMagneticHover() {
    const magneticButtons = document.querySelectorAll(
        ".category-btn, .contact-btn"
    );

    magneticButtons.forEach(btn => {
        btn.addEventListener("mousemove", e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            btn.classList.add("magnet-hover");
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.classList.remove("magnet-hover");
            btn.style.transform = "translate(0, 0)";
        });
    });
})();
