import allTravelers from "./Character Data/characterList.js";
// Created an empty variable, will be useful when doing things like click events for sorting
let reverseSort = true;
// Searches for the data contained inside traveler objects
const lookupUnit = (unit) =>
  allTravelers.find((traveler) => traveler.name === unit);
// Searches for the index of traveler
const indexOfUnit = (unit) =>
  allTravelers.findIndex((traveler) => traveler.name === unit);

// Sorts the travelers by the type in either descending ascending orders
const sortUnits = (travelers, sortingType, reverseOrder = false) =>
  travelers.sort((a, b) =>
    // Sorts from highest to lowest OR lowest to highest if reverse passed through
    reverseOrder
      ? a[sortingType].length - b[sortingType].length
      : b[sortingType].length - a[sortingType].length
  );

// Filters through travelers, takes a condition (rank for example) and value
const filterUnits = (travelers, condition, value) =>
  travelers.filter((traveler) => traveler[condition].length === value);

export { reverseSort, lookupUnit, indexOfUnit, sortUnits, filterUnits };
