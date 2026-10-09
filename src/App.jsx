import { Route, Routes } from 'react-router-dom';

import { Publica } from './components/Publica';
import { Layout } from './components/Layout';

import { Entrada } from './pages/Entrada';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { EsqueciSenha } from './pages/EsqueciSenha';

import { Inicio } from './pages/Inicio';
import { Agendar } from './pages/agendar/Agendar';
import { MinhasConsultas } from './pages/MinhasConsultas';
import { Consulta } from './pages/Consulta';
import { Avaliar } from './pages/Avaliar';
import { Perfil } from './pages/Perfil';
import { AlterarSenha } from './pages/AlterarSenha';

import { Dentistas } from './pages/Dentistas';
import { Dentista } from './pages/Dentista';

import { Agenda } from './pages/admin/Agenda';
import { AConfirmar } from './pages/admin/AConfirmar';
import { Negocio } from './pages/admin/Negocio';
import { DentistasAdmin } from './pages/admin/DentistasAdmin';
import { Servicos } from './pages/admin/Servicos';
import { Disponibilidades } from './pages/admin/Disponibilidades';
import { Avaliacoes } from './pages/admin/Avaliacoes';

import { NaoEncontrado } from './pages/NaoEncontrado';

function App() {
  return (
    <Routes>
      <Route element={<Publica />}>
        <Route index element={<Entrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Route>

      <Route element={<Layout />}>
        {/* Área do paciente */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/consultas" element={<MinhasConsultas />} />
        <Route path="/consultas/:id" element={<Consulta />} />
        <Route path="/consultas/:id/avaliar" element={<Avaliar />} />

        <Route path="/dentistas" element={<Dentistas />} />
        <Route path="/dentistas/:id" element={<Dentista />} />

        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/senha" element={<AlterarSenha />} />

        {/* Área administrativa */}
        <Route path="/admin/agenda" element={<Agenda />} />
        <Route path="/admin/confirmar" element={<AConfirmar />} />
        <Route path="/admin/negocio" element={<Negocio />} />
        <Route path="/admin/dentistas" element={<DentistasAdmin />} />
        <Route path="/admin/servicos" element={<Servicos />} />
        <Route
          path="/admin/disponibilidades"
          element={<Disponibilidades />}
        />
        <Route path="/admin/avaliacoes" element={<Avaliacoes />} />

        {/* Página não encontrada */}
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;