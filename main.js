/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/cell.js":
/*!*****************************!*\
  !*** ./src/classes/cell.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cell)\n/* harmony export */ });\n// create new Cell instance\nclass Cell {\n  constructor() {\n    this.ship = null; // contains null or a Ship object\n    this.hit = false; // boolean value whether cell has been hit (false by default)\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/cell.js?");

/***/ }),

/***/ "./src/classes/gameboard.js":
/*!**********************************!*\
  !*** ./src/classes/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ \"./src/classes/cell.js\");\n\n\n// create new Gameboard instance\nclass Gameboard {\n  constructor(gridSize = 10) {\n    this.gridSize = gridSize; // num of cells in x and y axis\n    this.boardData = Gameboard.#buildBoard(gridSize); // build array of cells to represent gameboard\n    this.ships = []; // array of ships placed in gameboard\n  }\n\n  // return array of gridSize ** 2 null cells to represent gameboard\n  static #buildBoard(gridSize) {\n    const boardData = [];\n    // do this gridSize ** 2 times: add a cell (null) to boardData\n    for (let i = 0; i < gridSize ** 2; i++) boardData.push(new _cell_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n    return boardData;\n  }\n\n  // build new Ship of given length (via dependency injection)\n  // and place at appropriate index in boardData based on provided location\n  placeShip(Ship, loc, length) {\n    const ship = new Ship(length);\n    this.ships.push(ship);\n    // do this length times: place new Ship instance at cell\n    for (let i = 0; i < length; i++) this.boardData[loc + i].ship = ship;\n  }\n\n  // marks cell at given location as hit; if ship, increments ship hits\n  receiveAttack(loc) {\n    const cell = this.boardData[loc];\n    // if cell has not yet been hit:\n    if (!cell.hit) {\n      if (cell.ship) cell.ship.hit(); // if cell has ship, increment ship hits\n      cell.hit = true; // mark cell as hit\n    }\n  }\n\n  // report whether or not all ships have been sunk; return boolean value\n  allShipsSunk() {\n    // iterate over all ships in Gameboard\n    for (let i = 0; i < this.ships.length; i++) {\n      if (!this.ships[i].isSunk()) return false; // if ship is not sunk, return false\n    }\n    return true; // if all ships reported sunk, return true\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/gameboard.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n// create new Player instance\n// with 2 static methods to attack Gameboard\nclass Player {\n  constructor(Gameboard, name = 'Player 1') {\n    this.gameboard = new Gameboard();\n    this.name = name;\n  }\n\n  // cause given gameboard at given location to receive attack\n  static attack(gameboard, loc) {\n    gameboard.receiveAttack(loc);\n  }\n\n  // generate random valid location and cause given gameboard to receive attack\n  static randomAttack(gameboard) {\n    // continue to generate random int for loc until it's valid\n    // (Gameboard Cell at loc has not already been hit)\n    let loc;\n    do {\n      loc = Player.#getRandInt(gameboard.gridSize ** 2);\n    } while (gameboard.boardData[loc].hit);\n    Player.attack(gameboard, loc); // cause gameboard to receive attack\n\n    return loc;\n  }\n  static #getRandInt(max, min = 0) {\n    return Math.floor(Math.random() * (max - min) + min);\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/player.js?");

/***/ }),

