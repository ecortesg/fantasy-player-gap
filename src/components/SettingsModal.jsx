import ReactDom from "react-dom";

function SettingsModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-20"></div>
      <div className="fixed top-1/2 left-1/2 bg-white p-6 z-30 translate-y-[-50%] translate-x-[-50%] sm:w-1/2 w-full">
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default SettingsModal;
