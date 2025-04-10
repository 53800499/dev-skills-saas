// hooks/useProtectedData.ts
import { useState, useEffect } from "react";

export default function useProtectedData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/protected-route", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Échec de la récupération des données.");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  return { data, error };
}
