import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex justify-center items-center bg-gray-100">
        {children}
      </main>
    </div>
  );
}
