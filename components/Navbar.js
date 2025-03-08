import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        <div>
          <Link href="/auth/login" className="text-white mr-4">Login</Link>
          <Link href="/auth/register" className="text-white">Register</Link>
        </div>
      </div>
    </nav>
  );
}
