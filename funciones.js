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
    const open_menu = document.querySelector('.links_sections');
    open_menu.classList.remove("active");
}