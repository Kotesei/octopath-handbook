import { useContext } from "react";
import { UIContext } from "../store/travelersUI-context";

export default function ThemeSelection() {
  const themes = [
    "default",
    "toasty",
    "orangecream",
    "bubblegum",
    "default",
    "toasty",
    "bubblegum",
    "orangecream",
  ];
  const { handleSwitchTheme } = useContext(UIContext);
  return (
    <div
      style={{
        backgroundColor: "var(--container_bg-color)",
        border: "solid 2px var(--border-color)",
      }}
      className="absolute bottom-[110%] right-1/2 translate-x-1/2 w-45 h-45 rounded-xl overflow-auto"
    >
      <div className="flex h-[100%] w-[100%] flex-wrap">
        {themes.map((theme, i) => {
          return (
            <div
              className="min-h-[50%] min-w-[50%] flex-wrap flex p-[3px]"
              key={i}
            >
              <div
                style={{ border: "solid 2px var(--border-color)" }}
                onClick={() => handleSwitchTheme(theme)}
                className="min-w-full min-h-full flex flex-wrap  rounded-xl overflow-hidden"
              >
                <div
                  style={{ backgroundColor: "var(--container_bg-color)" }}
                  className={`${theme}-theme h-[50%] w-[50%] rounded-tl-[10px]`}
                ></div>
                <div
                  style={{ backgroundColor: "var(--bg-color)" }}
                  className={`${theme}-theme h-[50%] w-[50%] rounded-tr-[10px]`}
                ></div>

                <div
                  style={{ backgroundColor: "var(--details_bg-color)" }}
                  className={`${theme}-theme h-[50%] w-[50%] rounded-bl-[10px]`}
                ></div>
                <div
                  style={{
                    backgroundColor: "var(--details_header_bg-color)",
                  }}
                  className={`${theme}-theme h-[50%] w-[50%] rounded-br-[10px]`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
