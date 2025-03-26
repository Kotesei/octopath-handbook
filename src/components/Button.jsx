export default function Button({ children, ...props }) {
  return (
    <button className="bg-white px-5 py-2 rounded cursor-pointer" {...props}>
      {children}
    </button>
  );
}
