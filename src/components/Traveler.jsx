import { useContext } from "react";
import { TravelersContext } from "../store/travelers-context";

export default function Traveler({ traveler, index, inView, search }) {
  const { icons, handleSelectTraveler } = useContext(TravelersContext);
  const isVisible = inView.has(
    search ? `result-${index + 1}` : `traveler-${index}`
  );

  const types = Array.isArray(traveler.types)
    ? traveler.types
    : typeof traveler.types === "string"
    ? [traveler.types]
    : [];
  return (
    <div
      className={
        search
          ? "w-full h-18 flex gap-2 relative border-b-1"
          : "h-30 flex gap-2 border-2 border-black relative"
      }
      onClick={() => handleSelectTraveler(traveler)}
      id={search ? `result-${index + 1}` : `traveler-${index}`}
    >
      {isVisible ? (
        <>
          <div
            className={
              search ? "w-15 flex flex-col" : "w-22 flex flex-col border-r-2"
            }
          >
            {!search && (
              <h2 className="text-nowrap text-sm text-center bg-indigo-400">
                {traveler.job}
              </h2>
            )}
            <div className="flex-1 bg-indigo-950 overflow-hidden flex items-center justify-center">
              <img src={traveler.avatar} className={search ? "h-13" : "h-20"} />

              <div
                className={
                  search
                    ? "absolute top-1 right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs z-1"
                    : "absolute bottom-[-5px] left-[-6px] w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs"
                }
              >
                <img
                  className={search ? "size-3" : "size-4"}
                  src={`${
                    icons.genders[
                      icons.genders.findIndex((gender) =>
                        gender.filename.includes(traveler.gender.toLowerCase())
                      )
                    ].url
                  }`}
                />
              </div>
            </div>
          </div>
          {search ? (
            <div className="flex flex-col justify-center gap-1">
              <div className="flex gap-1 h-3 items-center">
                <p
                  className={
                    "text-nowrap text-[10px] text-center px-2 rounded-xl bg-indigo-200"
                  }
                >
                  {traveler.job}
                </p>

                <div className="flex h-3">
                  {types.map((type, i) => {
                    return (
                      <img
                        key={i}
                        src={`${
                          icons.types[
                            icons.types.findIndex((gender) =>
                              gender.filename.includes(type)
                            )
                          ].url
                        }`}
                        alt={type}
                      />
                    );
                  })}
                </div>
              </div>
              <div
                className={
                  search ? "flex gap-2" : "flex flex-col justify-center"
                }
              >
                <p className="text-xs font-bold">{traveler.name}</p>
                <p className="text-xs">{traveler.rank}</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-xs font-bold">{traveler.influence}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <p className="leading-2">{traveler.name}</p>
              <p className="">{traveler.rank}</p>
              <div className="flex">
                {types.map((type, i) => {
                  return (
                    <img
                      key={i}
                      src={`${
                        icons.types[
                          icons.types.findIndex((gender) =>
                            gender.filename.includes(type)
                          )
                        ].url
                      }`}
                      alt={type}
                    />
                  );
                })}
              </div>
              <p>{traveler.influence}</p>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
