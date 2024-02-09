import ReactDom from "react-dom";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function SettingsModal({ children }) {
  const isModalOpen = useDashboardSettingsStore((state) => state.isModalOpen);

  if (!isModalOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-20"></div>
      <div className="fixed top-1/2 left-1/2 bg-white z-30 translate-y-[-50%] translate-x-[-50%] sm:w-2/3 sm:h-2/3 w-full h-full sm:rounded-3xl">
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default SettingsModal;
