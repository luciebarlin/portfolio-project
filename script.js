//dropdown menus

const menuBtns = document.querySelectorAll(".js-menu-btn");
const menuList = document.querySelectorAll(".js-menu-list");



menuBtns.forEach(menuBtnItem => {
    //add the event listener to each clickable menu button
    menuBtnItem.addEventListener("click", function(event) {
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