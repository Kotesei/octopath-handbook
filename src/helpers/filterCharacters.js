export default class FilterTravelers {
  constructor(travelersData) {
    this.unsortedTravelers = travelersData;
    this.filteredTravelers = [...travelersData];
    this.ranks = this.getUniqueValues("rank").sort(
      (a, b) => a.length - b.length
    );
    this.types = this.getUniqueValues("types");
    this.influences = this.getUniqueValues("influence");
    this.jobs = this.getUniqueValues("job");
    this.genders = this.getUniqueValues("gender");
  }
  getUniqueValues(property) {
    let flattenValues;
    if (property === "rank") {
      flattenValues = this.unsortedTravelers.flatMap((traveler) => {
        return traveler[property].split("/").flatMap((rank) => rank);
      });
    } else {
      flattenValues = this.unsortedTravelers.flatMap(
        (traveler) => traveler[property]
      );
    }
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

  filterByJob(job) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      return traveler.job === job;
    });
    return this;
  }
  filterByInfluence(influence) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      return traveler.influence === influence;
    });
    return this;
  }
  filterByStartingRank(rank) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      return traveler.rank.split("/")[0] === rank;
    });
    return this;
  }
  filterByHighestRank(rank) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      return traveler.rank.split("/")[1] === rank;
    });
    return this;
  }

  filterByGenders(gender) {
    this.filteredTravelers = this.filteredTravelers.filter((traveler) => {
      return traveler.gender === gender;
    });
    return this;
  }

  resetFilters() {
    this.filteredTravelers = [...this.unsortedTravelers];
  }
}
