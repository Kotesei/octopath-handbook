import allTravelers from "./Character Data/characterList.js";
let activeFilters = {};
const filteredUnits = [];
// Created an empty variable, will be useful when doing things like click events for sorting
let reverseSort = true;
// Searches for the data contained inside traveler objects
const lookupUnit = (unit) =>
  allTravelers.find((traveler) => traveler.name === unit);
// Searches for the index of traveler
const indexOfUnit = (unit) =>
  allTravelers.findIndex((traveler) => traveler.name === unit);

// Sorts the travelers by the type in either descending ascending orders
const sortUnits = (sortingType, reverseOrder = false) =>
  allTravelers.sort((a, b) =>
    // Sorts from highest to lowest OR lowest to highest if reverse passed through
    reverseOrder
      ? a[sortingType].length - b[sortingType].length
      : b[sortingType].length - a[sortingType].length
  );

// Filters through travelers, takes a condition (rank for example) and value
const filterUnits = (condition, value) => {
  // Checks if activeFilters[condition] is already inside an array.
  if (!Array.isArray(activeFilters[condition])) {
    // If not inside the array, initialize it as an empty one.
    activeFilters[condition] = [];
  }

  // Toggles between filters if same condition & values
  if (activeFilters[condition].includes(value)) {
    activeFilters[condition] = activeFilters[condition].filter(
      (val) => val !== value
    );
  } else {
    // Pushes the value into the condition if different
    activeFilters[condition].push(value);
  }
  const filteredResults = allTravelers.filter((traveler) =>
    activeFilters[condition].some(
      (val) =>
        typeof val === "number"
          ? traveler[condition].length === val // If it's a number (e.g., rank)
          : traveler[condition].includes(val) // If it's a string or array (e.g., type)
    )
  );
  filteredResults.forEach((traveler) => {
    // Only add if the traveler is not already in filteredUnits
    let isDuplicate = false;
    filteredUnits.forEach((unit) => {
      if (unit.name === traveler.name) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      filteredUnits.push(traveler); // Add traveler if not a duplicate
    }
  });
};

export {
  reverseSort,
  lookupUnit,
  indexOfUnit,
  sortUnits,
  filterUnits,
  activeFilters,
  filteredUnits,
};
