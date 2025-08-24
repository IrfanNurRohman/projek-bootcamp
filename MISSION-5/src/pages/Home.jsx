// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'

// export default function Home() {
//   const { user } = useAuth()
//   return (
//     <div className="container-std">
//       <div className="card">
//         <h1 className="text-2xl font-semibold">Selamat datang 👋</h1>
//         <p className="mt-2 text-slate-300">Starter React + Vite + Tailwind (Node 22) dengan routing & halaman Auth.</p>
//         {user ? (
//           <p className="mt-4">
//             Anda login sebagai <strong>{user.email}</strong>. Buka{" "}
//             <Link className="link" to="/dashboard">Dashboard</Link>.
//           </p>
//         ) : (
//           <p className="mt-4 flex items-center gap-3">
//             <Link className="btn btn-primary" to="/login">Mulai Login</Link>
//             <span className="text-slate-400">atau</span>
//             <Link className="btn" to="/register">Daftar</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }
