import axios from "axios";

const projectionsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getProjections(season) {
  const res = await projectionsApi.get(`/projections/nfl/${season}`);
  return res.data;
};
