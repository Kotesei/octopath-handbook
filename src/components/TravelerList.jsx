import female from "../assets/female.svg";
import unknown from "../assets/unknown.svg";
import male from "../assets/male.svg";
export default function TravelerList({ travelers }) {
  return (
    <div className="grid w-full bg-amber-600 grid-cols-3 gap-2 overflow-auto p-5 rounded-2xl border border-white">
      {travelers.map((traveler, i) => {
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
              <p>{traveler.types}</p>
              <p>{traveler.influence}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
