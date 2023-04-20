import { useQuery } from "@tanstack/react-query";
import { getProjections } from "./api/projections";
import Dashboard from "./components/Dashboard";

function App() {
  const season = "2022";
  const projectionsQuery = useQuery({
    queryKey: ["projections", season],
    queryFn: () => getProjections(season),
  });

  if (projectionsQuery.status === "loading") return <h1>Loading...</h1>;
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
