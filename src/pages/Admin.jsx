import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllAnnonces, selectUsers } from '../store/selectors.js'
import { updateEtat, deleteAnnoncesByUser, deleteAnnonce } from '../store/annoncesSlice.js'
import { deleteUser } from '../store/usersSlice.js'
import {
  FaChartBar, FaFileAlt, FaUsers, FaFlag, FaChartLine, FaCog, FaBell,
  FaArrowLeft, FaSearch, FaFilter, FaEye, FaTrash, FaCheck, FaTimes
} from 'react-icons/fa'
import { CATEGORIES } from '../data/constants.js'
import DarkVeil from '../components/DarkVeil'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const GlassCard = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '1.5rem',
    boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
    ...style
  }}>
    {children}
  </div>
);

// Data for charts
const lineData = [
  { name: 'Lun', annonces: 45, utilisateurs: 12 },
  { name: 'Mar', annonces: 52, utilisateurs: 15 },
  { name: 'Mer', annonces: 48, utilisateurs: 18 },
  { name: 'Jeu', annonces: 61, utilisateurs: 14 },
  { name: 'Ven', annonces: 55, utilisateurs: 20 },
  { name: 'Sam', annonces: 67, utilisateurs: 22 },
  { name: 'Dim', annonces: 58, utilisateurs: 16 }
];

const barData = [
  { name: 'Immobilier', value: 85, color: '#470BBF' },
  { name: 'Auto', value: 65, color: '#7B2CBF' },
  { name: 'Emploi', value: 45, color: '#9D4EDD' },
  { name: 'Loisirs', value: 95, color: '#C77DFF' },
  { name: 'Divers', value: 35, color: '#E0AAFF' }
];

