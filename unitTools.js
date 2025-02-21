import allTravelers from "./Character Data/characterList.js";
let activeFilters = {};
let filteredUnits = [];
let checkFilters;
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
  filteredUnits && filteredUnits.length > 0 // Check if filteredUnits is not empty
    ? filteredUnits.sort((a, b) =>
        reverseOrder
          ? a[sortingType].slice(-1)[0] - b[sortingType].slice(-1)[0]
          : b[sortingType].slice(-1)[0] - a[sortingType].slice(-1)[0]
      )
    : allTravelers.sort((a, b) =>
        reverseOrder
          ? a[sortingType].slice(-1)[0] - b[sortingType].slice(-1)[0]
          : b[sortingType].slice(-1)[0] - a[sortingType].slice(-1)[0]
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
    // Remove filter if already included
    activeFilters[condition] = activeFilters[condition].filter(
      (val) => val !== value
    );
  } else {
    // Add filter if not already included
    activeFilters[condition].push(value);
  }

  // Apply all active filters with AND logic for each condition
  filteredUnits = allTravelers.filter((traveler) =>
    Object.keys(activeFilters).every((filterCondition) => {
      // Get the filter values for this condition
      const filterValues = activeFilters[filterCondition];

      // Normalize traveler condition (ensure it's an array)
      const travelerCondition = Array.isArray(traveler[filterCondition])
        ? traveler[filterCondition]
        : [traveler[filterCondition]]; // Make sure it's an array

      // Check if all selected filter values are in the traveler condition
      return filterValues.every((val) => travelerCondition.includes(val));
    })
  );

  checkFilters = logFilters(activeFilters);
};

const logFilters = function (filter) {
  let filtersMessage = "Filter by:"; // Initialize the message each time

  if (
    (!filter.rank || filter.rank.length === 0) &&
    (!filter.type || filter.type.length === 0)
  ) {
    filtersMessage += " None"; // If neither filter is applied
  } else {
    if (filter.rank && filter.rank.length > 0) {
      filtersMessage += `\nRanks: ${formatFilterList(filter.rank)}`;
    }

    if (filter.type && filter.type.length > 0) {
      filtersMessage += `\nTypes: ${formatFilterList(filter.type)}`;
    }
  }
  return filtersMessage;
};

// Helper function to format the filter list
const formatFilterList = (list) => {
  if (list.length > 2) {
    // More than two items, separate by commas, and put "&" before the last item
    return list.slice(0, -1).join(", ") + " & " + list[list.length - 1];
  }
  // If there are two or fewer items, join with "&"
  return list.join(" & ");
};

export {
  reverseSort,
  lookupUnit,
  indexOfUnit,
  sortUnits,
  filterUnits,
  activeFilters,
  filteredUnits,
  checkFilters,
};
