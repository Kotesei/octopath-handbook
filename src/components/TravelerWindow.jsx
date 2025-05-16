import { useContext } from "react";
import { DataContext } from "../store/travelersData-context";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

export default function TravelerWindow() {
  const { data } = useContext(DataContext);
  const { travelerName } = useParams();

  if (data.loading) {
    return (
      <div className="flex flex-col gap-5 italic font-semibold flex-1 items-center justify-center text-center p-5">
        <img src="/loading.webp" />
        <h1 className="text-indigo-200 text-3xl">Loading Traveler...</h1>
        <Spinner />
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex flex-col gap-5 italic font-semibold flex-1 items-center justify-center p-5 text-center">
        <img src="/loading.webp" />
        <h1 className="text-red-400 text-3xl">
          Unable to load traveler data for "{travelerName}"..
        </h1>
        <p className="text-indigo-100">Does this traveler exist?</p>
      </div>
    );
  }

  if (data.selectedTraveler) {
    return (
      <div className="h-full w-full overflow-hidden bg-violet-900">
        <div className="flex h-full flex-col items-center w-full relative">
          <div className="w-full p-2 border-white border-b flex bg-violet-500">
            <h2 className="text-white text-center text-xl p-1 flex-1 font-bold">
              {data.selectedTraveler.name}
            </h2>
            <p className="text-black absolute top-5 bg-white left-[-35px] rotate-315 text-[10px] border w-30 text-center">
              {data.selectedTraveler.job}
            </p>
            {/* <div className="flex flex-col">
            <p>{data.selectedTraveler.gender}</p>
            <p>{data.selectedTraveler.va}</p>
          </div>

          <div className="flex flex-col">
            <p>{data.selectedTraveler.influence}</p>
            <p>{data.selectedTraveler.job}</p>
            <p>{data.selectedTraveler.rank}</p>
          </div> */}
          </div>
          <div className="flex w-full h-30">
            <div className="text-white overflow-hidden flex flex-col flex-1">
              <p className="bg-[#000000a4] border-b-1 px-3 py-2 flex items-center justify-between w-full text-sm">
                {data.selectedTraveler.ultimate !== "Missing"
                  ? data.selectedTraveler.ultimate["Skill"]
                  : "Missing"}

                <span className="text-[10px] bg-violet-200 text-black px-2 rounded-xl">
                  Ultimate
                </span>
              </p>
              <div className="flex-1 text-xs text-center overflow-hidden italic bg-[#0000004b] border-b-1 flex items-center">
                <p
                  className={`overflow-auto ${
                    data.selectedTraveler.ultimate.Description?.length > 220
                      ? "text-[9px]"
                      : ""
                  }  max-h-full p-2`}
                >
                  {data.selectedTraveler.ultimate.Description}
                </p>
              </div>
            </div>
            <div className="h-full border-l-1 border-b-1 border-white bg-indigo-950">
              <div className="flex flex-1 justify-center items-center  w-29">
                <img className="h-29 p-3 " src={data.selectedTraveler.avatar} />
              </div>
            </div>
          </div>

          <div className="overflow-auto">
            <div className="text-white w-full items-center text-center flex flex-col">
              <h2 className="font-bold italic text-lg p-1 w-full bg-violet-500">
                Battle Skills
              </h2>

              <div className="flex flex-col gap-2 py-5 w-[90%]">
                {data.selectedTraveler.battleskills !== "Missing"
                  ? data.selectedTraveler.battleskills.map((skill, i) => {
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden">
                          <p className="bg-[#000000a4] border-b-1 px-3 py-2 flex items-center justify-between">
                            {skill["Skill Name"]}
                            <span className="text-xs bg-violet-200 text-black px-2 rounded-xl">
                              SP Cost: {skill.SP}
                            </span>
                          </p>
                          <p className="text-xs italic p-2 bg-[#0000004b]">
                            {skill.Description}
                          </p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="text-white w-full items-center text-center flex flex-col">
              <h2 className="font-bold italic text-lg p-1 w-full bg-violet-500">
                Support Skills
              </h2>
              <div className="flex flex-col gap-2 py-5 w-[90%]">
                {data.selectedTraveler.supportskills !== "Missing"
                  ? data.selectedTraveler.supportskills.map((skill, i) => {
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden">
                          <p className="bg-[#000000a4] border-b-1 px-3 py-2 flex items-center justify-between">
                            {skill["Name"]}
                          </p>
                          <p className="text-xs italic p-2 bg-[#0000004b]">
                            {skill.Description}
                          </p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="text-white w-full items-center text-center flex flex-col">
              <h2 className="font-bold italic text-lg p-1 w-full bg-violet-500">
                Resilience Skills
              </h2>
              <div className="flex flex-col gap-2 py-5 w-[90%]">
                {data.selectedTraveler.resilienceskills !== "Missing"
                  ? data.selectedTraveler.resilienceskills.map((skill, i) => {
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden">
                          <p className="bg-[#000000a4] border-b-1 px-3 py-2 flex items-center justify-between">
                            {skill["Skill"]}
                          </p>
                          <p className="text-xs italic p-2 bg-[#0000004b]">
                            {skill.Description}
                          </p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
