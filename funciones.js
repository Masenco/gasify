function openMenu() {
    const toggle_menu = document.querySelector('.open_menu')
    toggle_menu.classList.toggle("active");


    const toggle_menu2 = document.querySelector('.menu_toggle')
    toggle_menu2.classList.toggle("active");


    const open_menu = document.querySelector('.content_navegation');
    open_menu.classList.toggle("active");


    const open_menu2 = document.querySelector('.links-sections_right');
    open_menu2.classList.toggle("active");


    const open_menu3 = document.querySelector('.links-sections_left');
    open_menu3.classList.toggle("active");

    
    const logo = document.querySelector('.logo');
    logo.classList.toggle("active");
    
}

function closeMenu() {
    const close_menu = document.querySelector('.content_navegation');
    close_menu.classList.remove("active");

    const closeToggle = document.querySelector('.open_menu')
    closeToggle.classList.remove("active");


    const closeToggle2 = document.querySelector('.menu_toggle')
    closeToggle2.classList.remove("active");


    const close_menu2 = document.querySelector('.content_navegation');
   close_menu2.classList.remove("active");


    const close_menu3 = document.querySelector('.links-sections_right');
    close_menu3.classList.remove("active");


    const close_menu4 = document.querySelector('.links-sections_left');
   close_menu4.classList.remove("active");

    
    const logo_desactive = document.querySelector('.logo');
    logo_desactive.classList.remove("active");
}