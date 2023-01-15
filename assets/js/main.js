"use strict";

// Implementing a Sticky Navigation: The Scroll Event
// const nav = document.querySelector(".header__nav");
// const header = document.querySelector(".header");
// const hero = document.querySelector(".hero");
// const heroHeight = hero.getBoundingClientRect().y;

// const stikyNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) header.classList.add("sticky");
//   else header.classList.remove("sticky");
// };

// const heroObserver = new IntersectionObserver(stikyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${heroHeight}px`,
// });

// heroObserver.observe(hero);
const scroll = document.querySelectorAll(".section");
console.log(scroll);

const scrollAnima = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.onobserve(entry.target);
};

const scrollObserver = new IntersectionObserver(scrollAnima, {
  root: null,
  threshold: 0.15,
});

scroll.forEach((scroll) => {
  scrollObserver.observe(scroll);

  scroll.classList.add("section--hidden");
});

// Dark Theme
// const checkbox = document.querySelector("input[name=theme]");

// const getCurrentTheme = function () {
//   console.log("oi");
//   if (document.body.matches("[data-theme='dark']")) {
//     document.body.setAttribute("data-theme", "dark");
//   } else {
//     document.body.setAttribute("data-theme", "light");
//   }
// };

// function darkFunction() {
//   if (this.checked) {
//     trans();
//     document.body.setAttribute("data-theme", "dark");
//   } else {
//     trans();
//     document.body.setAttribute("data-theme", "light");
//   }

//   // We save the theme and the current icon that the user chose
//   localStorage.setItem("selected-theme", getCurrentTheme());
// }

// checkbox.addEventListener("change", darkFunction);

// let trans = () => {
//   document.body.classList.add("transition");
//   window.setTimeout(() => {
//     document.body.classList.remove("transition");
//   }, 1000);
// };

// // Previously selected topic (if user selected)
// const selectedTheme = localStorage.getItem("theme", "light");
// console.log(selectedTheme);

// if (selectedTheme) {
//   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
//   document.body.setAttribute(
//     "data-theme",
//     `${selectedTheme === "light" ? "dark" : "light"}`
//   );
// }

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bxs-moon" : "bx bxs-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bxs-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
