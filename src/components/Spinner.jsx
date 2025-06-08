import "../Spinner.css";

export default function Spinner({ ...props }) {
  return (
    <div className={`lds-roller`} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
