import "./styles/index.css";

const hamburgerMenu = document.querySelector(".hamburger-menu");
const mainNav = document.querySelector(".main-nav");

if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        hamburgerMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });
}
