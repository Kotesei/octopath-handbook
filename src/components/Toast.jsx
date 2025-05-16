export default function Toast({ detail }) {
  const { details, type } = detail;

  if (["Logout", "Login"].includes(type)) {
    return (
      <div className="absolute z-99 h-full w-full flex items-center justify-center">
        <div className="w-80 h-40 flex border-2 border-white rounded relative">
          <div className="w-full h-full flex flex-col items-center justify-center z-1 p-3">
            <h2 className="text-white text-center text-2xl font-bold">
              You have logged {type === "Login" ? "in" : "out"}!
            </h2>
            <p className="text-white text-center text-xs">
              Thanks for using the handbook! <br />
              Have a good day :)
            </p>
          </div>
          <div className="w-full h-full absolute bg-indigo-950 opacity-85"></div>
        </div>
      </div>
    );
  }

  if (type === "Favorite") {
    return (
      <div className="absolute z-99 bottom-0 right-0 p-2">
        <div className="bg-indigo-300 w-full h-full rounded p-3 border-2 border-white">
          <h2 className="text-center text-xl font-bold">Updated Favorites</h2>
          <p className="text-center text-sm font-semibold">{details.name}</p>
          <p className="text-center text-xs italic">{details.message}</p>
        </div>
      </div>
    );
  }
}
