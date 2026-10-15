
import { useState } from 'react'
import {
  Activity,
  CalendarDays,
  ClipboardCheck,
  LogOut,
  Menu as MenuIcon,
  Settings2,
  Stethoscope,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@heroui/react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export function Menu() {
  const { usuario, pode, inicio, sair } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  const administrador = pode('api.change_organizacao')

  const links = administrador
    ? [
        { to: '/admin/agenda', label: 'Agenda', icon: CalendarDays },
        { to: '/admin/confirmar', label: 'A confirmar', icon: ClipboardCheck },
        { to: '/admin/negocio', label: 'Clínica', icon: Settings2 },
        { to: '/admin/recursos', label: 'Dentistas', icon: Users },
        { to: '/admin/servicos', label: 'Serviços', icon: Stethoscope },
        { to: '/admin/avaliacoes', label: 'Avaliações', icon: Activity },
      ]
    : [
        { to: '/inicio', label: 'Início', icon: Activity },
        ...(pode('api.add_agendamento')
          ? [{ to: '/agendar', label: 'Agendar consulta', icon: CalendarDays }]
          : []),
        { to: '/aulas', label: 'Minhas consultas', icon: ClipboardCheck },
        { to: '/professores', label: 'Dentistas', icon: Stethoscope },
      ]

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="clinic-app-header">
      <div className="clinic-app-header-inner">
        <Link
          className="clinic-menu-brand"
          to={inicio}
          onClick={fecharMenu}
          aria-label="Sorriso — página inicial"
        >
          <img src="/logo.png" alt="Sorriso Clínica Odontológica" />
        </Link>

        <button
          type="button"
          className="clinic-mobile-menu"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={21} /> : <MenuIcon size={21} />}
        </button>

        <nav
          className={`clinic-nav ${menuAberto ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={fecharMenu}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="clinic-user-actions">
          <Link to="/perfil" className="clinic-profile-link" title="Meu perfil">
            <span className="clinic-avatar">
              {usuario?.nome?.trim()?.charAt(0)?.toUpperCase() || (
                <UserRound size={17} />
              )}
            </span>
            <span className="clinic-user-name">
              {usuario?.nome?.split(' ')[0]}
            </span>
          </Link>

          <Button
            className="clinic-logout-button"
            variant="tertiary"
            onPress={sair}
            aria-label="Sair da conta"
          >
            <LogOut size={17} />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
