"use strict";
import allTravelers from "./Character Data/characterList.js";
import * as unitTools from "./unitTools.js";

console.log(allTravelers);
// Sorting feature highest to low, at the moment rank is the only value that this seems good for
console.log(unitTools.sortUnits(allTravelers, "rank"));
// Sorting feature but does lowest to high
console.log(unitTools.sortUnits(allTravelers, "rank", unitTools.reverseSort));
// Good for finding a unit by name
console.log(unitTools.lookupUnit("Odio O"));
// Good for finding the index of unit
console.log(unitTools.indexOfUnit("Goku"));
// Could probably make an event listener for buttons and pass things like "rank" or value at the end.
// This takes in all the travelers, and a condition, along with the value:
// So we only want to see rank 5 units only.
console.log(unitTools.filterUnits(allTravelers, "rank", 5));
// In this case we want to only see units who use sword
console.log(unitTools.filterUnits(allTravelers, "type", "Sword"));
// In this case we want to only see units who use light
console.log(unitTools.filterUnits(allTravelers, "type", "Light"));