/***/ "./src/classes/ship.js":
/*!*****************************!*\
  !*** ./src/classes/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\n// create a new Ship instance\n// input: length (num of cells ship occupies)\nclass Ship {\n  constructor(length) {\n    this.length = length; // num of cells ship occupies\n    this.hits = 0; // num of times ship has been hit\n  }\n\n  // increment ship's num of hits\n  hit() {\n    this.hits++;\n  }\n\n  // return boolean value whether ship has been sunk\n  isSunk() {\n    return this.hits >= this.length;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/ship.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = {\n  ai: {\n    gameboardDisplay: document.querySelector('.ai.gameboard'),\n    header: document.querySelector('.ai.name')\n  },\n  user: {\n    gameboardDisplay: document.querySelector('.user.gameboard'),\n    header: document.querySelector('.user.name')\n  },\n  gameOver: {\n    banner: document.querySelector('.game-over'),\n    winner: document.querySelector('.winner')\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n// create Game instance\n// input: Player class, Gameboard class, player names\nclass Game {\n  constructor(Player, Gameboard, name1 = 'Player', name2 = 'Enemy') {\n    this.player1 = new Player(Gameboard, name1);\n    this.player2 = new Player(Gameboard, name2);\n    this.activePlayer = this.player1;\n  }\n  static shipTypes = {\n    // carrier: 5,\n    // battleship: 4,\n    // destroyer: 3,\n    // submarine: 3,\n    patrolBoat: 2\n  };\n\n  // static locs = [0, 20, 40, 60, 80];\n  static locs = [0];\n\n  // place 5 Ships on each Player's Gameboard with predetermined coords\n  // input: Ship class, player to add ships to\n  static placeFleet(Ship, player) {\n    Object.keys(Game.shipTypes).forEach((key, i) => {\n      player.gameboard.placeShip(Ship, Game.locs[i], Game.shipTypes[key]);\n    });\n  }\n\n  // add click event listener to AI gameboard display, starting the game\n  // input: Player class, cached DOM, render functions\n  startGame(Player, dom, renderAttack, renderGameOver) {\n    const startRound = e => {\n      if (this.activePlayer.name === this.player1.name && e.target.classList.contains('cell') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {\n        console.log('attack!');\n        // let each player take turn\n        // if one player's ships have all been sunk, end game\n        this.userTurn(Player, e.target, renderAttack);\n        if (this.checkGameOver(renderGameOver, startRound, dom)) return;\n        this.aiTurn(Player, dom, renderAttack);\n        this.checkGameOver(renderGameOver, startRound, dom);\n      }\n    };\n\n    // add attack event listener to AI gameboard\n    dom.ai.gameboardDisplay.addEventListener('click', startRound);\n  }\n\n  // attack AI gameboard, render attack\n  // input: Player class, clicked cell, render func\n  userTurn(Player, target, renderAttack) {\n    // user attack enemy gameboard at target index\n    Player.attack(this.player2.gameboard, target.dataset.index);\n    // render attack\n    renderAttack(target, this.player2.gameboard.boardData[target.dataset.index]);\n    this.activePlayer = this.player2;\n  }\n\n  // AI attack enemy at random index after 2 seconds\n  // input: Player class, cached DOM, render func\n  aiTurn(Player, dom, renderAttack) {\n    setTimeout(() => {\n      const loc = Player.randomAttack(this.player1.gameboard);\n      renderAttack(dom.user.gameboardDisplay.children[loc], this.player1.gameboard.boardData[loc]);\n      this.activePlayer = this.player1;\n    }, 2000);\n  }\n\n  // check whether attacked player's ships have all been sunk\n  // if so, remove event listener from AI gameboard and render game over\n  // input: render func, startRound func, cached DOM\n  // output: boolean val (whether game is over)\n  checkGameOver(renderGameOver, startRound, dom) {\n    if (this.activePlayer.gameboard.allShipsSunk()) {\n      dom.ai.gameboardDisplay.removeEventListener('click', startRound);\n      this.activePlayer.name === this.player1.name ? renderGameOver(this.player2) : renderGameOver(this.player1);\n      return true;\n    }\n    return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/player.js */ \"./src/classes/player.js\");\n/* harmony import */ var _classes_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/gameboard.js */ \"./src/classes/gameboard.js\");\n/* harmony import */ var _classes_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/ship.js */ \"./src/classes/ship.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', initGame);\n\n// game loop\nfunction initGame() {\n  // create user and AI Players, each with a Gameboard\n  const game = new _game_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_classes_player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _classes_gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  // render grids\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderGrids)(game);\n  // place fleets\n  _game_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].placeFleet(_classes_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], game.player1);\n  _game_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].placeFleet(_classes_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], game.player2);\n  // render user fleet\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderFleet)(game.player1);\n  game.startGame(_classes_player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _dom_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _render_js__WEBPACK_IMPORTED_MODULE_5__.renderAttack, _render_js__WEBPACK_IMPORTED_MODULE_5__.renderGameOver);\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAttack: () => (/* binding */ renderAttack),\n/* harmony export */   renderFleet: () => (/* binding */ renderFleet),\n/* harmony export */   renderGameOver: () => (/* binding */ renderGameOver),\n/* harmony export */   renderGrids: () => (/* binding */ renderGrids)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n// render ai, user titles and 10x10 grids of cells\nfunction renderGrids(game) {\n  renderName(game.player2, _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ai.header);\n  renderName(game.player1, _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.header);\n  renderGrid(game.player2, _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ai.gameboardDisplay);\n  renderGrid(game.player1, _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.gameboardDisplay);\n}\n\n// for given Player, render name in given headerTag\nfunction renderName(player, headerTag) {\n  headerTag.innerText = `${player.name.toUpperCase()}'S BOARD`;\n}\n\n// for given Player, render 10x10 grid of cells on given gameboard display\nfunction renderGrid(player, gameboardDisplay) {\n  // for each Cell in Player Gameboard\n  player.gameboard.boardData.forEach((cell, i) => {\n    // create a new div with 'Cell' class and data-index\n    const div = document.createElement('div');\n    div.classList.add('cell');\n    div.dataset.index = i;\n    // add div to appropriate gameboard display\n    gameboardDisplay.appendChild(div);\n  });\n}\n\n// render given Player's fleet to user gameboard display\nfunction renderFleet(player) {\n  // for each Cell in Player Gameboard\n  player.gameboard.boardData.forEach((cell, i) => {\n    // if cell has ship, render cell\n    if (cell.ship) _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.gameboardDisplay.children[i].classList.add('ship');\n  });\n}\n\n// render attack as hit or miss\nfunction renderAttack(target, cell) {\n  // create circle and append to target\n  target.appendChild(document.createElement('div'));\n  // if hit target, add hit class to target\n  if (cell.ship) target.classList.add('hit');\n  // else, add miss class to target\n  else target.classList.add('miss');\n}\n\n// show game over banner\nfunction renderGameOver(winner) {\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameOver.winner.innerText = winner.name.toUpperCase();\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameOver.banner.classList.remove('hidden');\n}\n\n\n//# sourceURL=webpack://battleship/./src/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;