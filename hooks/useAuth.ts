/** @format */

/* import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    } else {
      router.push("/login"); // Redirige si l'utilisateur n'est pas authentifié
    }
  }, [router]);

  return { isAuthenticated };
};

export default useAuth;
 */