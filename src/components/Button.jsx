export default function Button({ active, children, ...props }) {
  return (
    <button
      className={`h-fit p-2 rounded ${active ? "bg-slate-500" : "bg-white"}`}
      {...props}
    >
      {children}
    </button>
  );
}
