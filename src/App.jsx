import { useQuery } from "@tanstack/react-query";
import { getProjections } from "./api/projections";
import Dashboard from "./components/Dashboard";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
import { useDraftSettingsStore } from "./store/draftSettingsStore";

function App() {
  const season = "2023";
  const projectionsQuery = useQuery({
    queryKey: ["projections", season],
    queryFn: () => getProjections(season),
  });

  const theme = useDraftSettingsStore((state) => state.theme);

  useEffect(() => {
    const htmlClassList = document.querySelector("html").classList;
    if (theme === "dark") {
      htmlClassList.add("dark");
    } else {
      htmlClassList.remove("dark");
    }
  }, [theme]);

  if (projectionsQuery.status === "loading")
    return (
      <main className="h-screen flex justify-center items-center p-4 dark:bg-slate-800 dark:text-white">
        <AiOutlineLoading className="animate-spin w-16 h-16" />
      </main>
    );
  if (projectionsQuery.status === "error") {
    return (
      <main className="h-screen flex flex-col items-center p-4 gap-4 text-center dark:bg-slate-800 dark:text-white">
        <h1 className="font-bold text-2xl">Error</h1>
        <p>Oops, something went wrong. Please try again later.</p>
        <p className="break-all">{JSON.stringify(projectionsQuery.error)}</p>
      </main>
    );
  }

  return <Dashboard data={projectionsQuery.data} />;
}

export default App;
