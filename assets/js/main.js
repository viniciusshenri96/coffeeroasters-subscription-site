"use strict";

const button = document.querySelector(".header__menu-ham");
const nav = document.querySelector(".header__list");
const containerSelection = document.querySelector(".plan__selection");
const orderSummaryText = document.querySelector(".plan__order-summary--resume");
const blockGrind = document.querySelector('[data-disabled="block"]');
const checkedReply = document.querySelectorAll(".plan__reply");
let activeButton = 0,
  activeButtonTotal;
// Menu Mobile

const openMenu = function () {
  nav.classList.toggle("active");
};

button.addEventListener("click", openMenu);

containerSelection.addEventListener("click", function (e) {
  const planPreferences = e.target.closest(".plan__preferences");

  if (planPreferences) {
    const containerDrink = e.target.closest(".js-drink"),
      containerType = e.target.closest(".js-type"),
      containerHow = e.target.closest(".js-how"),
      containerGrind = e.target.closest(".js-grind"),
      containerDeliver = e.target.closest(".js-deliver");
    const classActive = "active";

    // Grind Disable
    const blockGrindFunction = function (pro, opa) {
      blockGrind.classList[`${pro}`]("block");
      blockGrind
        .closest(".plan__preferences")
        .querySelector(".plan__title").style.opacity = opa;
    };

    // Default grind
    const defaultGrind = function () {
      blockGrind
        .closest(".plan__preferences")
        .querySelector(".plan__content")
        .classList.remove("active");
      blockGrind
        .closest(".plan__preferences")
        .querySelector(".plan__title")
        .classList.remove("active");

      const replyDisabled = document
        .getElementById("disabled")
        .querySelectorAll(".plan__reply");

      replyDisabled.forEach((dis) => dis.classList.remove("active"));
      document.getElementById(`grind`).innerText = "_____";
    };

    const updateText = function (value) {
      document.getElementById("grind").style.display = value;
      document.getElementById("complet").style.display = value;
    };

    // Print title for order summary
    const printTitle = function (containerName, nameData) {
      if (containerName) {
        const planReply = e.target.closest(".plan__reply");
        if (!planReply) return;
        const title = planReply.querySelector(".plan__reply--title").innerText;

        document.getElementById(`${nameData}`).innerText = title;

        if (title.includes("Filter") || title.includes("Espresso")) {
          orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
            "using",
            "as"
          );
          updateText("inline");
          blockGrindFunction("remove", "1");
        } else if (title === "Capsule") {
          orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
            "as",
            "using"
          );
          updateText("none");
          blockGrindFunction("add", "0.5");
          defaultGrind();
        }

        const checkReply = containerName.querySelectorAll(".plan__reply");
        checkReply.forEach((check) => {
          if (check.classList.contains("active")) {
            activeButton++;
            if (activeButton <= 3) {
              console.log(activeButton);
            }
          }
        });
      }
    };

    if (containerType) printTitle(containerType, "type");
    if (containerHow) printTitle(containerHow, "how");
    if (containerGrind) printTitle(containerGrind, "grind");
    if (containerDeliver) printTitle(containerDeliver, "deliver");
    if (containerDrink) printTitle(containerDrink, "drink");

    // Accordion
    const clickedTitle = e.target.closest(".plan__title");

    if (clickedTitle) {
      clickedTitle.classList.toggle(classActive);
      clickedTitle.nextElementSibling.classList.toggle(classActive);
    }

    const clickedReply = e.target.closest(".plan__reply");

    if (clickedReply) {
      const planReply = planPreferences.querySelectorAll(".plan__reply");
      planReply.forEach((i) => i.classList.remove(classActive));
      clickedReply.classList.add(classActive);

      // const checkReply = planPreferences.querySelectorAll(".plan__reply");
    }
  }
});
