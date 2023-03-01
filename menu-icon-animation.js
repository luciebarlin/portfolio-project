const menuIcon = document.querySelector(".menu-icon");
const menuIconWrapper = document.querySelector(".menu-icon-wrapper");
const navMobileTest = document.querySelector(".nav-mobile-new");

const showXBtn = () => {
    menuIcon.classList.toggle("showing-menu");
    navMobileTest.classList.toggle("active-menu");
}

menuIconWrapper.addEventListener("click", showXBtn);