const CAROUSEL_INTERVAL_MS = 5000;
const ANIMATION_DURATION_MS = 1000;

function initCarousel() {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    if (slides.length <= 1) return;

    document.documentElement.style.setProperty(
        "--carousel-interval",
        `${CAROUSEL_INTERVAL_MS}ms`,
    );

    indicatorsContainer.innerHTML = "";
    slides.forEach(() => {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        indicator.innerHTML = `<div class="indicator-progress"></div>`;
        indicatorsContainer.appendChild(indicator);
    });
    const indicators = Array.from(indicatorsContainer.children);

    let currentIndex = 0;
    let intervalId = null;

    function updateIndicators(index) {
        indicators.forEach((indicator) => indicator.classList.remove("active"));

        const activeIndicator = indicators[index];
        if (activeIndicator) {
            // Force a reflow to restart the CSS animation
            void activeIndicator.offsetWidth;
            activeIndicator.classList.add("active");
        }
    }

    function transitionToSlide(nextIndex) {
        const previousIndex = currentIndex;
        if (previousIndex === nextIndex) return;

        const currentSlide = slides[previousIndex];
        const nextSlide = slides[nextIndex];

        // Position slides for animation
        currentSlide.style.zIndex = "2";
        nextSlide.style.zIndex = "3"; // Next slide appears on top

        // Animate
        currentSlide.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: ANIMATION_DURATION_MS,
            easing: "ease-in-out",
            fill: "forwards",
        });

        const fadeIn = nextSlide.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: ANIMATION_DURATION_MS,
            easing: "ease-in-out",
            fill: "forwards",
        });

        // After animation, reset properties
        fadeIn.onfinish = () => {
            currentSlide.style.zIndex = "1";
            nextSlide.style.zIndex = "2";
            currentIndex = nextIndex;
        };

        updateIndicators(nextIndex);
    }

    function advance() {
        const nextIndex = (currentIndex + 1) % slides.length;
        transitionToSlide(nextIndex);
    }

    function start() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        // Set initial state
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentIndex ? "1" : "0";
            slide.style.zIndex = index === currentIndex ? "2" : "1";
        });
        updateIndicators(currentIndex);
        intervalId = setInterval(advance, CAROUSEL_INTERVAL_MS);
    }

    start();
}

initCarousel();
