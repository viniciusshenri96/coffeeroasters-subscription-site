"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");
const selectionContainer = document.querySelector(".plan__selection");
const planTitle = document.querySelectorAll(".plan__title");
const planContent = document.querySelectorAll(".plan__content");

const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

selectionContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("plan__title")) {
    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("active");
  }

  if (e.target.classList.contains("plan__reply")) {
    const title = e.target.querySelector(".plan__reply--title");
    const desc = e.target.querySelector(".plan__reply--desc");

    e.target.style.backgroundColor = "#0e8784";
    title.style.color = "#FFF";
    desc.style.color = "#fefcf7";
  }
});
