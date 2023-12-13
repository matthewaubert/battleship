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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ \"./src/classes/cell.js\");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ \"./src/helpers.js\");\n\n\n\n// create new Gameboard instance\nclass Gameboard {\n  constructor(gridSize = 10) {\n    this.gridSize = gridSize; // num of Cells in x and y axis\n    this.boardData = Gameboard.#buildBoard(gridSize); // build array of Cells to represent gameboard\n    this.ships = []; // array of ships placed in Gameboard\n  }\n\n  // return array of gridSize ** 2 empty Cells to represent gameboard\n  static #buildBoard(gridSize) {\n    const boardData = [];\n    for (let i = 0; i < gridSize ** 2; i++) boardData.push(new _cell_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n    return boardData;\n  }\n\n  // build new Ship of given length (via dependency injection)\n  // and place at appropriate index in boardData based on provided location\n  placeShip(Ship, startingLoc, name, length, orientation) {\n    const ship = new Ship(name, length, orientation);\n    this.ships.push(ship);\n\n    // do this length times: place new Ship instance at cell\n    for (let i = 0; i < length; i++) {\n      const loc = startingLoc + this.getDeltas()[ship.orientation] * i;\n      this.boardData[loc].ship = ship;\n    }\n  }\n\n  // return deltas for Ship placement in both orientations\n  getDeltas() {\n    return {\n      horizontal: 1,\n      vertical: this.gridSize\n    };\n  }\n\n  // marks cell at given location as hit; if Ship, increments Ship hits\n  receiveAttack(loc) {\n    const cell = this.boardData[loc];\n    // if cell has not yet been hit:\n    if (!cell.hit) {\n      if (cell.ship) cell.ship.hit(); // if cell has ship, increment Ship hits\n      cell.hit = true; // mark cell as hit\n    }\n  }\n\n  // report whether or not all Ships have been sunk\n  // output: boolean value\n  allShipsSunk() {\n    // iterate over all ships in Gameboard\n    for (let i = 0; i < this.ships.length; i++) {\n      if (!this.ships[i].isSunk()) return false; // if Ship is not sunk, return false\n    }\n    return true; // if all Ships reported sunk, return true\n  }\n\n  // place 5 Ships on Gameboard\n  // input: Ship class\n  placeFleet(Ship) {\n    const shipData = {\n      carrier: {\n        name: 'carrier',\n        length: 5\n      },\n      battleship: {\n        name: 'battleship',\n        length: 4\n      },\n      destroyer: {\n        name: 'destroyer',\n        length: 3\n      },\n      submarine: {\n        name: 'submarine',\n        length: 3\n      },\n      patrolBoat: {\n        name: 'patrol boat',\n        length: 2\n      }\n    };\n\n    // for each ship: get random orientation and location, place Ship\n    Object.keys(shipData).forEach(key => {\n      shipData[key].orientation = Ship.getRandOrientation();\n      shipData[key].loc = this.#getRandLoc(shipData[key]);\n      this.placeShip(Ship, shipData[key].loc, shipData[key].name, shipData[key].length, shipData[key].orientation);\n    });\n  }\n\n  // input: ship data (orientation, length)\n  // output: random valid starting location\n  // (valid if all successive locations are in bounds and w/o a Ship)\n  #getRandLoc(shipData) {\n    let startingLoc;\n\n    // continue to get random starting int btw 0 and gridSize ** 2\n    // until all successive locs are in bounds and w/o a Ship\n    do {\n      startingLoc = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandInt)(0, this.gridSize ** 2);\n    } while (!this.isValidLoc(startingLoc, shipData) || this.shipExists(startingLoc, shipData));\n    return startingLoc;\n  }\n\n  // return boolean value whether given starting location\n  // is valid given ship data (orientation and length)\n  isValidLoc(startingLoc, shipData) {\n    const conditions = {\n      horizontal: startingLoc % this.gridSize < (startingLoc + shipData.length - 1) % this.gridSize,\n      vertical: startingLoc + (shipData.length - 1) * this.gridSize < this.gridSize ** 2\n    };\n    return conditions[shipData.orientation];\n  }\n\n  // check if Ship already exists at Cells where a new Ship would go\n  // input: starting location and ship data (length and orientation)\n  // output: boolean value\n  shipExists(startingLoc, shipData) {\n    for (let i = 0; i < shipData.length; i++) {\n      const loc = startingLoc + this.getDeltas()[shipData.orientation] * i;\n      // if Ship exists at given location, return true\n      if (this.boardData[loc].ship !== null) return true;\n    }\n\n    // if no Ships exist at any reviewed locations, return false\n    return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/gameboard.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/helpers.js\");\n\n\n// create new Player instance\n// with 2 static methods to attack Gameboard\nclass Player {\n  constructor(Gameboard, name) {\n    this.gameboard = new Gameboard();\n    this.name = name;\n  }\n\n  // cause given gameboard at given location to receive attack\n  static attack(gameboard, loc) {\n    gameboard.receiveAttack(loc);\n  }\n\n  // generate random valid location and cause given gameboard to receive attack\n  static randomAttack(gameboard) {\n    // continue to generate random int for loc until it's valid\n    // (Gameboard Cell at loc has not already been hit)\n    let loc;\n    do {\n      loc = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getRandInt)(0, gameboard.gridSize ** 2);\n    } while (gameboard.boardData[loc].hit);\n    Player.attack(gameboard, loc); // cause gameboard to receive attack\n\n    return loc;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/player.js?");

