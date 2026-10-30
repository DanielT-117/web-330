/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Daniel Topete
  Date: 10/30/2026
  Filename: script.js
*/

"use strict";

// Returns a character object whose name, gender, and class are kept private
// by the closure: they can only be read through the getter functions.
function createCharacter(name, gender, characterClass) {
  return {
    getName: function () {
      return name;
    },
    getGender: function () {
      return gender;
    },
    getClass: function () {
      return characterClass;
    },
  };
}

document.getElementById("generateHero").addEventListener("click", function (e) {
  e.preventDefault();

  // Make sure every field has been filled in before creating the character
  const form = document.getElementById("characterForm");
  if (!form.reportValidity()) {
    return;
  }

  // Get form values
  const name = document.getElementById("heroName").value.trim();
  const gender = document.getElementById("heroGender").value;
  const characterClass = document.getElementById("heroClass").value;

  // Create character
  const hero = createCharacter(name, gender, characterClass);

  // Display character information
  const output = document.getElementById("characterOutput");
  output.innerHTML = "";
  output.className = "card " + hero.getClass();

  const fields = [
    ["Name", hero.getName()],
    ["Gender", hero.getGender()],
    ["Class", hero.getClass()],
  ];
  fields.forEach(function (field) {
    const line = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = field[0] + ":";
    line.appendChild(label);
    line.appendChild(document.createTextNode(" " + field[1]));
    output.appendChild(line);
  });
});
