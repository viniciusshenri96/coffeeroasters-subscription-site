"use strict";

const button = document.querySelector(".header__menu-ham");
const nav = document.querySelector(".header__list");
const containerSelection = document.querySelector(".plan__selection");
const orderSummaryText = document.querySelector(".plan__order-summary--resume");
const blockGrind = document.querySelector('[data-disabled="block"]');
const checkedReply = document.querySelectorAll(".plan__reply");
const btnPlan = document.querySelector(".btn--padding");
const modalContent = document.querySelector(".modal__content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
console.log(modal);

let arrCheckButton = [0, 0, 0, 0];
let checked = true,
  checkedSelection = true,
  valided;
// Menu Mobile
const openMenu = function () {
  nav.classList.toggle("active");
};
button.addEventListener("click", openMenu);

// let activeButtonValided = true;
containerSelection.addEventListener("click", function (e) {
  const planPreferences = e.target.closest(".plan__preferences");

  // Variables Global
  const classActive = "active";

  if (planPreferences) {
    let containerDrink = e.target.closest(".js-drink"),
      containerType = e.target.closest(".js-type"),
      containerHow = e.target.closest(".js-how"),
      containerGrind = e.target.closest(".js-grind"),
      containerDeliver = e.target.closest(".js-deliver");

    // Accordion
    const accordionFunction = function () {
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

        const assigningValue = function (containerName, index) {
          if (containerName) arrCheckButton[index] = 1;

          if (containerGrind) {
            arrCheckButton[4] = 1;
            valided = arrCheckButton.every((act) => act === 1);
            checked = true;
            checkedSelection = false;
          }

          if (checked) {
            valided = arrCheckButton.every((act) => act === 1);
            // prettier-ignore
            console.log(arrCheckButton);
            console.log(valided);
            valided &&
              document
                .getElementById("btn-disabled")
                .classList.add("activeButton");
          }
        };

        // prettier-ignore
        const containerChecked = [containerType, containerHow, containerDeliver, containerGrind];

        containerChecked.forEach((container, index) => {
          container && assigningValue(container, index + 1);
        });
      }
    };
    accordionFunction();
    // Grind Disable
    const blockGrindFunction = function (pro, opa) {
      blockGrind.classList[`${pro}`]("block");
      // prettier-ignore
      blockGrind.closest(".plan__preferences").querySelector(".plan__title").style.opacity = opa;
    };

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

    // Update text Order Summary
    const updateTextOrderSummary = function (value) {
      document.getElementById("grind").style.display = value;
      document.getElementById("complet").style.display = value;
    };

    if (containerDrink) {
      arrCheckButton[0] = 1;

      const planReply = e.target.closest(".plan__reply");
      if (!planReply) return;
      const title = planReply.querySelector(".plan__reply--title").innerText;

      document.getElementById("drink").innerText = title;

      if (title.includes("Filter") || title.includes("Espresso")) {
        orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
          "using",
          "as"
        );
        updateTextOrderSummary("inline");
        blockGrindFunction("remove", "1");

        if (checkedSelection) {
          checked = false;
          // prettier-ignore
          document.getElementById("btn-disabled").classList.remove("activeButton");
        }
      } else if (title === "Capsule") {
        // prettier-ignore
        orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace("as","using");
        updateTextOrderSummary("none");
        blockGrindFunction("add", "0.5");
        defaultGrind();
        checkedSelection = true;
      }
    }

    const printTitleOrderSummary = function (containerName, nameData) {
      if (containerName) {
        const planReply = e.target.closest(".plan__reply");
        if (!planReply) return;
        const title = planReply.querySelector(".plan__reply--title").innerText;

        document.getElementById(`${nameData}`).innerText = title;
      }
    };
    // prettier-ignore
    const containerArr = [containerType, containerHow, containerGrind, containerDeliver];
    const containerNamesArr = ["type", "how", "grind", "deliver"];

    containerArr.forEach((cont, index) => {
      if (cont) printTitleOrderSummary(cont, containerNamesArr[index]);
    });
  }
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = function (e) {
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

btnPlan.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  console.log(e.key === "Escape");
  if (e.key === "Escape") {
    closeModal();
  }
});
