import { useContext } from "react";
import { TravelersContext } from "../store/travelers-context";

export default function Loader({ loading, error }) {
  const { loadingText } = useContext(TravelersContext);
  return (
    <>
      {loading && (
        <div className="flex gap-5 items-center justify-center">
          <div className="flex gap-2 flex-col">
            <p className="text-sm">{loadingText}...</p>
            <h2 className="self-end font-semibold italic">- Solon Probably</h2>
          </div>
          <div className="min-w-20 flex items-center justify-center">
            <img src="loading.webp" />
          </div>
        </div>
      )}
      {error && (
        <div className="flex gap-5 items-center justify-center">
          <div className="flex gap-2 flex-col">
            <p className="text-sm text-red-400">{loadingText}...</p>
            <h2 className="self-end font-semibold italic">- Solon Probably</h2>
          </div>
          <div className="min-w-20 flex items-center justify-center">
            <img src="loading.webp" />
          </div>
        </div>
      )}
      {!loading && !error && <p>No Travelers Found</p>}
    </>
  );
}
