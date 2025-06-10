export default function Loader({ loading, error, text }) {
  return (
    <>
      {loading && (
        <div className="flex gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="min-h-[64px] text-xs">{text}...</p>
            <h2 className="flex-1 self-end text-sm font-semibold italic">
              - Solon Probably
            </h2>
          </div>
          <div className="min-w-15 flex items-center justify-center">
            <img src="loading.webp" />
          </div>
        </div>
      )}
      {error && (
        <div className="flex gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p
              style={{ color: "var(--error_text-color)" }}
              className="min-h-[64px] text-[12px]"
            >
              {text}...
            </p>
            <h2
              style={{ color: "var(--error_text-color)" }}
              className="mt-auto self-end text-sm font-semibold italic"
            >
              - Solon Probably
            </h2>
          </div>
          <div className="min-w-15 flex items-center justify-center">
            <img src="loading.webp" />
          </div>
        </div>
      )}
    </>
  );
}
