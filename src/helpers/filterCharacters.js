import Travelers from "../assets/octopathCoTCUnitList.json";
const travelersData = Travelers["CoTCCharacters"];

class FilterTravelers {
  constructor() {
    this.unsortedTravelers = travelersData;
    this.filteredTravelers = [...travelersData];
    this.types = this.getUniqueValues("types");
    this.influences = this.getUniqueValues("influence");
    this.jobs = this.getUniqueValues("job");
    this.genders = this.getUniqueValues("gender");
  }
  getUniqueValues(property) {
    const flattenValues = this.unsortedTravelers.flatMap(
      (traveler) => traveler[property]
    );
    return [...new Set(flattenValues)];
  }

  filterByType(...types) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      if (Array.isArray(traveler.types)) {
        return types.every((type) => traveler.types.includes(type));
      }
      return types.every((type) => traveler.types === type);
    });
    return this;
  }
}

export const travelers = new FilterTravelers();
