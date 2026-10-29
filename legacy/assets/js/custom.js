$(function () {

    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

    // Header Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    });


    // Featured Owl Carousel
    $('.featured-projects-slider .owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })


    // Count
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    // ScrollToTop
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const btn = document.getElementById("scrollToTopBtn");
    btn.addEventListener("click", scrollToTop);

    window.onscroll = function () {
        const btn = document.getElementById("scrollToTopBtn");
        if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
            btn.style.display = "flex";
        } else {
            btn.style.display = "none";
        }
    };


    // Aos
    AOS.init({
        once: true,
    });

    // Active Section Detection for Menu
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.header-menu .header-link');

    // Function to update active menu item
    function updateActiveMenuItem(sectionId) {
        menuLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            // Check if link points to this section (handles both #id and page#id formats)
            if (href === '#' + sectionId || href.endsWith('#' + sectionId) ||
                (sectionId === '' && (href === 'index.html' || href.endsWith('index.html')))) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer to detect which section is in view
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper portion of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveMenuItem(entry.target.id);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Also update on menu link click (for immediate feedback)
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                const sectionId = href.substring(hashIndex + 1);
                updateActiveMenuItem(sectionId);
            } else {
                // Home link without hash
                updateActiveMenuItem('');
            }
        });
    });

    // Set initial active state based on current scroll position
    function setInitialActiveState() {
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
                currentSection = section.id;
            }
        });
        if (currentSection) {
            updateActiveMenuItem(currentSection);
        }
    }

    // Run on page load
    setInitialActiveState();

});

