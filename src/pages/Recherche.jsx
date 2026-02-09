import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, TYPES_ANNONCE } from '../data/constants.js'
import { selectFilteredAnnonces } from '../store/selectors.js'
import { resetFilters, setFilters } from '../store/annoncesSlice.js'
import { selectFavoriteIds } from '../store/favoritesSlice.js'
import AnnonceCard from '../components/AnnonceCard.jsx'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'
import { FaSearch, FaTh, FaList, FaFilter, FaTimes, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'

export default function Recherche() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const annonces = useSelector(selectFilteredAnnonces)
  const favoriteIds = useSelector(selectFavoriteIds)
  const currentUserId = useSelector(state => state.auth.currentUserId)
  const filters = useSelector(state => state.annonces.filters)
  const [viewMode, setViewMode] = useState('grid')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

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

  const onChange = (e) => {
    const { name, value } = e.target
    dispatch(setFilters({ [name]: value }))
  }

  const onReset = () => {
    dispatch(resetFilters())
    setShowOnlyFavorites(false)
  }

  const acceptedAnnonces = showOnlyFavorites
    ? annonces.filter(a => a.etat === 'acceptee' && favoriteIds.includes(a.id))
    : annonces.filter(a => a.etat === 'acceptee')

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

          {/* Search Header */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '1.25rem',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <FaSearch style={{ color: '#470BBF', fontSize: '1.2rem' }} />
              <input
                type="text"
                name="keyword"
                placeholder="Rechercher un objet, une ville, une catégorie..."
                onChange={onChange}
                value={filters.keyword || ''}
                style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', fontSize: '1.1rem', color: '#fff' }}
              />
            </div>
            <button
              style={{
                background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '14px',
                padding: '0 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(71, 11, 191, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 12px 32px rgba(71, 11, 191, 0.45)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 8px 24px rgba(71, 11, 191, 0.3)'
              }}
            >
              Rechercher
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Sidebar Filters */}
            <div style={{ width: '320px', flexShrink: 0 }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '2rem',
                borderRadius: '24px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                position: 'sticky',
                top: '100px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaFilter style={{ color: '#470BBF', fontSize: '1.1rem' }} /> Filtres
                  </h3>
                  <button onClick={onReset} style={{ background: 'none', border: 'none', color: '#470BBF', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>Réinitialiser</button>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Catégorie</label>
                  <select
                    name="categorieId"
                    onChange={onChange}
                    value={filters.categorieId || ''}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a' }}>Toutes catégories</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id} style={{ backgroundColor: '#1a1a1a' }}>{c.label}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Ville</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="ville"
                      onChange={onChange}
                      value={filters.ville || ''}
                      placeholder="Toutes les villes"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        paddingRight: '3rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        color: '#fff',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    <FaMapMarkerAlt style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#470BBF' }} />
                  </div>
                </div>

                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: showOnlyFavorites ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: showOnlyFavorites ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    transition: 'all 0.3s ease',
                    boxShadow: showOnlyFavorites ? '0 4px 12px rgba(255, 215, 0, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!showOnlyFavorites) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showOnlyFavorites) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <FaHeart /> {showOnlyFavorites ? 'Afficher tout' : `Mes Favoris (${favoriteIds.length})`}
                </button>

                <div style={{ padding: '1.5rem', background: 'rgba(71, 11, 191, 0.05)', borderRadius: '18px', border: '1px dashed rgba(71, 11, 191, 0.3)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                    Affinez votre recherche pour trouver exactement ce que vous cherchez en quelques clics.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                    Résultats
                  </h2>
                  <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>
                    {acceptedAnnonces.length} annonce{acceptedAnnonces.length > 1 ? 's' : ''} disponible{acceptedAnnonces.length > 1 ? 's' : ''}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select
                    name="sortBy"
                    onChange={onChange}
                    value={filters.sortBy || 'date'}
                    style={{
                      padding: '0.75rem 1.25rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="date" style={{ backgroundColor: '#1a1a1a' }}>Plus récentes</option>
                    <option value="prix" style={{ backgroundColor: '#1a1a1a' }}>Prix croissant</option>
                  </select>
                  <div style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                      onClick={() => setViewMode('grid')}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: viewMode === 'grid' ? '#470BBF' : 'transparent',
                        color: viewMode === 'grid' ? '#fff' : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaTh />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: viewMode === 'list' ? '#470BBF' : 'transparent',
                        color: viewMode === 'list' ? '#fff' : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>

              {acceptedAnnonces.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '10rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <FaSearch style={{ fontSize: '4rem', color: 'rgba(71, 11, 191, 0.2)', marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Aucun résultat</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto' }}>Nous n'avons trouvé aucune annonce correspondant à vos critères. Essayez d'élargir votre recherche.</p>
                  <button onClick={onReset} style={{ marginTop: '2.5rem', padding: '1rem 2.5rem', background: '#470BBF', border: 'none', color: '#fff', borderRadius: '14px', fontWeight: 700, cursor: 'pointer' }}>Effacer les filtres</button>
                </div>
              ) : (
                <div className="grid" style={{ gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '2rem' }}>
                  {acceptedAnnonces.map(a => <AnnonceCard key={a.id} annonce={a} viewMode={viewMode} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
