export default function animationFunction() {
  // Implementing a Sticky Navigation: The Scroll Event
  const nav = document.querySelector(".header__nav");
  const header = document.querySelector(".header");
  const hero = document.querySelectorAll(".heroObserver");
  const headerHeight = header.getBoundingClientRect().height;

  const stikyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };

  const heroObserver = new IntersectionObserver(stikyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  });

  hero.forEach((heroObs) => {
    heroObserver.observe(heroObs);
  });

  const scroll = document.querySelectorAll(".section");

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
}
