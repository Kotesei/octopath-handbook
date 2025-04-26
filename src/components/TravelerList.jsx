export default function TravelerList({
  travelers,
  openTravelerDetails,
  loading,
  loadingText,
}) {
  console.log(travelers);
  return (
    <>
      {!loading && (
        <input
          className="w-[70%] bg-white h-8 rounded px-2 text-center"
          placeholder="Search by Traveler Name"
        ></input>
      )}

      <div
        className={`${
          loading || travelers.length === 0
            ? "flex items-center justify-center"
            : "grid"
        } w-[90%] min-h-[20dvh] max-h-[65dvh] bg-indigo-500 grid-cols-1 gap-2 overflow-auto p-5 rounded border border-white`}
      >
        {loading && (
          <div className="flex gap-5 items-center justify-center">
            <div className="flex gap-2 flex-col">
              <p>{loadingText}...</p>
              <h2 className="self-end font-semibold italic">
                - Solon Probably
              </h2>
            </div>
            <div className="w-25 h-25 flex items-center justify-center">
              <img src="loading.webp" />
            </div>
          </div>
        )}
        {!loading && travelers.length === 0 && <p>No Travelers</p>}
        {travelers.map((traveler, i) => {
          const types = Array.isArray(traveler.types)
            ? traveler.types
            : typeof traveler.types === "string"
            ? [traveler.types]
            : [];
          let gender;
          if (traveler.gender[0] === "F") {
            gender = "female";
          } else if (traveler.gender[0] === "M") {
            gender = "male";
          } else {
            gender = "ambiguous";
          }

          return (
            <div
              className="h-30 flex gap-2 border-2 border-black relative"
              key={i}
              onClick={() => openTravelerDetails(traveler)}
            >
              <div className="w-22 h- flex flex-col border-r-2">
                <p className="text-nowrap text-sm text-center bg-indigo-400">
                  {traveler.job}
                </p>
                <div className="flex-1 bg-indigo-950 overflow-hidden flex items-center justify-center">
                  <img src={traveler.avatar} className="h-20" />

                  <div className="absolute bottom-[-5px] left-[-6px] w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                    <img
                      className="size-4"
                      src={`https://api.octopathhandbook.com/assets/genders/${gender}.svg`}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p>{traveler.name}</p>
                <p>{traveler.rank}</p>
                <div className="flex">
                  {types.map((type, i) => {
                    const typesImagePath = `https://cotc-travelers-backend.onrender.com/assets/types/Type_${type}.webp`;
                    return <img key={i} src={typesImagePath} alt={type} />;
                  })}
                </div>
                <p>{traveler.influence}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
