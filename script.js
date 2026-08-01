document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================
    // 1. CẤU HÌNH DANH SÁCH ẢNH ALBUM (Tự động nạp từ a9 (1) -> a9 (12))
    // ==========================================================
    const imageList = [
        "images/a9 (1).jpg",
        "images/a9 (2).jpg",
        "images/a9 (3).jpg",
        "images/a9 (4).jpg",
        "images/a9 (5).jpg",
        "images/a9 (6).jpg",
        "images/a9 (7).jpg",
        "images/a9 (8).jpg",
        "images/a9 (9).jpg",
        "images/a9 (10).JPG",
        "images/a9 (11).JPG",
        "images/a9 (12).jpg",
        "images/tap-the-a9-now.jpg"
    ];

    const slideshowWrapper = document.getElementById('slideshowWrapper');
    const thumbsWrapper = document.getElementById('thumbsWrapper');

    if (slideshowWrapper && thumbsWrapper) {
        imageList.forEach((imgSrc) => {
            // Nạp ảnh chính
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${imgSrc}" onerror="this.src='${imgSrc.replace('images/', '')}'" alt="A9 Kỷ niệm">`;
            slideshowWrapper.appendChild(slide);

            // Nạp ảnh Thumbnail
            const thumb = document.createElement('div');
            thumb.className = 'swiper-slide';
            thumb.innerHTML = `<img src="${imgSrc}" onerror="this.src='${imgSrc.replace('images/', '')}'" alt="A9 Thumb">`;
            thumbsWrapper.appendChild(thumb);
        });

        // Khởi tạo Swiper Thumbnails
        const albumThumbs = new Swiper('.album-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        // Khởi tạo Swiper Main
        const albumSwiper = new Swiper('.album-swiper', {
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: albumThumbs,
            },
            autoplay: false
        });

        // Gán sự kiện cho các nút bấm điều khiển
        document.getElementById('albumPrev')?.addEventListener('click', () => albumSwiper.slidePrev());
        document.getElementById('albumNext')?.addEventListener('click', () => albumSwiper.slideNext());
        
        document.getElementById('albumPlay')?.addEventListener('click', () => {
            albumSwiper.params.autoplay.delay = 2500;
            albumSwiper.autoplay.start();
            alert('Đã bật tự động phát ảnh!');
        });
        
        document.getElementById('albumPause')?.addEventListener('click', () => {
            albumSwiper.autoplay.stop();
            alert('Đã tạm dừng phát ảnh!');
        });

        document.getElementById('albumFullscreen')?.addEventListener('click', () => {
            const elem = document.querySelector('.album-swiper');
            if (!document.fullscreenElement) {
                elem.requestFullscreen?.() || elem.webkitRequestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
    }

    // ==========================================================
    // 2. HIỆU ỨNG CÁNH HOA PHƯỢNG RƠI 60FPS
    // ==========================================================
    const canvas = document.getElementById('petal-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petals = Array.from({ length: 25 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 0.8 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 1 - 0.5
        }));

        function drawPetal(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.beginPath();
            ctx.fillStyle = 'rgba(218, 41, 28, 0.75)';
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }

        function animatePetals() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX + Math.sin(p.y / 30) * 0.3;
                p.rotation += p.rotSpeed;
                if (p.y > height) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
                drawPetal(p);
            });
            requestAnimationFrame(animatePetals);
        }
        animatePetals();
    }

    // ==========================================================
    // 3. LOGIC TƯƠNG TÁC NÚT [ TRỜ VỀ ] & MỞ CỬA
    // ==========================================================
    const btnTroVe = document.getElementById('btn-trove');
    const welcomeMsg = document.getElementById('welcome-msg');
    const welcomeScreen = document.getElementById('welcome-screen');
    const doorContainer = document.getElementById('door-container');
    const welcomeQuote = document.getElementById('welcome-quote');

    let clickCount = 0;

    if (btnTroVe) {
        btnTroVe.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) {
                btnTroVe.style.transform = 'translateX(-120px)';
                welcomeMsg.textContent = 'Ơ kìa... nhanh thế sao?😄';
            } else if (clickCount === 2) {
                btnTroVe.style.transform = 'translateX(120px)';
                welcomeMsg.textContent = 'Có chắc là học sinh A9 không? 😁';
            } else if (clickCount === 3) {
                btnTroVe.style.transform = 'translateX(0)';
                welcomeMsg.innerHTML = 'Ha ha... đùa chút thôi.<br>Mời bạn TRỜ VỀ.';
                btnTroVe.classList.add('glow');
                setTimeout(() => {
                    if (clickCount === 3) startTransition();
                }, 800);
            } else if (clickCount >= 4) {
                startTransition();
            }
        });
    }

    function startTransition() {
        welcomeScreen.classList.add('fade-out');
        playSchoolSound();
        setTimeout(() => { doorContainer.classList.add('open'); }, 300);
        setTimeout(() => { welcomeQuote.classList.add('show'); }, 1200);
        setTimeout(() => {
            welcomeQuote.classList.remove('show');
            setTimeout(() => { doorContainer.style.display = 'none'; }, 800);
        }, 2800);
    }

    function playSchoolSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.5);
        } catch (e) {
            console.log('Autoplay audio blocked');
        }
    }
});