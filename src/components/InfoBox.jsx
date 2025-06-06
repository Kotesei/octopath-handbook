import { useState } from "react";
export function InfoBox({ children, data }) {
  const [dropdown, setDropdown] = useState(true);
  function handleDropdown() {
    setDropdown((prev) => !prev);
  }
  return (
    <div className="w-full flex overflow-auto">
      <div
        style={{ color: "var(--details_text-color)" }}
        className="flex flex-col text-center w-full"
      >
        <div onClick={handleDropdown} className="relative">
          <h2
            style={{
              backgroundColor: "var(--details_header_bg-color)",
              color: "var(--details_header_text-color)",
            }}
            className="font-bold italic text-lg p-1 "
          >
            {children}
          </h2>
          <img
            style={{
              filter: "var(--svg-arrow-color)",
            }}
            className={`absolute right-2 top-0 h-[100%] flex ${
              dropdown ? "rotate-270" : "rotate-0"
            }`}
            src="dropdown-arrow.svg"
          />
        </div>

        {dropdown && (
          <>
            <div className="overflow-auto custom-scrollbar">
              <div
                className={` md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 ${
                  data?.length ? "p-5 grid" : ""
                }`}
              >
                {data !== "Missing" ? (
                  data?.length ? (
                    data.map((skill, i) => {
                      let skillName;
                      if (skill["Skill Name"]) skillName = skill["Skill Name"];
                      if (skill["Skill"]) skillName = skill["Skill"];
                      if (skill["Name"]) skillName = skill["Name"];
                      return (
                        <div
                          key={i}
                          className="rounded-2xl overflow-hidden flex flex-col"
                        >
                          <p
                            style={{
                              color: "var(--details_text-color)",
                              backgroundColor: "var(--details_info_bg-color)",
                            }}
                            className="border-b-1 px-3 py-2 flex gap-2 items-center justify-between"
                          >
                            {skillName}
                            {skill.SP ? (
                              <span
                                style={{
                                  backgroundColor:
                                    "var(--details_icon_bg-color)",
                                  color: "var(--details_alt-text-color)",
                                }}
                                className="text-xs px-2 rounded-xl"
                              >
                                SP Cost: {skill.SP}
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <p className="text-xs flex items-center justify-center italic p-2.5 flex-1 bg-[#0000004b]">
                            {skill.Description}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center flex-col gap-2 justify-center">
                      {data && data["Skill"] ? (
                        <h2 className="border-2 rounded-b border-t-0 w-fit px-4">
                          {data["Skill"]}
                        </h2>
                      ) : (
                        ""
                      )}
                      <div className="p-3">
                        <p>{data?.Description}</p>
                        {data?.Conditions ? (
                          <>
                            <p>Condition: {data.Conditions}</p>
                            <p>Uses: {data.Uses}</p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
