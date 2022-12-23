"use strict";

const button = document.querySelector(".header__menu-ham");
const nav = document.querySelector(".header__list");
const containerSelection = document.querySelector(".plan__selection");
const orderSummaryText = document.querySelector(".plan__order-summary--resume");
const blockGrind = document.querySelector('[data-disabled="block"]');
const checkedReply = document.querySelectorAll(".plan__reply");
const btnPlan = document.querySelector(".btn--padding");
const orderModal = document.querySelector(".plan__order-summary--modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const planItemContent = document.querySelectorAll(".plan__item--content");

let arrCheckButton = [0, 0, 0, 0];
let checked = true,
  checkedSelection = true,
  valided;
// Menu Mobile
const openMenu = function () {
  nav.classList.toggle("active");
};
button.addEventListener("click", openMenu);

////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #planPreferences;
  #classActive = "active";
  #containerDrink;
  #containerType;
  #containerHow;
  #containerGrind;
  #containerDeliver;
  #total = 0;
  #priceValue = [];

  constructor() {
    containerSelection.addEventListener("click", this._appClicked.bind(this));
  }

  _appClicked(e) {
    this.#planPreferences = e.target.closest(".plan__preferences");

    if (this.#planPreferences) {
      this.#containerDrink = e.target.closest(".js-drink");
      this.#containerType = e.target.closest(".js-type");
      this.#containerHow = e.target.closest(".js-how");
      this.#containerGrind = e.target.closest(".js-grind");
      this.#containerDeliver = e.target.closest(".js-deliver");
      const planReply = e.target.closest(".plan__reply");
      const clickedReply = e.target.closest(".plan__reply");

      if (this.#containerDrink) {
        arrCheckButton[0] = 1;
        const planReply = e.target.closest(".plan__reply");
        if (!planReply) return;
        const title = planReply.querySelector(".plan__reply--title").innerText;

        if (title.includes("Filter") || title.includes("Espresso")) {
          // prettier-ignore
          orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace("using","as");
          this._updateTextOrderSummary("inline");
          this._blockGrind("remove", "1");

          if (checkedSelection) {
            // prettier-ignore
            document.getElementById("btn-disabled").classList.remove("activeButton");
            checked = false;
          }
        } else if (title === "Capsule") {
          // prettier-ignore
          orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace("as","using");
          this._updateTextOrderSummary("none");
          this._blockGrind("add", "0.5");
          this._defaultGrind();
          checkedSelection = true;
          checked = true;
        }
      }

      // Accordion
      this._accordion(e);

      // Clicked option
      this._clickedReply(clickedReply);

      // Order summary title updates
      this._orderSummaryTitleUpdates(e);

      // UPDATE PRICE for "How often should we deliver?"
      this._updatePriceDeliver(planReply);

      // this._updatePriceModal(planReply);
    }
  }

  _clickedReply(clickedReply) {
    if (clickedReply) {
      // Selecting Option
      this._selectingOption(clickedReply);

      // Activation Button
      // prettier-ignore
      const containerChecked = [this.#containerDrink, this.#containerType, this.#containerHow, this.#containerDeliver, this.#containerGrind];

      containerChecked.forEach((container, index) => {
        container && this._activation_button(container, index);
      });
    }
  }

  _activation_button(containerName, index) {
    if (containerName) arrCheckButton[index] = 1;

    if (this.#containerGrind) {
      arrCheckButton[4] = 1;
      valided = arrCheckButton.every((act) => act === 1);
      checked = true;
      checkedSelection = false;
    }

    if (checked) {
      valided = arrCheckButton.every((act) => act === 1);

      // prettier-ignore
      valided &&  document.getElementById("btn-disabled").classList.add("activeButton");
    }
  }

  _selectingOption(clickedReply) {
    const planReply = this.#planPreferences.querySelectorAll(".plan__reply");
    planReply.forEach((i) => i.classList.remove(this.#classActive));
    clickedReply.classList.add(this.#classActive);
  }

  _accordion(e) {
    const clickedTitle = e.target.closest(".plan__title");

    if (clickedTitle) {
      clickedTitle.classList.toggle(this.#classActive);
      clickedTitle.nextElementSibling.classList.toggle(this.#classActive);
    }
  }

  _blockGrind(pro, opa) {
    blockGrind.classList[`${pro}`]("block");
    // prettier-ignore
    blockGrind.closest(".plan__preferences").querySelector(".plan__title").style.opacity = opa;

    document
      .querySelector(".plan__item:nth-child(4)")
      .classList[`${pro}`]("block");
    document
      .querySelector('[data-disabled="blockGrind"]')
      .classList[`${pro}`]("block");
  }

  _orderSummaryTitleUpdates(e) {
    // prettier-ignore
    const containerArr = [this.#containerDrink,this.#containerType, this.#containerHow, this.#containerGrind, this.#containerDeliver];
    const containerNamesArr = ["drink", "type", "how", "grind", "deliver"];
    containerArr.forEach(
      (cont, index) =>
        // Curt-circuting
        cont && this._printTitleOrderSummary(cont, containerNamesArr[index], e)
    );
  }

  _printTitleOrderSummary(containerName, nameData, e) {
    if (containerName) {
      const planReply = e.target.closest(".plan__reply");
      if (!planReply) return;
      const title = planReply.querySelector(".plan__reply--title").innerText;

      document.getElementById(`${nameData}`).innerText = title;
    }
  }

  _updateTextOrderSummary(value) {
    document.getElementById("grind").style.display = value;
    document.getElementById("complet").style.display = value;
  }

  _defaultGrind() {
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
  }

  _updatePriceDeliver(planReply) {
    if (!planReply) return;
    const title = planReply.querySelector(".plan__reply--title").innerText;

    if (title === "250g") {
      this._updatePrice(["$7.20", "$9.60", "$12.00"], "250g");
    }

    if (title.includes("500g")) {
      this._updatePrice(["$13.00", "$17.50", "$22.00"], "500g");
    }

    if (title.includes("1000g")) {
      this._updatePrice(["$22.00", "$32.00", "$42.00"], "1000g");
    }
  }

  _updatePrice(price, title) {
    // prettier-ignore
    const dataHow = ['[data-how="0"]','[data-how="1"]','[data-how="2"]'];
    dataHow.forEach((data, index) => {
      document.querySelector(data).innerText = price[index];
    });

    if (title === "250g") {
    }
  }

  // _updatePriceModal(planReply) {
  //   if (!planReply) return;
  //   const title = planReply.querySelector(".plan__reply--title").innerText;
  //   if (title === "Every week") {
  //     const price1 = document.querySelector('[data-how="0"]').innerText;
  //     console.log(price1);
  //   }
  //   if (title === "Every 2 weeks") {
  //     const price1 = document.querySelector('[data-how="1"]').innerText;
  //     console.log(price1);
  //   }
  //   if (title === "Every month") {
  //     const price1 = document.querySelector('[data-how="2"]').innerText;
  //     console.log(price1);
  //   }
  // }
}

const app = new App();

// Logic Modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.add("active");
  overlay.classList.add("active");
  orderModal.innerHTML = orderSummaryText.innerHTML;

  if (!orderModal.innerText.includes("ground ala")) return;
  orderModal
    .querySelector("[data-modal='modal--complet']")
    .classList.add("activeColor");
};

const closeModal = function () {
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

btnPlan.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
