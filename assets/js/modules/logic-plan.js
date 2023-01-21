const href = window.location.pathname;

export default function planApp() {
  if (href.includes("plan.html")) {
    const planSelectionContainer = document.querySelector(".plan__selection");
    const orderSummaryText = document.querySelector(
      ".plan__order-summary--resume"
    );
    const blockGrind = document.querySelector('[data-disabled="block"]');
    const orderModal = document.querySelector(".plan__order-summary--modal");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const btnPlan = document.querySelector(".btn--padding");

    class App {
      #arrCheckButton = [0, 0, 0, 1, 0];
      #checked = true;
      #valided = true;
      #checkedSelection = true;

      constructor() {
        this.eventClick();
      }

      eventClick() {
        planSelectionContainer.addEventListener(
          "click",
          this._workingClick.bind(this)
        );
      }

      _workingClick(e) {
        this._accordion(e);

        this._selectingOption(e);

        this._updateOrderSummaryTitleOption(e);
      }

      _accordion(e) {
        e.preventDefault();
        let preferenceOpen;
        let element;
        if (e.target.matches("[data-button]")) {
          preferenceOpen = e.target.closest("[data-open]");

          if (!preferenceOpen.hasAttribute("open")) {
            preferenceOpen.setAttribute("open", "");
          } else {
            preferenceOpen.removeAttribute("open");
          }
        }

        const asideListArr = [
          "[data-button ='0']",
          "[data-button ='1']",
          "[data-button ='2']",
          "[data-button ='3']",
          "[data-button ='4']",
        ];

        asideListArr.forEach((_, index) => {
          if (e.target.matches(`[data-button ='${index}']`)) {
            element = document.querySelector(`[data-list-aside="${index}"]`);
            element.classList.add("active");
          }
        });
        document
          .querySelectorAll(`[data-list-aside].active`)
          .forEach((list) => {
            if (list === element) return;
            list.classList.remove("active");
          });
      }

      _selectingOption(e) {
        const clickedOption = e.target.closest("[data-option]");
        const optionsAll = e.target.closest("[data-options]");
        if (!clickedOption || !optionsAll) return;
        const optionsArr = optionsAll.querySelectorAll("[data-option]");
        optionsArr.forEach((opt) => opt.classList.remove("active"));
        clickedOption.classList.add("active");
      }

      _updateOrderSummaryTitleOption(e) {
        let title;
        const clickdPreferences = e.target.closest("[data-open]");

        if (!clickdPreferences) return;
        const planReply = e.target.closest("[data-option]");

        if (!planReply) return;

        const titleOrderSummaryArr = [
          "drink",
          "type",
          "how",
          "grind",
          "deliver",
        ];

        titleOrderSummaryArr.forEach((updateTitle, index) => {
          if (clickdPreferences.matches(`[data-open="${index}"]`)) {
            title = planReply.querySelector(".plan__reply--title").textContent;
            document.getElementById(`${updateTitle}`).textContent = title;
          }
        });

        this._workSectionHow(clickdPreferences, title);
        this._activation_button(clickdPreferences, planReply);

        // UPDATE PRICE for "How often should we deliver?"
        this._updatePriceSectionDeliver(title);

        // UPDATE PRICE Modal
        this._updatePriceModal(title);
      }

      _workSectionHow(clickdPreferences, title) {
        const updateTextOrderSummary = function (valueDisplay) {
          document.getElementById("grind").style.display = valueDisplay;
          document.getElementById("complet").style.display = valueDisplay;
        };

        if (clickdPreferences.matches(`[data-open="0"]`)) {
          if (title.includes("Capsule")) {
            orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
              "as",
              "using"
            );
            updateTextOrderSummary("none");
            this._blockGrind("add", "0.5");
            this.#checkedSelection = true;
            this.#checked = true;
          } else if (title.includes("Filter") || title.includes("Espresso")) {
            orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
              "using",
              "as"
            );
            // this._updateTextOrderSummary("inline");
            updateTextOrderSummary("inline");
            this._blockGrind("remove", "1");

            if (this.#checkedSelection) {
              // prettier-ignore
              document.getElementById("btn-disabled").classList.remove("activeButton");
              document
                .querySelector(".btn-box")
                .querySelector('[data-disabled="blockGrind"]')
                .classList.remove("block");
              this.#checked = false;
            }
          }
        }
      }

      _blockGrind(pro, opa) {
        blockGrind.classList[`${pro}`]("block");
        // prettier-ignore
        blockGrind.closest("[data-open]").querySelector(".plan__title").style.opacity = opa;

        document
          .querySelector(".plan__item:nth-child(4)")
          .classList[`${pro}`]("block");
        document
          .querySelector('[data-disabled="blockGrind"]')
          .classList[`${pro}`]("block");
      }

      _activation_button(clickdPreferences) {
        this.#arrCheckButton.forEach((_, index) => {
          if (clickdPreferences.matches(`[data-open="${index}"]`)) {
            this.#arrCheckButton[index] = 1;
          }

          if (clickdPreferences.matches(`[data-open="${index === 3 && 3}"]`)) {
            this.#checked = true;
            this.#checkedSelection = false;
          }

          if (this.#checked) {
            this.#valided = this.#arrCheckButton.every((act) => act === 1);

            // prettier-ignore
            if(this.#valided) {
        document.getElementById("btn-disabled").classList.add("activeButton");
        document
          .querySelector(".btn-box")
          .querySelector('[data-disabled="blockGrind"]')
          .classList.add("block");

      }
          }
        });
      }

      _updatePriceSectionDeliver(title) {
        function updatePrice(price) {
          price.forEach((_, index) => {
            document.querySelector(`[data-price="${index}"]`).innerText =
              price[index];
          });
        }

        let updatePriceModal = this._updatePriceModal;

        function updatingModalPricePerUnit() {
          const sectionDeliver = document.querySelector('[data-open="4"]');
          const planReplyArr = sectionDeliver.querySelectorAll("[data-option]");
          planReplyArr.forEach((plan) => {
            if (plan.classList.contains("active")) {
              const title = plan.querySelector(
                ".plan__reply--title"
              ).textContent;
              updatePriceModal(title);
            }
          });
        }

        if (title === "250g") {
          updatePrice(["$7.20", "$9.60", "$12.00"]);
          updatingModalPricePerUnit();
        }

        if (title.includes("500g")) {
          updatePrice(["$13.00", "$17.50", "$22.00"]);
          updatingModalPricePerUnit();
        }

        if (title.includes("1000g")) {
          updatePrice(["$22.00", "$32.00", "$42.00"]);
          updatingModalPricePerUnit();
        }
      }

      _updatePriceModal(title) {
        if (!title) return;

        function updatePriceModal(price) {
          document.querySelector(
            ".modal__price"
          ).textContent = `$${price.toFixed(2)}/mo`;
        }

        if (title.includes("Every week")) {
          const price =
            +document
              .querySelector('[data-price="0"]')
              .textContent.slice(1, -1) * 4;
          updatePriceModal(price);
        }
        if (title.includes("Every 2 weeks")) {
          const price =
            +document
              .querySelector('[data-price="1"]')
              .textContent.slice(1, -1) * 2;
          updatePriceModal(price);
        }
        if (title.includes("Every month")) {
          const price =
            +document
              .querySelector('[data-price="2"]')
              .textContent.slice(1, -1) * 1;
          updatePriceModal(price);
        }
      }
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
  }
}
