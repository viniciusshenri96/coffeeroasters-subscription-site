"use strict";

const button = document.querySelector(".header__menu-ham");
// const menu = document.querySelector(".menu");
// const close = document.querySelector(".close");
const nav = document.querySelector(".header__list");
const selectionContainer = document.querySelector(".plan__selection");
const orderSummaryContainer = document.querySelector(".plan__order-summary");
const summaryContent = document.querySelector(".plan__order-summary--resume");
const blockGrind = document.querySelector("[data-disabled='block']");

// Menu Mobile
const openMenu = function () {
  // menu.classList.toggle("active");
  // close.classList.toggle("active");
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

// Accordion selection option coffe
selectionContainer.addEventListener("click", function (e) {
  const classActive = "active";

  const planPreferences = e.target.closest(".plan__preferences");

  const clickedTitleToggle = function (clickedTitle) {
    if (!clickedTitle) return;

    clickedTitle.classList.toggle(classActive);
    clickedTitle.nextElementSibling.classList.toggle(classActive);
  };

  const clickedReplyToggle = function (clickedReply) {
    const titleDisabled = document
      .getElementById("disabled")
      .querySelector(".plan__title");
    const contentDisabled = document
      .getElementById("disabled")
      .querySelector(".plan__content");

    const disabledGrind = function (opa, pro) {
      titleDisabled.style.opacity = opa;
      return blockGrind.classList[`${pro}`]("block");
    };

    const textSummary = function (text) {
      summaryContent.innerHTML = `${text}`;
    };

    if (!clickedReply) return;

    const titleSummary = clickedReply?.querySelector(".plan__reply--title");
    if (!titleSummary) return;

    clickedReply.classList.add(classActive);

    const manipulation = clickedReply
      .closest(".plan__preferences")
      .querySelector(".js-manipulation");
    const manipulationType = clickedReply
      .closest(".plan__preferences")
      .querySelector(".js-type");
    const manipulationHow = clickedReply
      .closest(".plan__preferences")
      .querySelector(".js-how");
    const manipulationGrind = clickedReply
      .closest(".plan__preferences")
      .querySelector(".js-grind");
    const manipulationDeliver = clickedReply
      .closest(".plan__preferences")
      .querySelector(".js-deliver");

    let titleManipulationType,
      titleManipulationHow,
      titleManipulationGrind,
      titleManipulationDeliver;

    if (manipulationType) {
      titleManipulationType = e.target
        .closest(".plan__reply")
        .querySelector(".plan__reply--title").textContent;
    }

    if (manipulationHow) {
      titleManipulationHow = e.target
        .closest(".plan__reply")
        .querySelector(".plan__reply--title").textContent;
    }

    if (manipulationGrind) {
      titleManipulationGrind = e.target
        .closest(".plan__reply")
        .querySelector(".plan__reply--title").textContent;
    }

    if (manipulationDeliver) {
      titleManipulationDeliver = e.target
        .closest(".plan__reply")
        .querySelector(".plan__reply--title").textContent;
    }

    if (manipulation) {
      const titleManipulation = e.target
        .closest(".plan__reply")
        .querySelector(".plan__reply--title").textContent;
      console.log(titleManipulation);

      if (titleManipulation === "Capsule") {
        if (titleDisabled.classList.contains("active")) {
          titleDisabled.classList.remove(classActive);
          contentDisabled.classList.remove(classActive);
        }
        textSummary(
          `"I drink my coffee using <span data-order="1">${titleManipulation}</span>, with a <span data-order="2">${titleManipulationType}</span> type of bean. <span data-order="3">${titleManipulationHow}</span>, sent to me <span data-order="4">${titleManipulationDeliver}</span>"`
        );

        return disabledGrind("0.5", "add");
      }

      disabledGrind("1", "remove");
      textSummary(
        `"I drink my coffee as <span data-order="1">${titleManipulation}</span>, with a <span data-order="2">_____</span> type of bean. <span data-order="3">$_____</span>, ground ala <span data-order="4">$_____</span>, sent to me <span data-order="5">$_____</span>"`
      );
    }
  };

  if (planPreferences) {
    const clickedTitle = e.target.closest(".plan__title");
    clickedTitleToggle(clickedTitle);

    const clickedReply = e.target.closest(".plan__reply");

    const planReply = planPreferences.querySelectorAll(".plan__reply");

    planReply.forEach((i) => i.classList.remove(classActive));
    clickedReplyToggle(clickedReply);
  }
});
