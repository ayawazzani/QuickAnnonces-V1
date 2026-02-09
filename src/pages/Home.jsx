import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Beams from '../components/Beams.jsx'
import CardNav from '../components/CardNav.jsx'
import logo from '../assets/logo.png'
import AnnonceSection from '../components/AnnonceSection.jsx'

export default function Home(){
  const navigate = useNavigate()
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
  ];

  const handleGetStarted = () => {
    if (currentUserId) {
      navigate('/profile')
    } else {
      navigate('/connexion')
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', margin: 0, padding: 0, backgroundColor: '#000000' }}>
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={navItems}
        baseColor="rgba(255,255,255,0.55)"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        onGetStarted={handleGetStarted}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, overflow: 'auto' }}>
        <div className="container">
           <AnnonceSection />
        </div>
      </div>
    </div>
  )
}
