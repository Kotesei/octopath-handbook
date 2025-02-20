export class Traveler {
  constructor(getUnit) {
    // Split the data from rawData.txt
    const data = getUnit.split(";");
    // Regex for types
    const getType = /^\s*(Sword|Dagger|Light|Dark|Fire)\s*$/;
    // Gets the starting points for each category
    const battleSkillsIndex = data.findIndex((e) => e === "Battle Skills") + 1;
    const supportSkillsIndex =
      data.findIndex((e) => e === "Support Skills") + 1;
    const resilienceSkillsIndex =
      data.findIndex((e) => e === "Resilience Skills") + 1;
    const ultimateIndex = data.findIndex((e) => e === "Ultimate");
    const awakeningAccessoryIndex = data.findIndex(
      (e) => e === "Awakening Accessory"
    );
    // Gets the main information that doesn't change
    const [name, gender, job, rank, influence] = data;
    this.name = name;
    this.gender = gender;
    this.job = job;
    // Create min - max for ranks since some characters can rank up
    this.rank = rank;
    this.influence = influence;
    // Checks for types starting from index 5
    let typeIndex = 5;
    // Leave this as an array since some characters have multiple types.
    this.type = [];
    while (getType.test(data[typeIndex])) {
      this.type.push(data[typeIndex]);
      typeIndex++;
    }
    // Check if the VA is found by returning a value bigger than 1, if not then label it unknown
    this.va = data[typeIndex] ? data[typeIndex] : "Unknown VA";
    this.battleSkills = [];

    this.#parseSkills(
      data,
      battleSkillsIndex,
      supportSkillsIndex,
      3,
      this.battleSkills
    );
    this.supportSkills = [];
    this.#parseSkills(
      data,
      supportSkillsIndex,
      resilienceSkillsIndex,
      2,
      this.supportSkills
    );
    this.resilienceSkills = [];
    this.#parseSkills(
      data,
      resilienceSkillsIndex,
      ultimateIndex,
      2,
      this.resilienceSkills
    );

    this.ultimate =
      ultimateIndex !== -1
        ? {
            Skill: data[ultimateIndex + 1],
            Description: data[ultimateIndex + 2],
          }
        : undefined;

    this.awakeningAccessory =
      awakeningAccessoryIndex !== -1
        ? {
            Item: data[awakeningAccessoryIndex + 1],
            // Gets first value
            [data[awakeningAccessoryIndex + 2]]:
              data[awakeningAccessoryIndex + 3],
            // Gets second value
            [data[awakeningAccessoryIndex + 4]]:
              data[awakeningAccessoryIndex + 5],
            Description: data[awakeningAccessoryIndex + 6],
          }
        : undefined;
  }

  // Function for seperating skills uses the data
  #parseSkills(data, startingIndex, endingIndex, categoryCount, target) {
    if (startingIndex !== -1 && endingIndex !== -1) {
      for (let i = startingIndex + 1; i < endingIndex; i += categoryCount) {
        if (data[i] && data[i + 1]) {
          target.push({
            Skill: data[i - 1],
            SP: categoryCount === 3 ? data[i] : undefined,
            Description: categoryCount === 3 ? data[i + 1] : data[i],
          });
        }
      }
      // If the skill SP is undefied, erase it since it's most likely not a usable skill but instead a passive
      target.forEach((nonSPSkill) => {
        if (!nonSPSkill.SP) {
          delete nonSPSkill.SP;
        }
      });
    }
  }

  checkType() {
    console.log(`${this.name} is a ${this.type.join(" & ")} type.`);
  }
}
