/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Daniel Topete
  Date: 11/20/2026
  Filename: script.js
*/

"use strict";

// Create an in-memory object array for each table in the restaurant
let tables = [
  { tableNumber: 1, capacity: 2, isReserved: false },
  { tableNumber: 2, capacity: 2, isReserved: false },
  { tableNumber: 3, capacity: 4, isReserved: false },
  { tableNumber: 4, capacity: 4, isReserved: false },
  { tableNumber: 5, capacity: 6, isReserved: false },
  { tableNumber: 6, capacity: 8, isReserved: false },
];

// Create a function reserveTable
// If the table is available, update its isReserved property, then use
// setTimeout to wait `time` milliseconds before calling the callback with
// a success message.
// If the table is not available, call the callback immediately with an
// error message.
// The callback receives the message as its first actual parameter and
// true/false as its second (so the page can style success vs. error).
function reserveTable(tableNumber, callback, time) {
  const table = tables.find(function (t) {
    return t.tableNumber === tableNumber;
  });

  if (!table) {
    callback("Table number " + tableNumber + " does not exist.", false);
    return;
  }

  if (table.isReserved) {
    callback("Table number " + tableNumber + " is already reserved.", false);
    return;
  }

  table.isReserved = true;
  renderTables();

  setTimeout(function () {
    callback(
      "Table number " + tableNumber + " has been successfully reserved.",
      true
    );
  }, time);
}

// Show the status of every table from the tables array
function renderTables() {
  const statusList = document.getElementById("tableStatus");
  statusList.innerHTML = "";

  tables.forEach(function (table) {
    const item = document.createElement("li");
    item.className = table.isReserved ? "reserved" : "available";
    item.textContent =
      "Table " +
      table.tableNumber +
      " - seats " +
      table.capacity +
      " - " +
      (table.isReserved ? "Reserved" : "Available");
    statusList.appendChild(item);
  });
}

// Show a message under the form; type is "success", "error", or "pending"
function showMessage(text, type) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = type;
}

// When the form is submitted, call the reserveTable function
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const tableNumber = parseInt(
      document.getElementById("tableNumber").value,
      10
    );

    if (isNaN(tableNumber)) {
      showMessage("Please enter a table number.", "error");
      return;
    }

    showMessage("Checking table number " + tableNumber + "...", "pending");

    reserveTable(
      tableNumber,
      function (message, success) {
        showMessage(message, success ? "success" : "error");
      },
      2000
    );
  });

// Build the table status list when the page first loads
renderTables();
