import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Carregando } from './Carregando'
import { Menu } from './Menu'

export function Layout() {
  const { usuario, carregando } = useAuth()

  if (carregando) return <Carregando />
  if (!usuario) return <Navigate to="/" replace />

  return (
    <div className="clinic-app-shell">
      <Menu />
      <main className="clinic-app-main"><Outlet /></main>
      <footer className="clinic-app-footer">Sorriso Clínica Odontológica <span>•</span> Cuidado que acolhe.</footer>
    </div>
  )
}
