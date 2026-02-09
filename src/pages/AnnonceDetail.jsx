import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAnnonceById, selectUsers } from '../store/selectors.js'
import { CATEGORIES } from '../data/constants.js'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'
import { FaShare, FaHeart, FaPhone, FaEnvelope, FaFlag, FaMapMarkerAlt, FaCalendar, FaEye, FaClock, FaShieldAlt, FaCheckCircle, FaArrowLeft, FaStar } from 'react-icons/fa'

export default function AnnonceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const annonce = useSelector(state => selectAnnonceById(state, id))
  const currentUserId = useSelector(state => state.auth.currentUserId)

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

  const isOwner = currentUserId === annonce?.userId
  const isAdmin = useSelector(state => state.auth.isAdmin)

  if (!annonce || (annonce.etat !== 'acceptee' && !isOwner && !isAdmin)) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', margin: 0, padding: 0, backgroundColor: '#000000', color: '#fff' }}>
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
          <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Annonce en attente de validation</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              Cette annonce n'a pas encore été validée par un administrateur.
              Elle sera visible pour tout le monde dès qu'elle sera acceptée.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '2rem',
                padding: '0.75rem 2rem',
                background: '#470BBF',
                border: 'none',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    )
  }

  const categorie = CATEGORIES.find(c => c.id === annonce.categorieId)
  const sousCategorie = categorie?.sous?.find(s => s.id === annonce.sousCategorieId)
  const users = useSelector(selectUsers)
  const seller = users.find(u => u.id === annonce.userId) || { nom: 'Utilisateur', prenom: 'Anonyme', email: 'contact@example.com' }

  const getPlaceholderImage = () => {
    if (annonce.categorieId === 'cat-immo') {
      return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    } else if (annonce.categorieId === 'cat-auto') {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0f2e?w=800&h=600&fit=crop'
    } else {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop'
    }
  }

  const imageUrl = annonce.photos && annonce.photos.length > 0 ? annonce.photos[0] : getPlaceholderImage()
  const datePosted = new Date(annonce.datePoster)
  const formattedDate = datePosted.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const views = annonce.views || Math.floor(Math.random() * 200) + 50

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', margin: 0, padding: 0, backgroundColor: '#000', color: '#fff' }}>
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1, opacity: 1 }}>
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
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#470BBF'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateX(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <FaArrowLeft /> Retour
          </button>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Main Content */}
            <div style={{ flex: 1 }}>
              {/* Hero Image */}
              <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <img
                  src={imageUrl}
                  alt={annonce.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {annonce.etat === 'acceptee' && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '30px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(71, 11, 191, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaStar /> À la une
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                      e.currentTarget.style.backgroundColor = '#470BBF'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <FaShare />
                  </button>
                  <button style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                      e.currentTarget.style.backgroundColor = '#EF4444'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <FaHeart />
                  </button>
                </div>
                {/* View Count Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <FaEye /> {views} vues
                </div>
              </div>

              {/* Listing Overview */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: '24px',
                marginBottom: '2rem',
                boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                    color: '#fff',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 15px rgba(71, 11, 191, 0.3)'
                  }}>
                    {categorie?.label || 'Catégorie'} • {annonce.typeAnnonce}
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#fff',
                    padding: '0.6rem 2rem',
                    borderRadius: '30px',
                    fontSize: '2rem',
                    fontWeight: 800,
                    marginLeft: 'auto',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}>
                    {Number(annonce.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                  </span>
                </div>
                <h1 style={{ margin: '0 0 1.25rem 0', fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: '1.2' }}>
                  {annonce.titre}
                </h1>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaMapMarkerAlt style={{ color: '#470BBF' }} /> {annonce.ville}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaCalendar style={{ color: '#470BBF' }} /> Publié le {formattedDate}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaClock style={{ color: '#470BBF' }} /> Il y a {Math.max(1, Math.floor((Date.now() - datePosted.getTime()) / (1000 * 60 * 60 * 24)))} jours
                  </span>
                </div>
              </div>

              {/* Description */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: '24px',
                marginBottom: '2rem',
                boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '4px', height: '28px', background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)', borderRadius: '2px' }}></div>
                  Description
                </h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: '2', fontSize: '1.05rem' }}>
                  {annonce.description}
                </p>
              </div>

              {/* Additional Information */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '4px', height: '28px', background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)', borderRadius: '2px' }}></div>
                  Informations complémentaires
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  {annonce.annee && (
                    <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Année</span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>{annonce.annee}</span>
                    </div>
                  )}
                  {annonce.marque && (
                    <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Marque</span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>{annonce.marque}</span>
                    </div>
                  )}
                  <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>État</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Excellent</span>
                  </div>
                  <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Type</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>{annonce.typeAnnonce}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ width: '400px', flexShrink: 0 }}>
              {/* Contact Seller Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '24px',
                marginBottom: '2rem',
                boxShadow: '0 8px 48px rgba(0,0,0,0.4)'
              }}>
                <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>Contacter le vendeur</h3>

                {/* Seller Info */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 15px rgba(71, 11, 191, 0.3)'
                    }}>
                      {seller.prenom[0]}{seller.nom[0]}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, marginBottom: '0.25rem', fontSize: '1.15rem' }}>
                        {seller.prenom} {seller.nom}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>
                        <FaCheckCircle /> Vendeur vérifié
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(71, 11, 191, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaPhone style={{ color: '#470BBF', fontSize: '0.9rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.1rem' }}>Téléphone</div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>06 12 34 56 78</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(71, 11, 191, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaEnvelope style={{ color: '#470BBF', fontSize: '0.9rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.1rem' }}>Email</div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{seller.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button style={{
                    width: '100%',
                    padding: '1.1rem',
                    background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '16px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 24px rgba(71, 11, 191, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(71, 11, 191, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(71, 11, 191, 0.3)'
                    }}
                  >
                    <FaPhone /> Appeler maintenant
                  </button>
                  <button style={{
                    width: '100%',
                    padding: '1.1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '16px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#470BBF'
                      e.currentTarget.style.backgroundColor = 'rgba(71, 11, 191, 0.1)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <FaEnvelope /> Envoyer un message
                  </button>
                </div>
              </div>

              {/* Security Tips */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: '24px',
                marginBottom: '2rem',
                boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
                    <FaShieldAlt style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Conseils de sécurité</h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '2' }}>
                  <li>Rencontrez le vendeur dans un lieu public</li>
                  <li>Vérifiez l'article avant l'achat</li>
                  <li>Méfiez-vous des prix trop bas</li>
                  <li>Privilégiez les paiements sécurisés</li>
                  <li>Ne partagez jamais vos données bancaires</li>
                </ul>
              </div>

              {/* Report Button */}
              <button style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                  e.currentTarget.style.borderColor = '#EF4444'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'
                }}
              >
                <FaFlag /> Signaler cette annonce
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
