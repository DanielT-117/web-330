"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Daniel Topete
    Date:   11/12/2026

    Filename: js10a.js
*/

window.addEventListener("load", setupRoom);

// perform setup tasks when page first loads
function setupRoom() {
  //Page objects
  let room = document.getElementById("room"); // banquet hall
  let storage = document.getElementsByTagName("storage"); // storage room
  let roomTables = document.querySelectorAll("#room > div.table"); // Tables in the banquet hall
  let storageTables = document.querySelectorAll("#storage > div.table"); // Tables in the storage room
  let zIndexCounter = 0; // Count the highest z-Index value
  let startingX, startingY; // initial pointer coordinates
  let tableX, tableY; // initial table coordinates

  // Function to calculate available seats in the room layout
  function countSeats() {
    let guests = 0;
    let seatCount = document.getElementById("seatCount");
    let tablesToCount = document.querySelectorAll("#room > div.table");
    for (let items of tablesToCount) {
      guests += parseInt(items.textContent);
    }
    seatCount.textContent = guests;
  }

  // Add tables from storage to the banquet hall
  for (let items of storageTables) {
    items.onclick = function () {
      let storageCopy = items.cloneNode(true);
      room.appendChild(storageCopy);

      // Increase the z-index so the new table appears on top
      zIndexCounter++;
      storageCopy.style.zIndex = zIndexCounter;

      // Update the room's guest count
      countSeats();

      // Grab the table in response to the pointerdown event
      storageCopy.addEventListener("pointerdown", grabTable);
    };
  }

  // Grab a table from the banquet hall to begin drag and drop
  function grabTable(e) {
    if (e.shiftKey) {
      // Remove the table from the room
      e.target.parentElement.removeChild(e.target);
      countSeats();
    } else {
      // Store the initial position of the pointer
      startingX = e.clientX;
      startingY = e.clientY;

      // Disable the browser's default touch actions
      e.target.style.touchAction = "none";

      // Place the table on top of the other tables
      zIndexCounter++;
      e.target.style.zIndex = zIndexCounter;

      // Store the table's initial position
      tableX = e.target.offsetLeft;
      tableY = e.target.offsetTop;

      // Add event listeners to the table
      e.target.addEventListener("pointermove", moveTable);
      e.target.addEventListener("pointerup", dropTable);
    }
  }

  // Move the table along with the pointer
  function moveTable(e) {
    // Determine the pointer's current position and distance traveled
    let currentX = e.clientX;
    let currentY = e.clientY;
    let deltaX = currentX - startingX;
    let deltaY = currentY - startingY;

    // Calculate the table's new position
    e.target.style.left = tableX + deltaX + "px";
    e.target.style.top = tableY + deltaY + "px";
  }

  // Drop the table onto the banquet hall
  function dropTable(e) {
    e.target.removeEventListener("pointermove", moveTable);
    e.target.removeEventListener("pointerup", dropTable);
  }
}
