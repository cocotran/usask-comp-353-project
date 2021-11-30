import Head from 'next/head';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-screen px-80 flex justify-center items-center">

      <Link href="/client">
        <a className="py-20 px-20 rounded border border-gray-500 text-4xl">Client</a>
      </Link>
      <a href="https://ancient-cliffs-70972.herokuapp.com/staff" className="py-20 px-20 rounded border border-gray-500 text-4xl ml-20">Staff</a>
      <a href="https://ancient-cliffs-70972.herokuapp.com/admin/staff" className="py-20 px-20 rounded border border-gray-500 text-4xl ml-20">Admin</a>

    </div>
  )
}
