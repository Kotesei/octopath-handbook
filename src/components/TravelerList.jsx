export default function TravelerList({ travelers, filtered }) {
  return (
    <div className=" h-100 flex flex-col bg-amber-600 w-fit p-5 rounded-2xl border border-white">
      <h1 className="text-center mb-5">
        {filtered ? "Filtered List of Travelers" : "List of Travelers!"}
      </h1>
      <ul className="overflow-auto border p-5">
        {travelers.map((traveler, i) => {
          return <li key={i}>{traveler.name}</li>;
        })}
      </ul>
    </div>
  );
}
