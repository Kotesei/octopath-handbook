import { Traveler } from "./importCharacter.js";
const travelerData = [];

async function getCharacterData() {
  const res = await fetch("./Character Data/rawData.txt");
  const data = await res.text();
  const info = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  info.forEach((unit) => {
    unit.split("");
    if (unit.includes("=")) return;
    travelerData.push(new Traveler(unit));
  });
}

await getCharacterData();

export default travelerData;
