"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");

const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);
