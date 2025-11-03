/**
 * Lazy loading utility for gallery images
 * Uses IntersectionObserver for optimal performance
 */

// Configuration
const config = {
    rootMargin: "50px 0px", // Start loading 50px before image enters viewport
    threshold: 0.01,
};

// Track loaded images to avoid reprocessing
const loadedImages = new WeakSet();

/**
 * Handle image loading
 * @param {HTMLImageElement} img - The image element to load
 */
function loadImage(img) {
    if (loadedImages.has(img)) return;

    // Add loading class for styling
    img.classList.add("loading");

    // Handle successful load
    const onLoad = () => {
        img.classList.remove("loading");
        img.classList.add("loaded");
        loadedImages.add(img);
    };

    // Handle load error
    const onError = () => {
        img.classList.remove("loading");
        img.classList.add("error");
        console.error(`Failed to load image: ${img.src}`);
    };

    // Attach event listeners
    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });

    // If image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
        onLoad();
    }
}

/**
 * Initialize lazy loading for gallery images
 */
export function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
        // Fallback: load all images immediately
        const images = document.querySelectorAll(".image-container img");
        images.forEach(loadImage);
        return;
    }

    // Create intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, config);

    // Observe all gallery images
    const images = document.querySelectorAll(".image-container img");
    images.forEach((img) => {
        imageObserver.observe(img);
    });
}

/**
 * Preload critical images (first visible images)
 */
export function preloadCriticalImages() {
    // Preload the first few images in the first section
    const firstSection = document.querySelector(".gallery-grid");
    if (firstSection) {
        const firstImages = firstSection.querySelectorAll(
            ".image-container img",
        );
        // Load first 2 images immediately for better perceived performance
        Array.from(firstImages).slice(0, 2).forEach(loadImage);
    }
}

/**
 * Initialize all image loading optimizations
 */
export function initImageOptimizations() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            preloadCriticalImages();
            initLazyLoading();
        });
    } else {
        preloadCriticalImages();
        initLazyLoading();
    }
}

// Auto-initialize if this script is loaded on a gallery page
initImageOptimizations();
