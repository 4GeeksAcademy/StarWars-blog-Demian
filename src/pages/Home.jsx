import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CategoryRow } from "../components/CategoryRow";

const categories = {
  Films: "https://www.swapi.tech/api/films/",
  People: "https://www.swapi.tech/api/people/",
  Planets: "https://www.swapi.tech/api/planets/",
  Species: "https://www.swapi.tech/api/species/",
  Starships: "https://www.swapi.tech/api/starships/",
  Vehicles: "https://www.swapi.tech/api/vehicles/",
};

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          Object.entries(categories).map(async ([key, url]) => {
            const res = await fetch(url);
            const data = await res.json();

            const rawItems = data.results || data.result || [];

            const normalized = rawItems.map(item => {
              const properties = item.properties || item; 
              const name = properties.name || properties.title || item.name || item.title || "Unnamed";
              const uid = item.uid || item.id || "unknown";

              return {
                uid: String(uid),
                name
              };
            });

            return { key, results: normalized };
          })
        );

        dispatch({
          type: "load_categories",
          payload: Object.fromEntries(
            results.map(r => [r.key.toLowerCase(), r.results])
          ),
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      {Object.keys(categories).map((category) => {
        const data = store[category.toLowerCase()] || [];

        return (
          <CategoryRow
            key={category}
            title={category}
            items={data}
          />
        );
      })}
    </div>
  );
};
