import { useContext } from "react";
import { DataContext } from "../store/travelersData-context";
import { UIContext } from "../store/travelersUI-context";
import { UserContext } from "../store/userData-context";

export default function Traveler({ traveler, index, inView, search }) {
  const { data } = useContext(DataContext);
  const { handleSelectTraveler } = useContext(UIContext);
  const { user } = useContext(UserContext);

  const isVisible = inView.has(`${search ? "result" : "traveler"}-${index}`);

  const types = Array.isArray(traveler.types)
    ? traveler.types
    : typeof traveler.types === "string"
    ? [traveler.types]
    : [];
  return (
    <div
      style={
        search
          ? index === 0
            ? { borderTop: "1px solid black", borderBottom: "1px solid black" }
            : { borderBottom: "1px solid black" }
          : { border: "2px solid black" }
      }
      className={
        search ? "w-full h-18 flex gap-2 relative" : "h-30 flex gap-2 relative"
      }
      onClick={() => handleSelectTraveler(traveler)}
      id={`${search ? "result" : "traveler"}-${index}`}
    >
      {isVisible ? (
        <>
          <div
            style={search ? {} : { borderRight: "2px solid" }}
            className={search ? "w-15 flex flex-col" : "w-22 flex flex-col"}
          >
            <div className=" absolute right-0 bottom-0 p-1.5 flex gap-0.5">
              {user?.favorites?.includes(traveler._id) && (
                <div className="bg-[#8100a8] w-5.5 h-5.5 rounded-full">
                  <img src="/heart.svg" className="invert-100" />
                </div>
              )}
              <div className="w-5.5 h-5.5 p-0.5 flex flex-col justify-center items-center pb-4">
                <p className="text-center text-xs">0</p>
                <img src="/view.svg" />
              </div>
            </div>
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
                    data.icons.genders[
                      data.icons.genders.findIndex((gender) =>
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
                          data.icons.types[
                            data.icons.types.findIndex((gender) =>
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
                  search
                    ? "flex gap-2 items-center"
                    : "flex flex-col justify-center"
                }
              >
                <p className="text-[11px] font-bold leading-2.5">
                  {traveler.name}
                </p>
              </div>
              <p className="text-[10px] leading-2.5">{traveler.rank}</p>
              <p className="text-[10px] font-bold leading-2.5">
                {traveler.influence}
              </p>
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
                        data.icons.types[
                          data.icons.types.findIndex((gender) =>
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
