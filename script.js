//dropdown menus

const menuBtns = document.querySelectorAll(".js-menu-btn");
const menuList = document.querySelectorAll(".js-menu-list");



menuBtns.forEach(menuBtnItem => {
    //add the event listener to each clickable menu button
    menuBtnItem.addEventListener("mouseover", function(event) {
        //returns the data-target value
        //const hideMenuElArr = document.querySelectorAll(".hide-menu");
        
        const targetStr = event.target.dataset.target;
        //returns target element from target string
        const target = document.querySelector('#' + targetStr);
        //toggles the hide-menu class of the selected element
        console.log(event.target);
        console.log(targetStr);
        if (target.classList.contains("hide-menu")) {
            menuList.forEach(menuListItem => {
                menuListItem.classList.add("hide-menu");
            });
            target.classList.remove("hide-menu");
        } else {
            target.classList.add("hide-menu");
        }


    })
});

//countdown timer

const countDownDate = new Date("Feb 18, 2023 00:00:00").getTime();
const birthdayTimer = document.getElementById("birthday-timer");

const updateCountdown = setInterval(function() {
    if (!birthdayTimer) {
        return;
    };
    
    let now = new Date().getTime();
    let distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    birthdayTimer.innerHTML = days + " days " + hours + " hours "
    + minutes + " minutes " + seconds + " seconds!";

    if (distance < 0) {
        clearInterval(updateCountdown);
        birthdayTimer.innerHTML = "Happy birthday!"
    }
});