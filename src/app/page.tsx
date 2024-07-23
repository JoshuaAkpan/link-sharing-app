import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Devlinks</h1>
        <p className="mb-8">Share your developer profile with the world!</p>
        <div className="space-x-4">
          <Link href="/auth/login">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Login</span>
          </Link>
          <Link href="/auth/signup">
            <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md hover:bg-purple-100">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}