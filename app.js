"use strict";
import allTravelers from "./Character Data/characterList.js";
import * as unitTools from "./unitTools.js";

// console.log(allTravelers);
// Sorting feature highest to low, at the moment rank is the only value that this seems good for
// console.log(unitTools.sortUnits("rank"));
// Sorting feature but does lowest to high
unitTools.sortUnits("rank", unitTools.reverseSort);
// Good for finding a unit by name
// console.log(unitTools.lookupUnit("Odio O"));
// Good for finding the index of unit
console.log(unitTools.indexOfUnit("Goku"));
// Filters by ranks 5 & 6
unitTools.filterUnits("rank", 5);
unitTools.filterUnits("rank", 6);
// Filters by Dark types
unitTools.filterUnits("type", "Dark");

// Sorts by rank lowest to highest
unitTools.sortUnits("rank", unitTools.reverseSort);
console.log(allTravelers);
console.log(unitTools.filteredUnits);
