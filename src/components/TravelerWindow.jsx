import { useContext } from "react";
import { DataContext } from "../store/travelersData-context";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { UIContext } from "../store/travelersUI-context";
import { InfoBox } from "./InfoBox";
import { UserContext } from "../store/userData-context";

export default function TravelerWindow() {
  const { data } = useContext(DataContext);
  const { theme } = useContext(UIContext);
  const { user } = useContext(UserContext);
  const { travelerName } = useParams();

  // console.log(data.selectedTraveler);

  let description;
  if (
    data?.selectedTraveler?.awakeningaccessory !== "Missing" &&
    data.selectedTraveler
  ) {
    const desc = data.selectedTraveler.awakeningaccessory["Description"];
    description = desc.split(/\. (?=[A-Z])/);
  }

  if (data.loading) {
    return (
      <div
        style={{ backgroundColor: "var(--details_loading-bg-color)" }}
        className={`${theme} flex flex-col gap-5 italic font-semibold flex-1 items-center justify-center text-center p-5`}
      >
        <img src="/loading.webp" />
        <h1 style={{ color: "var(--text-color)" }} className="text-3xl">
          Loading Traveler...
        </h1>
        <Spinner />
      </div>
    );
  }

  if (data.error) {
    return (
      <div
        style={{ backgroundColor: "var(--details_loading-bg-color)" }}
        className={`${theme} flex flex-col gap-5 italic font-semibold flex-1 items-center justify-center p-5 text-center`}
      >
        <img src="/loading.webp" />
        <h1 style={{ color: "var(--error_text-color)" }} className="text-3xl">
          Unable to load traveler data for "{travelerName}"..
        </h1>
        <p style={{ color: "var(--text-color)" }}>Does this traveler exist?</p>
      </div>
    );
  }

  if (data.selectedTraveler) {
    return (
      <div
        style={{ backgroundColor: "var(--details_bg-color" }}
        className={`${theme} h-full w-full overflow-hidden`}
      >
        <div className="flex h-full flex-col items-center w-full relative">
          <div
            style={{
              backgroundColor: "var(--details_header_bg-color)",
              borderColor: "var(--details_border-color)",
            }}
            className="w-full p-2.5 border-b flex justify-center"
          >
            <div className="flex flex-col items-center relative justify-center">
              <h2
                style={{ color: "var(--details_header_text-color)" }}
                className="font-bold relative leading-4"
              >
                {data.selectedTraveler.name}
              </h2>
              <p
                style={{ color: "var(--details_header_text-color)" }}
                className="leading-3 text-xs"
              >
                {data.selectedTraveler.rank}
              </p>

              {data.selectedTraveler && (
                <div className="absolute flex gap-0.5 left-[105%] w-10 md:w-25 lg:w-50 flex-wrap">
                  {data.selectedTraveler.types.map((type, i) => {
                    return (
                      <img
                        className="w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:w-5"
                        key={i}
                        src={
                          data.icons?.types
                            ? data.icons.types.find(
                                (url) => url.filename === `Type_${type}.webp`
                              ).url
                            : data.selectedTraveler.typesUrls.find(
                                (url) => url.type === type
                              ).url
                        }
                        alt={type}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-black absolute top-5 bg-white left-[-35px] z-2 rotate-315 text-[10px] border w-30 text-center">
              {data.selectedTraveler.job}
            </p>
          </div>
          <div className="flex w-full h-25">
            <div className="overflow-hidden flex flex-col flex-1 items-end">
              {/* #REFACTOR */}
              <div className="flex flex-col h-full w-full items-end">
                <div
                  style={{
                    backgroundColor: "var(--details_accessory_bg-color)",
                    borderColor: "var(--details_border-color)",
                  }}
                  className="flex gap-1 border-l-1  max-[430px]:border-l-0 max-[430px]:w-full max-[430px]:rounded-none w-fit justify-end relative border-b-1 py-1 rounded-bl p-1 max-h-[40px]"
                >
                  <div className="overflow-auto custom-scrollbar">
                    <div className="flex flex-wrap justify-end gap-x-0.5 gap-y-0.5 h-full items-center">
                      {data.selectedTraveler.awakeningaccessory !== "Missing" &&
                        data.selectedTraveler.awakeningaccessory["Stats"].map(
                          (stat, i) => {
                            const [key, value] = Object.entries(stat)[0];

                            return (
                              <div
                                key={i}
                                style={{
                                  backgroundColor:
                                    "var(--details_icon_bg-color)",
                                }}
                                className="flex rounded px-0.5 py-[1px] gap-[1px]"
                              >
                                <img
                                  src={`/stats/${key}.webp`}
                                  className="h-3 rounded-full"
                                />
                                <p
                                  style={{
                                    color: "var(--details_alt-text-color)",
                                  }}
                                  className="leading-3 text-[8px]"
                                >
                                  {value}
                                </p>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                  <div
                    style={{ backgroundColor: "var(--details_icon_bg-color)" }}
                    className="px-1 rounded h-fit self-center"
                  >
                    <div className="flex gap-1 items-center">
                      <img src="/accessory.webp" className="h-3.5 rounded" />
                      <h2
                        style={{ color: "var(--details_alt-text-color)" }}
                        className="font-semibold text-xs italic text-center"
                      >
                        {data.selectedTraveler.awakeningaccessory["Item"]
                          ? data.selectedTraveler.awakeningaccessory["Item"]
                          : "Missing Data"}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="overflow-auto custom-scrollbar w-full p-1.5 mt-auto mb-auto">
                  {description ? (
                    description?.map((sentence, i) => (
                      <p
                        style={{ color: "var(--details_text-color)" }}
                        className="leading-3.5 text-center text-sm"
                        key={i}
                      >
                        {sentence}
                      </p>
                    ))
                  ) : (
                    <p
                      style={{ color: "var(--details_text-color)" }}
                      className="leading-3.5 text-center text-sm"
                    >
                      Missing Data
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                borderLeft: "1px solid var(--details_border-color)",
                borderBottom: "1px solid var(--details_border-color)",
              }}
              className="h-full flex"
            >
              <div className="flex bg-[#00000062] flex-1 justify-center items-center h-25 w-25 relative">
                {user.favorites?.includes(data.selectedTraveler._id) && (
                  <img
                    src="/heart.svg"
                    className="invert-100 absolute h-6 right-0 top-0 m-0.5"
                  />
                )}
                <img className="max-h-20" src={data.selectedTraveler.avatar} />
              </div>
            </div>
          </div>

          <div className="w-full overflow-auto custom-scrollbar">
            <InfoBox data={data.selectedTraveler.battleskills}>
              Battle Skills
            </InfoBox>
            <InfoBox data={data.selectedTraveler.resilienceskills}>
              Resilience Skills
            </InfoBox>
            <InfoBox data={data.selectedTraveler.supportskills}>
              Passive Skills
            </InfoBox>
            <div
              className={`${
                data.selectedTraveler.exskill ? "grid" : ""
              } md:grid-cols-2 gap-x-1.5`}
            >
              <InfoBox data={data.selectedTraveler.ultimate}>
                Ultimate Skill
              </InfoBox>
              {data.selectedTraveler.exskill && (
                <InfoBox data={data.selectedTraveler.exskill}>
                  EX. Skill
                </InfoBox>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
