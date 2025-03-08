import { useEffect } from "react";
import { useRouter } from "next/router";
// import "../styles/globals.css"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return <p>Redirecting to dashboard...</p>;
}
