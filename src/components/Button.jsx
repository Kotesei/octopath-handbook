export default function Button({
  clearbg,
  disabled,
  children,
  sort,
  filter,
  ...props
}) {
  return (
    <button
      className={`${
        disabled
          ? "bg-slate-800 text-white opacity-50"
          : `${
              clearbg ? "bg-transparent text-white" : "bg-white"
            } opacity-100 cursor-pointer`
      } px-5 py-2 rounded `}
      {...props}
    >
      {children}
    </button>
  );
}
