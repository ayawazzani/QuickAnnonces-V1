import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice.js'
import { selectAuthUser, selectAllAnnonces } from '../store/selectors.js'
import { CATEGORIES } from '../data/constants.js'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'
import { FaUser, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaHome, FaFileAlt, FaEdit, FaCalendar, FaMapMarkerAlt, FaEye, FaClock, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaChartLine } from 'react-icons/fa'

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.currentUserId)
  const user = useSelector(selectAuthUser)
  const annonces = useSelector(selectAllAnnonces)
  const userAnnonces = annonces.filter(a => a.userId === currentUserId)
  const acceptedAnnonces = userAnnonces.filter(a => a.etat === 'acceptee')
  const pendingAnnonces = userAnnonces.filter(a => a.etat === 'en_attente')

  const navItems = [
    {
      label: "Navigation",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Accueil", href: "/", ariaLabel: "Accueil" },
        { label: "Recherche", href: "/recherche", ariaLabel: "Recherche" },
        { label: "Publier", href: "/publier", ariaLabel: "Publier une annonce" }
      ]
    },
    {
      label: "Compte",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Connexion", href: "/connexion", ariaLabel: "Se connecter" },
        { label: "Inscription", href: "/inscription", ariaLabel: "S'inscrire" },
        { label: "Profile", href: "/profile", ariaLabel: "Mon profil" }
      ]
    },
    {
      label: "Admin",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Dashboard", href: "/admin", ariaLabel: "Dashboard admin" }
      ]
    }
  ]

  const handleGetStarted = () => {
    if (currentUserId) {
      navigate('/profile')
    } else {
      navigate('/connexion')
    }
  }
  if (!currentUserId) {
    navigate('/connexion')
    return null
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/connexion')
  }

  const getPlaceholderImage = (catId) => {
    if (catId === 'cat-immo') {
      return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    } else if (catId === 'cat-auto') {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0f2e?w=400&h=300&fit=crop'
    } else {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop'
    }
  }

  const getCategoryLabel = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId)
    return cat?.label || 'Catégorie'
  }

  const totalViews = userAnnonces.reduce((sum, a) => sum + (a.views || Math.floor(Math.random() * 100)), 0)

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', margin: 0, padding: 0, backgroundColor: '#000000' }}>
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <DarkVeil />
      </div>
      <CardNav
        logo={logo}
        logoAlt="QuickAnnonces"
        items={navItems}
        baseColor="rgba(0,0,0,0.8)"
        menuColor="#fff"
        buttonBgColor="#470BBF"
        buttonTextColor="#fff"
        ease="power3.out"
        onGetStarted={handleGetStarted}
      />
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ margin: '0 0 2rem 0', fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>Mon Profil</h1>

          {user && (
            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', marginBottom: '2rem' }}>
              {/* Profile Card */}
              <div style={{ height: 'fit-content' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      margin: '0 auto 1.5rem',
                      border: '4px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 12px 32px rgba(71, 11, 191, 0.4)'
                    }}>
                      {user?.prenom?.[0] || ''}{user?.nom?.[0] || 'U'}
                    </div>
                    <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
                      {user?.prenom || 'Nom'} {user?.nom || ''}
                    </h2>
                    <span style={{
                      background: 'rgba(71, 11, 191, 0.2)',
                      border: '1px solid rgba(71, 11, 191, 0.4)',
                      color: '#fff',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-block'
                    }}>
                      {user.role === 'admin' ? '👑 Administrateur' : '✨ Utilisateur'}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                      <FaEnvelope style={{ color: '#470BBF', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.25rem' }}>Email</div>
                        <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>{user.email}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                      <FaCalendar style={{ color: '#470BBF', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.25rem' }}>Membre depuis</div>
                        <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>Janvier 2024</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                      <FaFileAlt style={{ color: '#470BBF', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.25rem' }}>Annonces</div>
                        <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>{userAnnonces.length} publications</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                      onClick={() => navigate('/publier')}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '14px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 12px 32px rgba(71, 11, 191, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)'
                        e.target.style.boxShadow = '0 16px 40px rgba(71, 11, 191, 0.45)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 12px 32px rgba(71, 11, 191, 0.3)'
                      }}
                    >
                      <FaEdit /> Publier une annonce
                    </button>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '14px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.color = '#fff'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.color = 'rgba(255, 255, 255, 0.7)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      <FaSignOutAlt /> Déconnexion
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats and Content */}
              <div>
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)', padding: '2rem', borderRadius: '24px', boxShadow: '0 24px 60px rgba(71, 11, 191, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaFileAlt style={{ color: '#fff', fontSize: '1.75rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>Total</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>{userAnnonces.length}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaCheckCircle style={{ color: '#10B981', fontSize: '1.75rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>Acceptées</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>{acceptedAnnonces.length}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaHourglassHalf style={{ color: '#F59E0B', fontSize: '1.75rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>Attente</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>{pendingAnnonces.length}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaEye style={{ color: '#fff', fontSize: '1.75rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>Vues</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>{totalViews}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Announcements */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '2rem', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>Mes Annonces</h2>
                    <button
                      onClick={() => navigate('/publier')}
                      style={{
                        padding: '0.75rem 1.75rem',
                        background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 8px 24px rgba(71, 11, 191, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 12px 32px rgba(71, 11, 191, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 8px 24px rgba(71, 11, 191, 0.3)'
                      }}
                    >
                      <FaEdit /> Nouvelle annonce
                    </button>
                  </div>

                  {userAnnonces.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                      <FaFileAlt style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.2 }} />
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Rien pour l'instant</h3>
                      <p style={{ margin: '0 0 2rem 0', fontSize: '1rem' }}>Vous n'avez pas encore publié d'annonce</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      {userAnnonces.map(annonce => (
                        <div
                          key={annonce.id}
                          onClick={() => navigate(`/annonce/${annonce.id}`)}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#470BBF'
                            e.currentTarget.style.backgroundColor = 'rgba(71, 11, 191, 0.05)'
                            e.currentTarget.style.transform = 'translateY(-6px)'
                            e.currentTarget.style.boxShadow = '0 24px 60px rgba(71, 11, 191, 0.15)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                            <img
                              src={getPlaceholderImage(annonce.categorieId)}
                              alt={annonce.titre}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                              <span style={{
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(10px)',
                                color: annonce.etat === 'acceptee' ? '#10B981' : annonce.etat === 'en_attente' ? '#F59E0B' : '#EF4444',
                                padding: '0.4rem 1rem',
                                borderRadius: '30px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}>
                                {annonce.etat === 'acceptee' ? '✓ ACCEPTÉE' : annonce.etat === 'en_attente' ? '⏳ ATTENTE' : '✗ REFUSÉE'}
                              </span>
                            </div>
                          </div>
                          <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                              <span style={{ color: '#470BBF', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {getCategoryLabel(annonce.categorieId)}
                              </span>
                              <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>
                                {Number(annonce.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                              </span>
                            </div>
                            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: '1.4' }}>{annonce.titre}</h3>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <FaMapMarkerAlt style={{ color: '#470BBF' }} /> {annonce.ville}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <FaClock style={{ color: '#470BBF' }} /> {new Date(annonce.datePoster).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
