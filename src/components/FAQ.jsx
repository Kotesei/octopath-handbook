import { useState } from "react";
export function FAQ() {
  const [dropDown, setDropDown] = useState();
  function handleDropDown() {
    setDropDown((prev) => !prev);
  }
  return (
    <div>
      <div className="flex justify-between" onClick={handleDropDown}>
        <h2 className="text-white text-2xl font-bold">
          This is a test question
        </h2>
        <img
          src="dropdown-arrow.svg"
          className={`w-5 ${dropDown ? "-rotate-90" : ""} invert`}
        />
      </div>
      {dropDown && (
        <p className="text-white font-light italic text-sm">
          This is a test answer
        </p>
      )}
    </div>
  );
}
