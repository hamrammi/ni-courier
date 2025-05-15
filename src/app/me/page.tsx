import type { NextPage } from 'next'
import Link from 'next/link'

const MePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-6xl font-bold text-white">Hello, World!</h1>
      <p className="text-2xl text-white">This is a sample Next.js page using Tailwind CSS.</p>
      <Link href="/" className="mt-4 text-lg hover:underline">Go back to the home page</Link>
    </div>
  )
}

export default MePage
