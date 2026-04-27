import PlayerForm from './PlayerForm';

type Props = {
  onPlayerCreated: () => void;
};

export default function Sidebar({ onPlayerCreated }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar__panel">
        <h4 className="sidebar__panel-title">CONFIGURACIÓN</h4>
        <p className="sidebar__panel-text">Define el torneo y juego antes de registrar jugadores.</p>
      </div>
      <PlayerForm onPlayerCreated={onPlayerCreated} />
    </aside>
  );
}
