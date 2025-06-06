export default function Button({
  clearbg,
  disabled,
  children,
  sort,
  openSortDropdown,
  filter,
  ...props
}) {
  return (
    <>
      {sort && (
        <div
          id="sortContainer"
          style={{
            outlineColor: "var(--border-color--2)",
            backgroundColor: `${
              disabled
                ? "var(--button_disabled-bg-color)"
                : `${clearbg ? "transparent" : "var(--button_bg-color)"}`
            }`,
            opacity: `${disabled ? "10%" : "100%"}`,
          }}
          className={`${
            disabled ? "" : `outline-1`
          } px-5 py-2 rounded relative cursor-pointer`}
          {...props}
        >
          <button
            style={{
              color: `${
                disabled
                  ? "var(--button_disabled-text-color)"
                  : "var(--button_alt-text-color)"
              }`,
            }}
            className="pointer-events-none"
          >
            {children}
          </button>
          {openSortDropdown && (
            <div
              style={{ left: "50%", transform: "translateX(-50%)" }}
              className="absolute h-25 z-5 w-55 rounded top-[120%] cursor-default"
            >
              <div
                style={{
                  transform: "translateX(-50%) rotate(45deg)",
                  left: "50%",
                  backgroundColor: "var(--avatar_bg-color)",
                  borderColor: "var(--border-color)",
                }}
                className="absolute w-7 h-7 bottom-[85%] z-1 border-2"
              ></div>
              <div
                style={{ right: "50%", transform: "translateX(50%)" }}
                className="absolute h-[13px] bottom-[90%] w-[35px] z-3 overflow-hidden"
              >
                <div
                  style={{
                    right: "50%",
                    transform: "translateX(50%) rotate(45deg",
                    backgroundColor: "var(--avatar_bg-color)",
                  }}
                  className="w-7 h-7 absolute top-[-56%] z-3"
                ></div>
              </div>
              <div
                style={{
                  backgroundColor: "var(--avatar_bg-color)",
                  borderColor: "var(--border-color)",
                }}
                className="rounded-xl relative border-2 p-4 z-2"
              >
                <div className="flex flex-col gap-1">
                  <button
                    style={{
                      backgroundColor: "var(--label_bg-color)",
                      color: "var(--label_text-color)",
                    }}
                    id="sort-toggle"
                    className="rounded"
                  >
                    Sort by Name ↑↓
                  </button>
                  <button
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--alt-text-color)",
                    }}
                    id="sort-toggle"
                    className="rounded"
                  >
                    Sort by Most Viewed
                  </button>
                  <button
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--alt-text-color)",
                    }}
                    id="sort-toggle"
                    className="rounded"
                  >
                    Sort by Most Types
                  </button>
                  <button
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--alt-text-color)",
                    }}
                    id="sort-toggle"
                    className="rounded"
                  >
                    Sort by Ranks
                  </button>
                  <button
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--alt-text-color)",
                    }}
                    id="sort-toggle"
                    className="rounded"
                  >
                    Randomize
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!sort && (
        <button
          style={{
            backgroundColor: `${
              disabled
                ? "var(--button_disabled-bg-color)"
                : `${clearbg ? "transparent" : "var(--button_bg-color)"}`
            }`,
            opacity: `${disabled ? "10%" : "100%"}`,
            color: `${
              disabled
                ? "var(--button_disabled-text-color)"
                : "var(--button_text-color)"
            }`,
          }}
          className={`px-5 py-2 rounded relative`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
