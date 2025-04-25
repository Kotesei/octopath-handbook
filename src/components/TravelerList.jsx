export default function TravelerList({
  travelers,
  openTravelerDetails,
  loading,
}) {
  return (
    <div className="grid w-[90%] max-h-[80%] bg-indigo-500 grid-cols-3 gap-2 overflow-auto p-5 rounded border border-white">
      {loading && <p>Fetching Data...</p>}
      {travelers.map((traveler, i) => {
        const avatarImagePath = `https://cotc-travelers-backend.onrender.com/assets/avatars/${
          traveler.job
        }/${traveler.name.replace(/\s+/g, "_").replace(/'/g, "_")}_Sprite.webp`;
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
            className="h-30 flex gap-2 border-2 relative"
            key={i}
            onClick={() => openTravelerDetails(traveler)}
          >
            <div className="w-22 h- flex flex-col border-r-2">
              <p className="text-nowrap text-sm text-center bg-indigo-400">
                {traveler.job}
              </p>
              <div className="flex-1 bg-indigo-950 overflow-hidden flex items-center justify-center">
                <img src={avatarImagePath} className="h-20" />

                <div className="absolute bottom-[-5px] left-[-6px] w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                  <img
                    className="size-4"
                    src={`https://cotc-travelers-backend.onrender.com/assets/genders/${gender}.svg`}
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
  );
}
