import female from "../assets/genders/female.svg";
import unknown from "../assets/genders/unknown.svg";
import male from "../assets/genders/male.svg";
const typeImages = import.meta.glob("/src/assets/types/Type_*.webp", {
  eager: true,
});

export default function TravelerList({ travelers, isLoading }) {
  return (
    <div className="grid w-[90%] max-h-[80%] bg-amber-600 grid-cols-3 gap-2 overflow-auto p-5 rounded border border-white">
      {isLoading && <p>Fetching Data...</p>}
      {travelers.map((traveler, i) => {
        const types = Array.isArray(traveler.types)
          ? traveler.types
          : typeof traveler.types === "string"
          ? [traveler.types]
          : [];
        let gender;
        if (traveler.gender[0] === "F") {
          gender = female;
        } else if (traveler.gender[0] === "M") {
          gender = male;
        } else {
          gender = unknown;
        }
        return (
          <div className="h-30 flex gap-2 border-2" key={i}>
            <div className="flex flex-col border-r-2">
              <p className="w-22 text-nowrap text-sm text-center">
                {traveler.job}
              </p>
              <div className="flex-1 bg-amber-950 relative">
                <div className="absolute bottom-[-4px] left-[-6px] w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                  <img className="size-4" src={gender}></img>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p>{traveler.name}</p>
              <p>{traveler.rank}</p>
              <div className="flex">
                {types.map((type, i) => {
                  const fileKey = `/src/assets/types/Type_${type}.webp`;
                  const imgSrc = typeImages[fileKey]?.default;
                  return <img key={i} src={imgSrc} alt={type} />;
                })}
              </div>
              <p>{traveler.influence}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
