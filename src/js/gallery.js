/**
 * @file gallery.js
 *
 * @description
 * This file observes what images are currently on the the screen
 * and will apply a "img-show" css class when it is in view. This
 * class will apply a transform effect to the image.
 *
 * @author Luke Janssen
 * @date 2025-11-04
 */

/**
 * Observer configuration
 */
const observerConfig = {
    threshold: 0.1,
};

/**
 * Create an observer
 */
const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("img-show", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
    });
}, observerConfig);

// observe all the images in the gallery
const images = document.querySelectorAll(".image-container img");

images.forEach((img) => {
    imgObserver.observe(img);
});