/***/ }),

/***/ "./src/classes/ship.js":
/*!*****************************!*\
  !*** ./src/classes/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/helpers.js\");\n\n\n// create a new Ship instance\n// input: name, length (num of cells), orientation (horizontal/vertical)\nclass Ship {\n  constructor(name, length, orientation) {\n    this.name = name;\n    this.length = length; // num of cells Ship occupies\n    this.orientation = orientation; // horizontal or vertical\n    this.hits = 0; // num of times Ship has been hit\n  }\n\n  // randomly return 'horizontal' or 'vertical'\n  static getRandOrientation() {\n    const orientations = ['horizontal', 'vertical'];\n    return orientations[(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getRandInt)(0, 2)];\n  }\n\n  // increment Ship's num of hits\n  hit() {\n    this.hits++;\n  }\n\n  // return boolean value whether Ship has been sunk\n  isSunk() {\n    return this.hits >= this.length;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/classes/ship.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = {\n  main: document.querySelector('main'),\n  ai: {\n    gameboardDisplay: document.querySelector('.ai.gameboard')\n  },\n  user: {\n    gameboardDisplay: document.querySelector('.user.gameboard')\n  },\n  setup: {\n    display: document.querySelector('.setup'),\n    instruct: document.querySelector('.setup > .instruct'),\n    rotate: document.querySelector('.setup > .rotate'),\n    gameboardDisplay: document.querySelector('.setup > .gameboard')\n  },\n  gameOver: {\n    banner: document.querySelector('.game-over'),\n    winner: document.querySelector('.winner')\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ \"./src/helpers.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n\n\n\n\n// create Game instance\n// input: Player class, Gameboard class, player names\nclass Game {\n  constructor(Player, Gameboard, name1 = 'Player', name2 = 'Enemy') {\n    this.player1 = new Player(Gameboard, name1);\n    this.player2 = new Player(Gameboard, name2);\n    this.activePlayer = this.player1;\n  }\n\n  // add click event listener to AI gameboard display, starting the game\n  // input: Player class\n  startGame(Player) {\n    const startRound = async e => {\n      if (this.activePlayer.name === this.player1.name && e.target.classList.contains('cell') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {\n        // let each player take turn\n        // if one player's ships have all been sunk, end game\n        this.userTurn(Player, e.target);\n        if (this.checkGameOver(startRound)) return;\n        await (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wait)(750); // wait 750 ms to simulate AI making a decision\n        this.aiTurn(Player);\n        this.checkGameOver(startRound);\n      }\n    };\n\n    // add attack event listener to AI gameboard\n    _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ai.gameboardDisplay.addEventListener('click', startRound);\n  }\n\n  // attack AI gameboard, render attack\n  // input: Player class, clicked cell\n  userTurn(Player, target) {\n    // user attack enemy gameboard at target index\n    Player.attack(this.player2.gameboard, target.dataset.index);\n    const cell = this.player2.gameboard.boardData[target.dataset.index];\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderAttack)(target, cell);\n    // if ship at loc is sunk, render ship to ai gameboard display\n    if (cell.ship && cell.ship.isSunk()) (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderShip)(cell.ship, this.player2.gameboard, 'ai');\n    this.activePlayer = this.player2;\n  }\n\n  // attack user gameboard at random index after 1 second, render attack\n  // input: Player class\n  aiTurn(Player) {\n    const loc = Player.randomAttack(this.player1.gameboard);\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderAttack)(_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.gameboardDisplay.children[loc], this.player1.gameboard.boardData[loc]);\n    this.activePlayer = this.player1;\n  }\n\n  // check whether attacked player's ships have all been sunk\n  // if so, remove event listener from AI gameboard and render game over\n  // input: startRound func\n  // output: boolean val (whether game is over)\n  checkGameOver(startRound) {\n    if (this.activePlayer.gameboard.allShipsSunk()) {\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ai.gameboardDisplay.removeEventListener('click', startRound);\n      this.activePlayer.name === this.player1.name ? (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderGameOver)('YOU LOSE') : (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderGameOver)('YOU WIN!');\n      return true;\n    }\n    return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandInt: () => (/* binding */ getRandInt),\n/* harmony export */   kebabize: () => (/* binding */ kebabize),\n/* harmony export */   wait: () => (/* binding */ wait)\n/* harmony export */ });\n// return random integer btw min (inclusive) and max (exclusive)\nfunction getRandInt(min, max) {\n  return Math.floor(Math.random() * (max - min) + min);\n}\n\n// return normal string converted to kebab-case\n// e.g. kebabize('Patrol boat') == 'patrol-boat'\nfunction kebabize(string) {\n  return string.toLowerCase().replace(' ', '-');\n}\n\n// return Promise that resolves in given milliseconds\nfunction wait(ms) {\n  return new Promise(resolve => {\n    setTimeout(resolve, ms);\n  });\n}\n\n\n//# sourceURL=webpack://battleship/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/player.js */ \"./src/classes/player.js\");\n/* harmony import */ var _classes_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/gameboard.js */ \"./src/classes/gameboard.js\");\n/* harmony import */ var _classes_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/ship.js */ \"./src/classes/ship.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setup.js */ \"./src/setup.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', initGame);\n\n// game loop\nasync function initGame() {\n  // create user and AI Players, each with a Gameboard\n  const game = new _game_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_classes_player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _classes_gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n  // init setup\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderGrid)(game.player1, 'setup');\n  await (0,_setup_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_classes_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], game.player1.gameboard);\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.hideSetup)();\n\n  // render grids\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderGrid)(game.player2, 'ai');\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderGrid)(game.player1, 'user');\n  // place ai fleet\n  game.player2.gameboard.placeFleet(_classes_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  // render user fleet\n  (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.renderFleet)(game.player1);\n  game.startGame(_classes_player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hideSetup: () => (/* binding */ hideSetup),\n/* harmony export */   renderAttack: () => (/* binding */ renderAttack),\n/* harmony export */   renderFleet: () => (/* binding */ renderFleet),\n/* harmony export */   renderGameOver: () => (/* binding */ renderGameOver),\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid),\n/* harmony export */   renderShip: () => (/* binding */ renderShip)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ \"./src/helpers.js\");\n\n\n\n// for given Player, render 10x10 grid of cells on given gameboard display\nfunction renderGrid(player, elName) {\n  // for each Cell in Player Gameboard\n  player.gameboard.boardData.forEach((cell, i) => {\n    // create a new div with 'cell' class and data-index\n    const div = document.createElement('div');\n    div.classList.add('cell');\n    div.dataset.index = i;\n    div.style.gridRow = Math.floor(i / player.gameboard.gridSize) + 1;\n    div.style.gridColumn = i % player.gameboard.gridSize + 1;\n\n    // add div to appropriate gameboard display\n    _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][elName].gameboardDisplay.appendChild(div);\n  });\n}\n\n// hide initial setup screen\nasync function hideSetup() {\n  const ms = 1000;\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.display.classList.add('clear');\n  await (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wait)(ms);\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.display.classList.add('hidden');\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].main.classList.remove('hidden');\n  await (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wait)(ms);\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].main.classList.remove('clear');\n}\n\n// render all given Player's Ships to user gameboard display\nfunction renderFleet(player) {\n  player.gameboard.ships.forEach(ship => {\n    renderShip(ship, player.gameboard, 'user');\n  });\n}\n\n// render given Ship to user gameboard display\nfunction renderShip(ship, gameboard, elName) {\n  // find index of first Cell that contains Ship\n  let startIndex;\n  for (let i = 0, n = gameboard.boardData.length; i < n; i++) {\n    const cell = gameboard.boardData[i];\n    if (cell.ship && cell.ship.name === ship.name) {\n      startIndex = i;\n      break;\n    }\n  }\n\n  // create ship element and append to gameboard display\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][elName].gameboardDisplay.append(createShipElem(ship, startIndex));\n}\n\n// create ship HTML element\n// input: ship, start index\n// output: HTML element\nfunction createShipElem(ship, startIndex) {\n  // create ship element\n  const shipElem = document.createElement('div');\n  shipElem.classList.add('ship');\n  shipElem.id = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.kebabize)(ship.name);\n  shipElem.draggable = true;\n\n  // calc grid-area of ship element\n  switch (ship.orientation) {\n    case 'horizontal':\n      shipElem.style.gridRowStart = Math.floor(startIndex / 10) + 1;\n      shipElem.style.gridRowEnd = Math.floor(startIndex / 10) + 2;\n      shipElem.style.gridColumnStart = startIndex % 10 + 1;\n      shipElem.style.gridColumnEnd = startIndex % 10 + ship.length + 1;\n      break;\n    default:\n      shipElem.style.gridRowStart = Math.floor(startIndex / 10) + 1;\n      shipElem.style.gridRowEnd = Math.floor(startIndex / 10) + ship.length + 1;\n      shipElem.style.gridColumnStart = startIndex % 10 + 1;\n      shipElem.style.gridColumnEnd = startIndex % 10 + 2;\n  }\n  return shipElem;\n}\n\n// render attack as hit or miss\nfunction renderAttack(target, cell) {\n  // if hit target, add hit class to target\n  if (cell.ship) target.classList.add('hit');\n  // else, add miss class to target\n  else target.classList.add('miss');\n}\n\n// show game over banner\nasync function renderGameOver(msg) {\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameOver.winner.innerText = msg;\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameOver.banner.classList.remove('hidden');\n  await (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wait)(0);\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameOver.banner.classList.remove('clear');\n}\n\n\n//# sourceURL=webpack://battleship/./src/render.js?");

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ initSetup)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n\n\nconst shipData = {\n  carrier: {\n    name: 'carrier',\n    length: 5,\n    orientation: 'horizontal'\n  },\n  battleship: {\n    name: 'battleship',\n    length: 4,\n    orientation: 'horizontal'\n  },\n  destroyer: {\n    name: 'destroyer',\n    length: 3,\n    orientation: 'horizontal'\n  },\n  submarine: {\n    name: 'submarine',\n    length: 3,\n    orientation: 'horizontal'\n  },\n  patrolBoat: {\n    name: 'patrol boat',\n    length: 2,\n    orientation: 'horizontal'\n  }\n};\nlet Ship;\nlet gameboard;\nlet key;\n\n// loop thru shipData, wait for user to click on grid to place each ship,\n// show feedback for example ship placement as user hovers over squares\nasync function initSetup(ShipClass, gameboardInstance) {\n  Ship = ShipClass;\n  gameboard = gameboardInstance;\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.addEventListener('click', resolveContinue);\n\n  // placing ships: for each ship:\n  for (const currKey in shipData) {\n    if (Object.hasOwn(shipData, currKey)) {\n      key = currKey;\n      // render ship name in setup.instruct\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.instruct.innerText = `place your ${shipData[key].name}`.toUpperCase();\n\n      // allow player to rotate ship\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.rotate.addEventListener('click', rotateShip);\n\n      // when player hovers over board, show ship placement\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.addEventListener('mouseover', showShipPlace);\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.addEventListener('mouseout', hideShipPlace);\n\n      // when player clicks on board, place ship and continue to next iteration\n      await waitForClick();\n\n      // remove hover event listeners\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.removeEventListener('mouseover', showShipPlace);\n      _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.removeEventListener('mouseout', hideShipPlace);\n    }\n  }\n  _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.removeEventListener('click', resolveContinue);\n}\n\n// change orientation of current ship\nfunction rotateShip() {\n  shipData[key].orientation = shipData[key].orientation === 'horizontal' ? 'vertical' : 'horizontal';\n}\n\n// render example ship placement on mouseover\nfunction showShipPlace(e) {\n  if (e.target.classList.contains('cell')) {\n    const startingLoc = Number(e.target.dataset.index);\n\n    // if user hovered on valid gameboard cell:\n    if (gameboard.isValidLoc(startingLoc, shipData[key]) && !gameboard.shipExists(startingLoc, shipData[key])) {\n      // show example ship placement\n      for (let i = 0; i < shipData[key].length; i++) {\n        const loc = startingLoc + gameboard.getDeltas()[shipData[key].orientation] * i;\n        _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.children[loc].classList.add('ship-hover');\n      }\n      // else: show cell to be invalid\n    } else {\n      e.target.classList.add('invalid');\n    }\n  }\n}\n\n// remove example ship placement on mouseout\nfunction hideShipPlace(e) {\n  if (e.target.classList.contains('cell')) {\n    const startingLoc = Number(e.target.dataset.index);\n\n    // if user mouse left valid gameboard cell:\n    if (gameboard.isValidLoc(startingLoc, shipData[key]) && !gameboard.shipExists(startingLoc, shipData[key])) {\n      // clear example ship placement\n      for (let i = 0; i < shipData[key].length; i++) {\n        const loc = startingLoc + gameboard.getDeltas()[shipData[key].orientation] * i;\n        _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setup.gameboardDisplay.children[loc].classList.remove('ship-hover');\n      }\n      // else: clear rendering showing cell to be invalid\n    } else {\n      e.target.classList.remove('invalid');\n    }\n  }\n}\n\n// resolve promise returned by waitForClick\nlet waitForClickResolve;\n\n// return new promise that resolves when user clicks on\n// gameboard display to place ship\nfunction waitForClick() {\n  return new Promise(resolve => {\n    waitForClickResolve = resolve;\n  });\n}\n\n// if user clicked on valid gameboard cell: place and render ship, call func\n// to resolve promise to continue to next iteration of ship placement loop\nfunction resolveContinue(e) {\n  const startingLoc = Number(e.target.dataset.index);\n\n  // if user clicked on valid gameboard cell:\n  if (waitForClickResolve && e.target.classList.contains('cell') && gameboard.isValidLoc(startingLoc, shipData[key]) && !gameboard.shipExists(startingLoc, shipData[key])) {\n    // place and render ship\n    gameboard.placeShip(Ship, startingLoc, shipData[key].name, shipData[key].length, shipData[key].orientation);\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderShip)(gameboard.ships.at(-1), gameboard, 'setup');\n    waitForClickResolve(); // resolve promise\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/setup.js?");

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