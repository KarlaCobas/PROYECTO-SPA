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

        const slider = document.getElementById('testimonial-slider');
        let slideInterval;

        const startAutoSlide = () => {
            clearInterval(slideInterval); 
            slideInterval = setInterval(() => {
                if (slider) {
                    slider.scrollLeft += slider.offsetWidth;
                    if (slider.scrollLeft >= (slider.scrollWidth - slider.offsetWidth)) {
                        slider.scrollLeft = 0;
                    }
                }
            }, 5000);
        };

        const pauseAutoSlide = () => {
             clearInterval(slideInterval);
        };

        if (slider) {
            slider.addEventListener('mouseenter', pauseAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
            startAutoSlide();
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .team-member, .section-title').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });