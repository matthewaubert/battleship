# Battleship

This project was built as part of <a href="https://www.theodinproject.com/lessons/node-path-javascript-battleship">The Odin Project: JavaScript course</a> in order to practice what I've learned about test-driven development in JavaScript.

## Understanding the Problem

Implement the classic game 'Battleship' in the browser using test-driven development.

I will only perform unit testing on application functionality; no integration testing or testing the DOM.

For an explanation of the rules of the game: https://en.wikipedia.org/wiki/Battleship_(game)

## Plan

1. <a href="https://gist.github.com/matthewaubert/0d52f8d091566bf553491cc88e7e3ccb">Project startup</a>

1. Create the `Ship` class/factory
   - A `Ship` instance will have the following properties:
     - length
     - number of times it's been hit
   - Ships will have a `hit()` method that increases the number of 'hits' in that instance
   - Ships will have an `isSunk()` method that calculates whether it is considered sunk based on its length and the number of hits it has received
   - _Consider_: I only need to test an object's public interface. Only methods or properties that are used outside of a `Ship` instance need unit tests. (This follows the rule: do not test private methods.)

1. Create a `Gameboard` class/factory
   - Gameboards will be able to place ships at specific coordinates by calling the `Ship` class/factory
   - Gameboards will have a `receiveAttack` function that takes in a pair of coordinates, determines whether or not the attack hit a ship, and then either sends the `hit()` function to the appropriate ship or records the coordinates of the missed shot
   - Gameboards will keep track of missed attacks so they can display them properly
   - Gameboards will be able to report whether or not all of their ships have been sunk

1. Create a `Player` class/factory
   - Players take turns playing the game by attacking the enemy Gameboard
   - The game is played against the computer, so make the 'computer' player capable or making random plays. The AI doesn't have to be smart, but it should know whether a given move is legal (i.e. it shouldn't shoot the same coordinate twice)

1. Create the main game loop and a module for DOM interaction
   - Begin crafting user interface
   - The game loop should set up a new game by creating Players and Gameboards. For starters, just populate each Gameboard with predetermined coordinates. I will later implement a system for allowing players to place their ships.
   - Create functions to render both players' boards using information from the appropriate Gameboard
   - Create functions to allow the user to click on a coordinate in the enemy Gameboard to attack
   - _Consider_: The game loop should step through the game turn by turn using only methods from other objects. If any any point I am tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
   - Create conditions so that the game ends once one player's ships have all been sunk. This function is appropriate for the Game module

1. Finish it up!
   - Implement system that allows players to place their ships.
   - Polish the AI of the computer player by having it try adjacent slots after getting a 'hit'
   - _Optionally_, create a 2-player option that lets users take turns by passing the device back and forth.
     - Make sure the game is playable on mobile
     - Implement a 'pass device' screen so that players don't see each others boards