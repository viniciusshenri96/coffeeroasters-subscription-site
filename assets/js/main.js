"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");
const selectionContainer = document.querySelector(".plan__selection");
const orderSummaryContainer = document.querySelector(".plan__order-summary");

const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

selectionContainer.addEventListener("click", function (e) {
  const planPreferences = e.target.closest(".plan__preferences");

  const clickedTitleToggle = function (clickedTitle) {
    if (!clickedTitle) return;

    clickedTitle.classList.toggle("active");
    clickedTitle.nextElementSibling.classList.toggle("active");
  };

  const clickedReplyToggle = function (clickedReply) {
    if (!clickedReply) return;
    clickedReply.classList.add("active");
    const title = clickedReply.querySelector(".plan__reply--title");
  };

  if (planPreferences) {
    const clickedTitle = e.target.closest(".plan__title");
    clickedTitleToggle(clickedTitle);

    const clickedReply = e.target.closest(".plan__reply");

    const planReply = planPreferences.querySelectorAll(".plan__reply");

    planReply.forEach((i) => i.classList.remove("active"));
    clickedReplyToggle(clickedReply);
  }
});
