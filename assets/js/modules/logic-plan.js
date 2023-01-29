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
    const activeClass = "active";

    class App {
      // private properties
      /** leaving only an index of 1, which is "Do you want us to shred?" so you don't have to verify again */
      #arrCheckButton = [0, 0, 0, 1, 0];
      #checked = true;
      #valided = true;
      #checkedSelection = true;

      constructor() {
        this._eventClick();
      }

      _eventClick() {
        planSelectionContainer.addEventListener(
          "click",
          this._workingClick.bind(this)
        );
      }

      _workingClick(e) {
        this._accordion(e);

        this._activeAside(e);

        this._selectingOption(e);

        this._updateOrderSummaryTitleOption(e);
      }

      _accordion(e) {
        e.preventDefault();
        let preferenceOpen;

        if (e.target.matches("[data-button]")) {
          preferenceOpen = e.target.closest("[data-open]");

          if (!preferenceOpen.hasAttribute("open"))
            preferenceOpen.setAttribute("open", "");
          else preferenceOpen.removeAttribute("open");
        }
      }

      _activeAside(e) {
        const listAside = document.querySelectorAll(`[data-list-aside]`);
        listAside.forEach((_, index) => {
          if (e.target.matches(`[data-button ='${index}']`)) {
            const element = document.querySelector(
              `[data-list-aside="${index}"]`
            );
            listAside.forEach((list) => list.classList.remove(activeClass));
            element.classList.add(activeClass);
          }
        });
      }

      _selectingOption(e) {
        const clickedOption = e.target.closest("[data-option]");
        const optionsAll = e.target.closest("[data-options]");
        if (!clickedOption) return;
        const optionsArr = optionsAll.querySelectorAll("[data-option]");
        optionsArr.forEach((opt) => opt.classList.remove(activeClass));
        clickedOption.classList.add(activeClass);
      }

      _updateOrderSummaryTitleOption(e) {
        let titleEl;
        const clickedPreferences = e.target.closest("[data-open]");

        const planReply = e.target.closest("[data-option]");

        if (!planReply) return;

        // adding selection title in white space where appropriate
        titleEl = planReply.querySelector(".plan__reply--title");
        const titleOrderEl = document.querySelectorAll(
          ".plan__order-summary--box [data-title]"
        );
        titleOrderEl.forEach((titleOrder) => {
          if (titleOrder.dataset.title === titleEl.dataset.title)
            titleOrder.textContent = titleEl.textContent;
        });

        const title = titleEl.textContent;

        this._workSectionHow(clickedPreferences, title);

        this._activation_button(clickedPreferences, planReply);

        // UPDATE PRICE for "How often should we deliver?"
        this._updatePriceSectionDeliver(title);

        // UPDATE PRICE Modal
        this._updatePriceModal(title);
      }

      _workSectionHow(clickedPreferences, title) {
        const updateTextOrderSummary = function (valueDisplay) {
          document.querySelector(
            ".plan__order-summary--box [data-title='3']"
          ).style.display = valueDisplay;
          document.getElementById("complet").style.display = valueDisplay;
        };

        if (clickedPreferences.matches(`[data-open="0"]`)) {
          if (title.includes("Capsule")) {
            // Order summary texts updates
            orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
              "as",
              "using"
            );
            updateTextOrderSummary("none");

            this.blockGrind("add", "0.5");

            this.defaultGrind();
            this.#checkedSelection = true;
            this.#checked = true;
          } else if (title.includes("Filter") || title.includes("Espresso")) {
            orderSummaryText.innerHTML = orderSummaryText.innerHTML.replace(
              "using",
              "as"
            );
            updateTextOrderSummary("inline");
            this.blockGrind("remove", "1");

            if (this.#checkedSelection) {
              document
                .getElementById("btn-disabled")
                .classList.remove("activeButton");
              document
                .querySelector(".btn-box")
                .querySelector('[data-disabled="blockGrind"]')
                .classList.remove("block");
              this.#checked = false;
            }
          }
        }
      }

      defaultGrind() {
        document.querySelector('[data-open="3"]').removeAttribute("open");
        document
          .querySelector('[data-open="3"]')
          .querySelectorAll("[data-option]")
          .forEach((opt) => opt.classList.remove(activeClass));
      }

      // The "Want us to grind them?" section should be disabled and not able to be opened
      blockGrind(pro, opa) {
        blockGrind.classList[`${pro}`]("block");

        blockGrind
          .closest("[data-open]")
          .querySelector(".plan__title").style.opacity = opa;

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

            if (this.#valided) {
              document
                .getElementById("btn-disabled")
                .classList.add("activeButton");
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

        // Updating the price in the modal when the user changes options in the "How much would you like?"
        function updatingModalPricePerUnit() {
          const sectionDeliver = document.querySelector('[data-open="4"]');
          const planReplyArr = sectionDeliver.querySelectorAll("[data-option]");
          planReplyArr.forEach((plan) => {
            if (plan.classList.contains(activeClass)) {
              const title = plan.querySelector(
                ".plan__reply--title"
              ).textContent;
              updatePriceModal(title);
            }
          });
        }

        // Updating per shipment price (shown in "How often should we deliver?" section at the bottom) based on selected weight
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

      // Calculating per month cost for the Order Summary modal
      _updatePriceModal(title) {
        if (!title) return;

        function updatePriceModal(value, index) {
          const price =
            +document
              .querySelector(`[data-price="${index}"]`)
              .textContent.slice(1, -1) * value;

          document.querySelector(
            ".modal__price"
          ).textContent = `$${price.toFixed(2)} / mo`;
        }

        if (title.includes("Every week")) {
          updatePriceModal(4, "0");
        }
        if (title.includes("Every 2 weeks")) {
          updatePriceModal(2, "1");
        }
        if (title.includes("Every month")) {
          updatePriceModal(1, "2");
        }
      }
    }

    const app = new App();

    // Logic Modal
    const openModal = function (e) {
      e.preventDefault();
      modal.classList.add(activeClass);
      overlay.classList.add(activeClass);
      orderModal.innerHTML = orderSummaryText.innerHTML;

      // Update order summary modal
      if (!orderModal.innerText.includes("ground ala")) return;
      orderModal
        .querySelector("[data-modal='modal--complet']")
        .classList.add("activeColor");
    };

    const closeModal = function () {
      modal.classList.remove(activeClass);
      overlay.classList.remove(activeClass);
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
