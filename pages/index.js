import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/me");
        router.push("/dashboard");
      } catch (err) {
        router.push("/login"); 
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return <p>{loading ? "Checking authentication..." : "Redirecting..."}</p>;
}
