"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");
const selectionContainer = document.querySelector(".plan__selection");
const orderSummaryContainer = document.querySelector(".plan__order-summary");
const summaryContent = document.querySelector(".plan__order-summary--resume");

// Menu Mobile
const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

// Accordion selection option coffe
selectionContainer.addEventListener("click", function (e) {
  const planPreferences = e.target.closest(".plan__preferences");

  const disabled = document.querySelector(".disabled");
  const titleDisabled = document
    .getElementById("disabled")
    .querySelector(".plan__title");
  const contentDisabled = document
    .getElementById("disabled")
    .querySelector(".plan__content");

  const clickedTitleToggle = function (clickedTitle) {
    if (!clickedTitle) return;

    clickedTitle.classList.toggle("active");
    clickedTitle.nextElementSibling.classList.toggle("active");
  };

  const clickedReplyToggle = function (clickedReply) {
    if (!clickedReply) return;

    clickedReply.classList.add("active");

    const title = clickedReply.querySelector(".plan__reply--title");

    if (title.textContent === "Capsule") {
      if (titleDisabled.classList.contains("active")) {
        titleDisabled.classList.remove("active");
        contentDisabled.classList.remove("active");
      }
      titleDisabled.style.opacity = "0.5";
      summaryContent.innerHTML = `"I drink my coffee using<span data-order="1">_____</span>, with a <span data-order="2">_____</span> type of bean. <span data-order="3">_____</span>, sent to me <span data-order="4">_____</span>"`;

      return disabled.classList.add("block");
    }
    titleDisabled.style.opacity = "1";
    disabled.classList.remove("block");
    summaryContent.innerHTML = `"I drink my coffee as <span data-order="1">_____</span>, with a <span data-order="2">_____</span> type of bean. <span data-order="3">_____</span>, ground ala <span data-order="4">_____</span>, sent to me <span data-order="5">_____</span>"`;
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
