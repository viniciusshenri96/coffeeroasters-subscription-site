"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");
const selectionContainer = document.querySelector(".plan__selection");
const orderSummaryContainer = document.querySelector(".plan__order-summary");

const disabled = document.querySelector(".disabled");

const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

// let html = `
//     <p class="plan__order-summary--resume">
//       “I drink my coffee using <span>Capsule</span>, with a
//       <span>_____</span> type of bean. <span>_____</span> , sent to me
//       <span>_____</span>.”
//     </p>
// `;

// orderSummaryContainer.insertAdjacentHTML("beforeend", html);

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

    if (title.textContent === "Capsule") {
      const titleDisabled = document
        .getElementById("disabled")
        .querySelector(".plan__title");
      const contentDisabled = document
        .getElementById("disabled")
        .querySelector(".plan__content");

      if (titleDisabled.classList.contains("active")) {
        titleDisabled.classList.remove("active");
        contentDisabled.classList.remove("active");
      }
      return disabled.classList.add("block");
    }
    disabled.classList.remove("block");
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
