import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/usersSlice.js'
import { selectUsers } from '../store/selectors.js'
import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'

export default function Inscription(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const currentUserId = useSelector(state => state.auth.currentUserId)
  const [form, setForm] = useState({ nom:'', prenom:'', email:'', password:'' })
  const [error, setError] = useState('')

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

  const onChange = (e)=> setForm(f=>({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e)=>{
    e.preventDefault()
    // validations
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setError('Email invalide')
    if (!form.password || form.password.length < 6) return setError('Mot de passe min 6 caractères')
    if (!form.nom || !form.prenom) return setError('Champs requis')
    if (users.some(u=>u.email.toLowerCase()===form.email.toLowerCase())) return setError('Email déjà utilisé')

    dispatch(registerUser(form))
    navigate('/connexion')
  }

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
        <div className="container" style={{ color: '#fff' }}>
          <h2 style={{ marginTop:0, color: '#fff', marginBottom: '2rem' }}>Créer un compte</h2>
          <form className="form" onSubmit={onSubmit}>
            <div className="row">
              <div className="col-6"><input className="input" name="nom" placeholder="Nom" onChange={onChange} style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} /></div>
              <div className="col-6"><input className="input" name="prenom" placeholder="Prénom" onChange={onChange} style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} /></div>
            </div>
            <input className="input" name="email" type="email" placeholder="Email" onChange={onChange} style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} />
            <input className="input" name="password" type="password" placeholder="Mot de passe (min 6)" onChange={onChange} style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} />
            {error && <div style={{ color:'#ff4444', backgroundColor: 'rgba(255,68,68,0.1)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}
            <button 
              className="button primary" 
              type="submit" 
              style={{ 
                background: 'rgba(71, 11, 191, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(71, 11, 191, 0.4)',
                color: '#fff',
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
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
