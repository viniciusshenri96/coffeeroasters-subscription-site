// Ensuring that most old browsers support the app.
import "core-js/stable";

// polyfilling async/array
import "regenerator-runtime/runtime";

import planApp from "./modules/logic-plan.js";
import animation from "./modules/animation.js";
import darkMode from "./modules/dark-mode.js";

import menuMobile from "./modules/menu-mobile.js";
planApp();
animation();
darkMode();
menuMobile();
