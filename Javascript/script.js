        const hamburger = document.querySelector('.hamburger');
        const menuOverlay = document.querySelector('.menu-overlay');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        const slider = document.getElementById('testimonialsSlider');
        const dots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;
        let isAutoPlaying = true;
        let autoPlayInterval;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        function showSlide(index) {
            const slideWidth = slider.children[0].offsetWidth;
            const gap = 32;
            slider.scrollTo({
                left: (slideWidth + gap) * index,
                behavior: 'smooth'
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % dots.length;
            showSlide(nextIndex);
        }

        function startAutoPlay() {
            if (isAutoPlaying) {
                autoPlayInterval = setInterval(nextSlide, 5000);
            }
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoPlay();
                isAutoPlaying = false;
            });
        });

        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            stopAutoPlay();
        });

        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            stopAutoPlay();
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.pageX;
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].pageX;
        });

        slider.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            handleSwipe();
        });

        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            handleSwipe();
        });

        slider.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        function handleSwipe() {
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentSlide < dots.length - 1) {
                    showSlide(currentSlide + 1);
                } else if (diff < 0 && currentSlide > 0) {
                    showSlide(currentSlide - 1);
                }
            }
            
            isAutoPlaying = false;
        }

        const testimonialsSection = document.querySelector('.testimonials');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && isAutoPlaying) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(testimonialsSection);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const serviceCards = document.querySelectorAll('.service-card');

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer2.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.team-member, .section-title').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer2.observe(el);
        });

        showSlide(0);