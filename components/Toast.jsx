// Small message at the bottom of the screen. Show it with <Toast show={true}>.
export default function Toast({ show, children }) {
  return (
    <div role="status" className={`toast ${show ? "on" : ""}`}>
      {children}
    </div>
  );
}