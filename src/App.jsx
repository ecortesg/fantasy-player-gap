import { useQuery } from "@tanstack/react-query";
import { getProjections } from "./api/projections";
import Dashboard from "./components/Dashboard";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  const season = "2023";
  const projectionsQuery = useQuery({
    queryKey: ["projections", season],
    queryFn: () => getProjections(season),
  });

  if (projectionsQuery.status === "loading") return <LoadingSpinner />;
  if (projectionsQuery.status === "error") {
    return <p>{JSON.stringify(projectionsQuery.error)}</p>;
  }

  return (
    <>
      <Dashboard data={projectionsQuery.data} />
    </>
  );
}

export default App;
