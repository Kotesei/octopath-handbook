"use strict";
import allTravelers from "./Character Data/characterList.js";

const unitLookup = (unit) => {
  const result = allTravelers.find((traveler) => traveler.name === unit);
  console.log(result);
};

const unitIndex = (unit) => {
  const result = allTravelers.findIndex((traveler) => traveler.name === unit);
  console.log(result);
};

// console.log(allTravelers);
// unitLookup("Odio O");
// unitIndex("Sazantos");
