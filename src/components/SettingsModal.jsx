import ReactDom from "react-dom";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function SettingsModal({ children }) {
  const isModalOpen = useDashboardSettingsStore((state) => state.isModalOpen);

  if (!isModalOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black dark:bg-white opacity-40 z-20"></div>
      <div className="fixed top-1/2 left-1/2 bg-white dark:bg-slate-700 dark:text-white z-30 translate-y-[-50%] translate-x-[-50%] w-full md:w-3/4 xl:w-1/2 h-full md:h-3/4 md:rounded-3xl">
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default SettingsModal;
