// Data harga berdasarkan game
const gamePrices = {
    "Mobile Legends": {
        currency: "Diamonds",
        prices: [
            { amount: 5, price: 2000 },
            { amount: 12, price: 5000 },
            { amount: 50, price: 20000 },
            { amount: 100, price: 40000 },
            { amount: 150, price: 45000 },
        ],
    },
    "Free Fire": {
        currency: "Diamonds",
        prices: [
            { amount: 5, price: 1000 },
            { amount: 12, price: 2000 },
            { amount: 50, price: 8000 },
            { amount: 100, price: 10000 },
            { amount: 150, price: 19000 },
        ],
    },
    "Genshin Impact": {
        currency: "Genesis Crystal",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "PUBG": {
        currency: "UC",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "League of Legends: Wild Rift": {
        currency: "Cores",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "Arena Of Valor": {
        currency: "Vouchers",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "FC Mobile": {
        currency: "Silver",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "Call Of Duty Mobile": {
        currency: "CP",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
    "Zenless Zone Zero": {
        currency: "Monochrome",
        prices: [
            { amount: 60, price: 15000 },
            { amount: 300, price: 74000 },
            { amount: 980, price: 295000 },
            { amount: 1980, price: 590000 },
        ],
    },
};

if (window.location.pathname.includes("index.html")) {
    // Fungsi pencarian game
    document.getElementById("searchButton").addEventListener("click", () => {
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
        const gameCards = document.querySelectorAll(".game-card");

        gameCards.forEach((card) => {
            const gameName = card.getAttribute("data-name").toLowerCase();
            if (gameName.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Slider otomatis
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        const slideWidth = slides[0].clientWidth;
        sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    showSlide(currentIndex);
    startAutoSlide();
}

// Fungsi untuk mengarahkan ke halaman top-up
function goToTopUp(gameName) {
    localStorage.setItem("selectedGame", gameName);
    window.location.href = "topup.html";
}

// Saat halaman topup.html dimuat
if (window.location.pathname.includes("topup.html")) {
    const selectedGame = localStorage.getItem("selectedGame");
    const gameData = gamePrices[selectedGame];

    if (selectedGame && gameData) {
        const { currency, prices } = gameData;
        document.getElementById("selectedGame").innerText = `Anda memilih: ${selectedGame}`;
        const topupOptions = document.getElementById("topupOptions");

        prices.forEach((price) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "topup-card";
            optionDiv.dataset.amount = price.amount;
            optionDiv.dataset.price = price.price;
            optionDiv.innerHTML = `
                <span>${price.amount} ${currency}</span>
                <span style="display: block; margin-top: 5px;">Rp. ${price.price.toLocaleString()}</span>
            `;

            optionDiv.addEventListener("click", () => {
                document.querySelectorAll(".topup-card").forEach((card) => card.classList.remove("active"));
                optionDiv.classList.add("active");

                localStorage.setItem("selectedAmount", price.amount);
                localStorage.setItem("selectedPrice", price.price);
                localStorage.setItem("selectedCurrency", currency);
            });

            topupOptions.appendChild(optionDiv);
        });
    }

    // Show popup bangsat ajg
    function showPopup() {
        const playerId = document.getElementById("playerIdInput").value.trim();
        const paymentMethod = localStorage.getItem("selectedPaymentMethod");
        const selectedAmount = localStorage.getItem("selectedAmount");
    
        if (!playerId || !selectedAmount || !paymentMethod) {
            alert("Pastikan semua data telah diisi!");
            return;
        }
        
        document.getElementById("popup").style.display = "flex";
    }
    
    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }
    
    document.getElementById("confirmButton").addEventListener("click", () => {
        const playerId = document.getElementById("playerIdInput").value.trim();
        const paymentMethod = localStorage.getItem("selectedPaymentMethod");
    
        localStorage.setItem("playerId", playerId);
        window.location.href = "receipt.html";
    });
    

    // Menampilkan metode pembayaran
    const paymentMethodsContainer = document.getElementById("paymentMethods");
    const paymentMethods = [
        { name: "Gopay", image: "gopay.png" },
        { name: "OVO", image: "ovo.webp" },
        { name: "BRI", image: "bri.webp" },
        { name: "Link Aja", image: "linkaja.webp" },
    ];

    paymentMethods.forEach((method) => {
        const paymentDiv = document.createElement("div");
        paymentDiv.className = "payment-card";
        paymentDiv.dataset.method = method.name;
        paymentDiv.innerHTML = `
            <img src="./images/${method.image}" alt="${method.name}" class="payment-icon">
            <p>${method.name}</p>
        `;

        paymentDiv.addEventListener("click", () => {
            document.querySelectorAll(".payment-card").forEach((card) => card.classList.remove("active"));
            paymentDiv.classList.add("active");
            localStorage.setItem("selectedPaymentMethod", method.name);
        });

        paymentMethodsContainer.appendChild(paymentDiv);
    });
}

// Saat halaman receipt.html dimuat
if (window.location.pathname.includes("receipt.html")) {
    const selectedGame = localStorage.getItem("selectedGame");
    const playerId = localStorage.getItem("playerId");
    const selectedAmount = localStorage.getItem("selectedAmount");
    const selectedPrice = localStorage.getItem("selectedPrice");
    const selectedCurrency = localStorage.getItem("selectedCurrency");
    const paymentMethod = localStorage.getItem("selectedPaymentMethod");
    alert('Transaksi sukses');

    if (!selectedGame || !playerId || !selectedAmount || !selectedPrice || !selectedCurrency || !paymentMethod) {
        alert("Data tidak lengkap. Harap ulangi proses top-up.");
        window.location.href = "index.html";
    } else {
        document.getElementById("gameName").innerText = selectedGame;
        document.getElementById("playerId").innerText = playerId;
        document.getElementById("diamond").innerText = `${selectedAmount} ${selectedCurrency}`;
        document.getElementById("price").innerText = `Rp. ${parseInt(selectedPrice).toLocaleString()}`;
        document.getElementById("paymentMethod").innerText = paymentMethod;
    }
}