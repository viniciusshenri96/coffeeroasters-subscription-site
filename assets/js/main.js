// Garantindo que a maioria dos navegadores antigos suporta o aplicativo.

// polyfilling todo o resto
import "core-js/stable";

// polyfilling asunc/await
import "regenerator-runtime/runtime";

import planApp from "./modules/logic-plan.js";
import animation from "./modules/animation.js";
import darkMode from "./modules/dark-mode.js";
planApp();
animation();
darkMode();