const pieData = [
  { name: 'Immobilier', value: 28, color: '#470BBF' },
  { name: 'Auto', value: 22, color: '#7B2CBF' },
  { name: 'Emploi', value: 15, color: '#9D4EDD' },
  { name: 'Loisirs', value: 24, color: '#C77DFF' },
  { name: 'Divers', value: 11, color: '#E0AAFF' }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '0.75rem',
        color: '#fff'
      }}>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const annonces = useSelector(selectAllAnnonces)
  const users = useSelector(selectUsers) || []
  const [activeSection, setActiveSection] = useState('dashboard')

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.user === 'admin' && loginData.pass === '123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <DarkVeil />
        </div>
        <GlassCard style={{ width: '400px', zIndex: 1, padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Administration</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Utilisateur</label>
              <input
                type="text"
                value={loginData.user}
                onChange={e => setLoginData({ ...loginData, user: e.target.value })}
                placeholder="Ex: admin"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Mot de passe</label>
              <input
                type="password"
                value={loginData.pass}
                onChange={e => setLoginData({ ...loginData, pass: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>
            {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(71, 11, 191, 0.3)',
                marginTop: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              Retour à l'accueil
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  const pending = annonces.filter(a => a.etat === 'en_attente')
  const totalUsers = users?.length || 0

  const onModerate = (id, etat) => {
    dispatch(updateEtat({ id, etat }))
  }

  const onDeleteUser = (u) => {
    if (!window.confirm(`Supprimer l'utilisateur ${u.prenom} ${u.nom} et toutes ses annonces ?`)) return
    dispatch(deleteUser(u.id))
    dispatch(deleteAnnoncesByUser(u.id))
  }

  const onDeleteAnnonce = (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return
    dispatch(deleteAnnonce(id))
  }

  const getCategoryLabel = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId)
    return cat?.label || catId
  }

  const getUserAnnoncesCount = (userId) => {
    return annonces.filter(a => a.userId === userId).length
  }

  const getPlaceholderImage = (catId) => {
    if (catId === 'cat-immo') {
      return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop'
    } else if (catId === 'cat-auto') {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0f2e?w=100&h=100&fit=crop'
    } else {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <DarkVeil />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'rgba(255,255,255,0.6)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '3rem',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <FaArrowLeft /> Retour à l'accueil
          </button>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Dashboard</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Espace Administrateur</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
            {[
              { id: 'dashboard', icon: <FaChartBar />, label: 'Tableau de bord' },
              { id: 'annonces', icon: <FaFileAlt />, label: 'Annonces' },
              { id: 'utilisateurs', icon: <FaUsers />, label: 'Utilisateurs' },
              { id: 'signalements', icon: <FaFlag />, label: 'Signalements' },
              { id: 'analytiques', icon: <FaChartLine />, label: 'Analytiques' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  border: 'none',
                  borderRadius: '16px',
                  background: activeSection === item.id ? 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)' : 'transparent',
                  color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: activeSection === item.id ? '0 8px 24px rgba(71, 11, 191, 0.3)' : 'none'
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><FaCog /> Paramètres</button>
            <button
              onClick={() => setIsAuthenticated(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 600 }}
            >
              <FaTimes /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth' }}>
          {activeSection === 'dashboard' && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>Aperçu Global</h1>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <GlassCard style={{ borderLeft: '4px solid #470BBF' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Annonces</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>{annonces.length}</div>
                  <div style={{ color: '#10B981', fontSize: '0.8rem', marginTop: '0.5rem' }}>↑ 12% ce mois</div>
                </GlassCard>
                <GlassCard style={{ borderLeft: '4px solid #7B2CBF' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>En attente</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFA726' }}>{pending.length}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.86rem', marginTop: '0.5rem' }}>Moderation requise</div>
                </GlassCard>
                <GlassCard style={{ borderLeft: '4px solid #FF6B9D' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Utilisateurs</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>{totalUsers}</div>
                  <div style={{ color: '#10B981', fontSize: '0.8rem', marginTop: '0.5rem' }}>↑ 8 nouveaux</div>
                </GlassCard>
                <GlassCard style={{ borderLeft: '4px solid #3ABEFF' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Visites / Jour</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>1,280</div>
                  <div style={{ color: '#10B981', fontSize: '0.8rem', marginTop: '0.5rem' }}>↑ +24%</div>
                </GlassCard>
              </div>

              {/* Charts Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <GlassCard>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ margin: 0, fontWeight: 700 }}>Évolution hebdomadaire</h3>
                    <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.75rem' }} />
                      <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.75rem' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '0.85rem', color: '#fff' }} />
                      <Line type="monotone" dataKey="annonces" stroke="#470BBF" strokeWidth={3} dot={{ fill: '#470BBF', r: 5 }} activeDot={{ r: 7 }} />
                      <Line type="monotone" dataKey="utilisateurs" stroke="#FFA726" strokeWidth={3} dot={{ fill: '#FFA726', r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </GlassCard>
                <GlassCard>
                  <h3 style={{ margin: '0 0 2rem 0', fontWeight: 700 }}>Catégories populaires</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.7rem' }} angle={-15} textAnchor="end" height={60} />
                      <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '0.75rem' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </GlassCard>
              </div>
            </div>
          )}

          {activeSection === 'annonces' && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>Gestion des Annonces</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '0.8rem 1rem 0.8rem 2.8rem',
                        color: '#fff',
                        width: '300px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '1.5rem' }}>Annonce</th>
                      <th style={{ padding: '1.5rem' }}>Catégorie</th>
                      <th style={{ padding: '1.5rem' }}>Prix</th>
                      <th style={{ padding: '1.5rem' }}>Date</th>
                      <th style={{ padding: '1.5rem' }}>Statut</th>
                      <th style={{ padding: '1.5rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annonces.map(a => (
                      <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s ease' }}>
                        <td style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={getPlaceholderImage(a.categorieId)} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontWeight: 700 }}>{a.titre}</div>
                              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>ID: {a.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{getCategoryLabel(a.categorieId)}</span>
                        </td>
                        <td style={{ padding: '1.25rem', fontWeight: 700 }}>{Number(a.prix).toLocaleString()} €</td>
                        <td style={{ padding: '1.25rem', color: 'rgba(255,255,255,0.4)' }}>{formatDate(a.datePoster)}</td>
                        <td style={{ padding: '1.25rem' }}>
                          <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: a.etat === 'acceptee' ? 'rgba(16, 185, 129, 0.1)' : a.etat === 'en_attente' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: a.etat === 'acceptee' ? '#10B981' : a.etat === 'en_attente' ? '#F59E0B' : '#EF4444',
                            border: `1px solid ${a.etat === 'acceptee' ? 'rgba(16, 185, 129, 0.2)' : a.etat === 'en_attente' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                          }}>
                            {a.etat === 'acceptee' ? 'ACTIF' : a.etat === 'en_attente' ? 'ATTENTE' : 'REFUSÉ'}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {a.etat === 'en_attente' && (
                              <>
                                <button onClick={() => onModerate(a.id, 'acceptee')} style={{ background: '#10B98122', color: '#10B981', border: '1px solid #10B98144', padding: '0.6rem', borderRadius: '10px', cursor: 'pointer' }}><FaCheck /></button>
                                <button onClick={() => onModerate(a.id, 'refusee')} style={{ background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444', padding: '0.6rem', borderRadius: '10px', cursor: 'pointer' }}><FaTimes /></button>
                              </>
                            )}
                            <button onClick={() => navigate(`/annonce/${a.id}`)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '10px', cursor: 'pointer' }}><FaEye /></button>
                            <button onClick={() => onDeleteAnnonce(a.id)} style={{ background: 'rgba(239,68,68,0.05)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', padding: '0.6rem', borderRadius: '10px', cursor: 'pointer' }}><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </div>
          )}

          {activeSection === 'utilisateurs' && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>Utilisateurs ({users?.length || 0})</h1>
              {users && users.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {users.map(u => (
                    <GlassCard key={u.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800 }}>
                          {(u.prenom?.[0] || '?').toUpperCase()}{(u.nom?.[0] || '?').toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{u.prenom || 'N/A'} {u.nom || 'N/A'}</div>
                          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{u.email || 'N/A'}</div>
                        </div>
                        <button onClick={() => onDeleteUser(u)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}><FaTrash /></button>
                      </div>
                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                        <span>{getUserAnnoncesCount(u.id)} annonces</span>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: u.role === 'admin' ? '#470BBF22' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: u.role === 'admin' ? '#470BBF' : '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                          {(u.role || 'user').toUpperCase()}
                        </span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard style={{ textAlign: 'center', padding: '3rem' }}>
                  <FaUsers style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)', marginBottom: '1rem' }} />
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>Aucun utilisateur trouvé</p>
                </GlassCard>
              )}
            </div>
          )}

          {(activeSection === 'signalements' || activeSection === 'analytiques') && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.2)' }}>
              <FaFlag size={80} style={{ marginBottom: '2rem' }} />
              <h2 style={{ fontSize: '2rem' }}>Section en cours de développement</h2>
              <p>Revenez bientôt pour plus de rapports détaillés.</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  )
}
