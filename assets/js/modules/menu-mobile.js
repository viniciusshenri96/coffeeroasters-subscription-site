export default function menuMobileFunction() {
  const button = document.querySelector(".header__menu-ham");
  const open = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const nav = document.querySelector(".header__list");

  const openMenu = function (e) {
    if (e.cancelable) e.preventDefault();
    nav.classList.toggle("active");
    open.classList.toggle("active");
    close.classList.toggle("active");

    if (!nav.classList.contains("active"))
      return this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-expanded", "true");
  };

  button.addEventListener("click", openMenu);
  button.addEventListener("touchstart", openMenu);
}
