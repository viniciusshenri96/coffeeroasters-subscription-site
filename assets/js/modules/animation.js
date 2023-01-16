export default function animationFunction() {
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

    observer.unobserve(entry.target);
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
}
