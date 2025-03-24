export default function Button({ children, ...props }) {
  return (
    <button className="bg-white h-fit p-2 rounded" {...props}>
      {children}
    </button>
  );
}
