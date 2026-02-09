import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnnonce } from '../store/annoncesSlice.js'
import { CATEGORIES, TYPES_ANNONCE } from '../data/constants.js'
import { selectAuthUser } from '../store/selectors.js'
import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'
import { FaImage, FaArrowUp } from 'react-icons/fa'

export default function Publier() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)
  const currentUserId = useSelector(state => state.auth.currentUserId)
  const [form, setForm] = useState({
    titre: '', description: '', typeAnnonce: '', categorieId: '', sousCategorieId: '',
    prix: '0', ville: '', marque: '', annee: '2024', etat: ''
  })
  const [contactForm, setContactForm] = useState({
    nom: user?.nom || '',
    telephone: '',
    email: user?.email || ''
  })
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])

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

  const onChange = e => {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: value,
      ...(name === 'categorieId' ? { sousCategorieId: '' } : {})
    }))
  }

  const onContactChange = e => {
    const { name, value } = e.target
    setContactForm(f => ({ ...f, [name]: value }))
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => URL.createObjectURL(file))
    setPhotos([...photos, ...newPhotos])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.titre || !form.description || !form.categorieId || !form.prix || !form.ville || !contactForm.nom || !contactForm.telephone || !contactForm.email) {
      return setError('Merci de remplir tous les champs requis')
    }
    dispatch(addAnnonce({
      titre: form.titre,
      description: form.description,
      typeAnnonce: form.typeAnnonce || 'vente',
      categorieId: form.categorieId,
      sousCategorieId: form.sousCategorieId,
      marque: form.marque,
      annee: form.annee ? Number(form.annee) : undefined,
      prix: Number(form.prix),
      ville: form.ville,
      photos: photos,
      userId: user.id
    }))
    alert('Votre annonce a été soumise et est en attente de validation par un administrateur.')
    navigate('/profile')
  }

  const sousOptions = CATEGORIES.find(c => c.id === form.categorieId)?.sous || []

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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
            Déposer une annonce
          </h1>
          <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.1rem' }}>
            Remplissez le formulaire pour publier votre annonce
          </p>

          <form onSubmit={onSubmit} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
          }}>
            {/* Photos Section */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>1.</span>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>Photos</h2>
              </div>
              <label style={{
                display: 'block',
                border: '2px dashed rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '3rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#470BBF'
                  e.currentTarget.style.backgroundColor = 'rgba(71, 11, 191, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <FaImage style={{ fontSize: '3rem', color: '#470BBF', marginBottom: '1rem' }} />
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>
                  Cliquez pour ajouter des photos
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  PNG, JPG jusqu'à 10MB
                </div>
              </label>
              {photos.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {photos.map((photo, idx) => (
                    <img key={idx} src={photo} alt={`Preview ${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>2.</span>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>Informations de base</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Titre de l'annonce <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={form.titre}
                    onChange={onChange}
                    placeholder="Ex: iPhone 15 Pro Max neuf"
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#470BBF'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Description <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    placeholder="Décrivez votre article en détail..."
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#470BBF'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                      Prix (€) <span style={{ color: '#ff4444' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="prix"
                      value={form.prix}
                      onChange={onChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#fff'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                      Ville <span style={{ color: '#ff4444' }}>*</span>
                    </label>
                    <select
                      name="ville"
                      value={form.ville}
                      onChange={onChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#fff'
                      }}
                    >
                      <option value="" style={{ backgroundColor: '#170D27' }}>Sélectionner...</option>
                      <option value="Paris" style={{ backgroundColor: '#170D27' }}>Paris</option>
                      <option value="Lyon" style={{ backgroundColor: '#170D27' }}>Lyon</option>
                      <option value="Marseille" style={{ backgroundColor: '#170D27' }}>Marseille</option>
                      <option value="Nice" style={{ backgroundColor: '#170D27' }}>Nice</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Section */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', marginTop: '2.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>3.</span>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>Catégorie</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Catégorie <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <select
                    name="categorieId"
                    value={form.categorieId}
                    onChange={onChange}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#170D27' }}>Sélectionner...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id} style={{ backgroundColor: '#170D27' }}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    État
                  </label>
                  <select
                    name="etat"
                    value={form.etat}
                    onChange={onChange}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#170D27' }}>Sélectionner...</option>
                    <option value="Neuf" style={{ backgroundColor: '#170D27' }}>Neuf</option>
                    <option value="Très bon état" style={{ backgroundColor: '#170D27' }}>Très bon état</option>
                    <option value="Bon état" style={{ backgroundColor: '#170D27' }}>Bon état</option>
                    <option value="État moyen" style={{ backgroundColor: '#170D27' }}>État moyen</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Année
                  </label>
                  <input
                    type="number"
                    name="annee"
                    value={form.annee}
                    onChange={onChange}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', marginTop: '2.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>4.</span>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>Informations de contact</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Nom <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={contactForm.nom}
                    onChange={onContactChange}
                    placeholder="Votre nom"
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Téléphone <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={contactForm.telephone}
                    onChange={onContactChange}
                    placeholder="06 12 34 56 78"
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Email <span style={{ color: '#ff4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={onContactChange}
                    placeholder="votre@email.com"
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                color: '#ff4444',
                backgroundColor: 'rgba(255,68,68,0.1)',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.color = '#fff'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(71, 11, 191, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(71, 11, 191, 0.4)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 32px 0 rgba(71, 11, 191, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(71, 11, 191, 0.5)'
                  e.target.style.borderColor = 'rgba(71, 11, 191, 0.6)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 32px 0 rgba(71, 11, 191, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(71, 11, 191, 0.3)'
                  e.target.style.borderColor = 'rgba(71, 11, 191, 0.4)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 32px 0 rgba(71, 11, 191, 0.3)'
                }}
              >
                Publier l'annonce <FaArrowUp />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
