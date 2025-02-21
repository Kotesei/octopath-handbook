"use strict";
import allTravelers from "./Character Data/characterList.js";
import * as unitTools from "./unitTools.js";

// Good for finding a unit by name
console.log(unitTools.lookupUnit("Odio O"));
// Good for finding the index of unit
console.log(unitTools.indexOfUnit("Goku"));

// If sorting with no filter then it will sort allTravelers (Might just remove adding things like "rank" since sorting by rank seems to be the only time I would use it)
unitTools.sortUnits("rank");

// Filters units by rank 3
unitTools.filterUnits("rank", 3);
// Sorts the filtered units since we are filtering.
unitTools.sortUnits("rank");
// Can also sort in reverse (Probably better to just make a high - low - off sorting function)
// unitTools.sortUnits("rank", unitTools.reverseSort);

console.log(allTravelers);
console.log(unitTools.checkFilters);
console.log(unitTools.filteredUnits);
