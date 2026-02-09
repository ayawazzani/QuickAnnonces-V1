import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { registerUser } from '../store/usersSlice.js'
import DarkVeil from '../components/DarkVeil'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'

const Connexion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const users = useSelector(state => state.users.items)
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

  ]

  const handleGetStarted = () => {
    if (currentUserId) {
      navigate('/profile')
    } else {
      navigate('/connexion')
    }
  }



  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      dispatch(login({ userId: user.id, isAdmin: user.role === 'admin' }))
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }

    const userExists = users.find(u => u.email === email)
    if (userExists) {
      setError('Email already registered')
      return
    }

    const newId = Math.random().toString(36).substr(2, 9)
    const nameParts = name.trim().split(' ')
    const prenom = nameParts[0] || ''
    const nom = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' '

    dispatch(registerUser({ id: newId, prenom, nom, email, password }))
    dispatch(login({ userId: newId, isAdmin: false }))
    navigate('/')
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0, position: 'relative' }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes glowPurple {
            0% { box-shadow: 0 0 5px rgba(71, 11, 191, 0.3); }
            50% { box-shadow: 0 0 25px rgba(71, 11, 191, 0.8); }
            100% { box-shadow: 0 0 5px rgba(71, 11, 191, 0.3); }
          }
          @keyframes floatGlow {
            0% { box-shadow: 0 0 15px rgba(71, 11, 191, 0.5), 0 0 30px rgba(71, 11, 191, 0.3); }
            50% { box-shadow: 0 0 25px rgba(71, 11, 191, 0.8), 0 0 50px rgba(71, 11, 191, 0.5); }
            100% { box-shadow: 0 0 15px rgba(71, 11, 191, 0.5), 0 0 30px rgba(71, 11, 191, 0.3); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          @keyframes borderGlow {
            0% { border-color: rgba(71, 11, 191, 0.3); }
            50% { border-color: rgba(71, 11, 191, 0.8); }
            100% { border-color: rgba(71, 11, 191, 0.3); }
          }
          .animated-form {
            animation: slideUp 0.8s ease-out, fadeIn 1s ease-in-out;
            position: relative;
            overflow: hidden;
          }
          .form-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(71, 11, 191, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%);
            pointer-events: none;
          }
          .glow-input {
            animation: borderGlow 3s ease-in-out infinite;
            transition: all 0.3s ease;
          }
          .glow-input:focus {
            box-shadow: 0 0 15px rgba(71, 11, 191, 0.6), inset 0 0 10px rgba(71, 11, 191, 0.1);
            transform: translateY(-2px);
          }
          .animated-title {
            animation: fadeIn 1.5s ease-in-out;
            background: linear-gradient(135deg, #ffffff 0%, rgb(71, 11, 191) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .button-glow {
            animation: floatGlow 2s ease-in-out infinite;
            position: relative;
            overflow: hidden;
          }
          .button-glow::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 3s infinite;
          }
          .tab-button-active {
            background: rgb(71, 11, 191);
            box-shadow: 0 0 15px rgba(71, 11, 191, 0.6);
            animation: floatGlow 2s ease-in-out infinite;
          }
          .tab-button-inactive {
            transition: all 0.3s ease;
          }
          .tab-button-inactive:hover {
            color: rgb(71, 11, 191);
            box-shadow: 0 0 10px rgba(71, 11, 191, 0.4);
          }
          .error-message {
            animation: pulse 0.5s ease-in-out;
            background: linear-gradient(135deg, rgb(71, 11, 191) 0%, rgba(71, 11, 191, 0.7) 100%);
            border-left: 4px solid rgb(255, 255, 255);
          }
          .toggle-link {
            background: linear-gradient(135deg, rgb(71, 11, 191), rgba(71, 11, 191, 0.6));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transition: all 0.3s ease;
          }
          .toggle-link:hover {
            -webkit-text-fill-color: rgb(71, 11, 191);
            filter: brightness(1.2);
          }
        `}
      </style>
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
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
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="animated-form" style={{
          backgroundColor: '#0a0a0a',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(71, 11, 191, 0.3), 0 0 60px rgba(71, 11, 191, 0.1)',
          maxWidth: '400px',
          width: '90%',
          border: '1px solid rgba(71, 11, 191, 0.3)',
          position: 'relative',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="form-background"></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="animated-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h1>

            {error && (
              <div className="error-message" style={{
                color: '#fff',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glow-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(71, 11, 191, 0.5)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glow-input"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(71, 11, 191, 0.5)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glow-input"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(71, 11, 191, 0.5)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
              />

              <button
                type="submit"
                className="button-glow"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(71, 11, 191, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(71, 11, 191, 0.4)',
                  color: '#fff',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 8px 32px 0 rgba(71, 11, 191, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(71, 11, 191, 0.5)'
                  e.target.style.borderColor = 'rgba(71, 11, 191, 0.6)'
                  e.target.style.boxShadow = '0 8px 32px 0 rgba(71, 11, 191, 0.5)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(71, 11, 191, 0.3)'
                  e.target.style.borderColor = 'rgba(71, 11, 191, 0.4)'
                  e.target.style.boxShadow = '0 8px 32px 0 rgba(71, 11, 191, 0.3)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: '#999'
            }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setEmail('')
                  setPassword('')
                  setName('')
                }}
                className="toggle-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '0.5rem',
                  textDecoration: 'underline',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Connexion
