document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================
    // 1. CẤU HÌNH DANH SÁCH ẢNH ALBUM (Tự động nạp từ a9 (1) -> a9 (12))
    // ==========================================================
    const imageList = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.JPG",
    "images/16.jpg",
    "images/17.JPG",
    "images/18.JPG",
    "images/19.JPG",
    "images/20.JPG",
    "images/21.JPG",
    "images/22.JPG",
    "images/23.JPG",
    "images/24.jpg",
    "images/25.jpg",
    "images/26.jpg",
    "images/27.jpg",
    "images/28.jpg",
    "images/29.jpg",
    "images/30.jpg",
    "images/31.jpg",
    "images/32.jpg",
    "images/33.jpg",
    "images/34.jpg",
    "images/35.jpg",
];

    const slideshowWrapper = document.getElementById('slideshowWrapper');
    const thumbsWrapper = document.getElementById('thumbsWrapper');

    if (slideshowWrapper && thumbsWrapper) {
        imageList.forEach((imgSrc) => {
            // Nạp ảnh chính
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${imgSrc}" loading="lazy" decoding="async" alt="A9 Kỷ niệm">`;
            slideshowWrapper.appendChild(slide);

            // Nạp ảnh Thumbnail
            const thumb = document.createElement('div');
            thumb.className = 'swiper-slide';
            thumb.innerHTML = `<img src="${imgSrc}" loading="lazy" decoding="async" alt="A9 Thumb">`;
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
            speed: 650,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
           autoplay: {
    delay: 5000,
    disableOnInteraction: false,
},
        });
// ===== Double click để fullscreen slideshow =====
const albumEl = document.querySelector(".album-swiper");

albumEl.addEventListener("dblclick", () => {

    if (!document.fullscreenElement) {
        albumEl.requestFullscreen().catch(()=>{});
    } else {
        document.exitFullscreen();
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
    const returnMessage = document.getElementById('return-message');
    const musicToggle = document.getElementById('music-toggle');
    const reunionMusic = new Audio('music/minhvenhe.mp3');
    reunionMusic.loop = true;

    let clickCount = 0;
    let musicStarted = false;
    let transitionStarted = false;
    let welcomeMessageTimer;
    let welcomeFadeTimer;
    const savedMusicPreference = localStorage.getItem('a9MusicMuted');

    if (btnTroVe) {
        btnTroVe.addEventListener('click', () => {
            if (transitionStarted) return;
            clickCount++;
            if (clickCount === 1) {
                btnTroVe.style.transform = 'translateX(-110px)';
                showWelcomeMessage('😊<br>Ơ...<br>Mình đã bảo bắt đầu đâu!');
            } else if (clickCount === 2) {
                btnTroVe.style.transform = 'translateX(110px)';
                showWelcomeMessage('😁<br>Khoan đã...Mật khẩu đâu?<br>Bạn có đúng dân A9 không đấy?');
            } else if (clickCount === 3) {
                btnTroVe.style.transform = 'translateX(0)';
                btnTroVe.classList.add('glow');
               showWelcomeMessage('🥰<br>Ha ha...<br>Đùa chút thôi.<br>Mình cùng Trở về nhé!');

setTimeout(() => {
    startTransition();
}, 1800);
            } else if (clickCount >= 4) {
                startTransition();
            }
        });
    }

    function showWelcomeMessage(message, onComplete) {
        if (!welcomeMsg) return;
        clearTimeout(welcomeMessageTimer);
        clearTimeout(welcomeFadeTimer);
        welcomeMsg.innerHTML = message;
        welcomeMsg.classList.add('show');
        welcomeMessageTimer = setTimeout(() => {
            welcomeMsg.classList.remove('show');
            welcomeFadeTimer = setTimeout(() => {
                onComplete?.();
            }, 400);
        }, 2500);
    }

    function startTransition() {
        if (transitionStarted) return;
        transitionStarted = true;
        welcomeScreen.classList.add('fade-out');
        playSchoolSound();
setTimeout(() => {
    doorContainer.classList.add('open');
    startMusic();
}, 1800);
     setTimeout(() => {
    returnMessage?.classList.add('show');
    setTimeout(() => {
        returnMessage?.classList.remove('show');
    }, 4500);
}, 2000);
        setTimeout(() => {
            doorContainer.style.display = 'none';
        }, 6900);
    }

    function startMusic() {
        if (musicStarted) return;
        musicStarted = true;
        reunionMusic.volume = 0.72;
        musicToggle?.classList.add('show');

     if (savedMusicPreference === 'true') {
    musicToggle?.classList.add('muted');
    musicToggle.textContent = '🔇';
    return;
}

     reunionMusic.play().then(() => {
    musicToggle?.classList.remove('muted');
    musicToggle.textContent = '🔊';
}).catch(() => {
    musicToggle?.classList.add('muted');
    musicToggle.textContent = '🔇';
});
    }

   musicToggle?.addEventListener('click', () => {

    if (reunionMusic.paused) {

        reunionMusic.play();

        musicToggle.classList.remove('muted');

        musicToggle.textContent = '🔊';

        localStorage.setItem('a9MusicMuted', 'false');

    } else {

        reunionMusic.pause();

        musicToggle.classList.add('muted');

        musicToggle.textContent = '🔇';

        localStorage.setItem('a9MusicMuted', 'true');

    }

});
// ===== Auto pause music when watching videos =====
document.querySelectorAll("video").forEach(video => {

    video.addEventListener("play", () => {
        if (!reunionMusic.paused) {
            reunionMusic.pause();
            musicToggle?.classList.add("muted");
        }
    });

    video.addEventListener("pause", () => {
        if (musicStarted && reunionMusic.paused) {
            reunionMusic.play().catch(()=>{});
            musicToggle?.classList.remove("muted");
        }
    });

    video.addEventListener("ended", () => {
        if (musicStarted && reunionMusic.paused) {
            reunionMusic.play().catch(()=>{});
            musicToggle?.classList.remove("muted");
        }
    });

});
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