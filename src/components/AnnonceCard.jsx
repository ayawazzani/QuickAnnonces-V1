import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaMapMarkerAlt, FaCalendar, FaEye, FaClock, FaStar } from 'react-icons/fa'
import { CATEGORIES } from '../data/constants.js'
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice.js'

export default function AnnonceCard({ annonce, viewMode = 'grid' }) {
  const dispatch = useDispatch()
  const isFavorite = useSelector(state => selectIsFavorite(state, annonce.id))

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(annonce.id))
  }

  const getCategoryLabel = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId)
    return cat?.label || catId
  }

  // Placeholder image based on category
  const getPlaceholderImage = () => {
    if (annonce.categorieId === 'cat-immo') {
      return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    } else if (annonce.categorieId === 'cat-auto') {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0f2e?w=400&h=300&fit=crop'
    } else {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop'
    }
  }

  const imageUrl = annonce.photos && annonce.photos.length > 0 ? annonce.photos[0] : getPlaceholderImage()
  const datePosted = new Date(annonce.datePoster)
  const daysAgo = Math.floor((Date.now() - datePosted.getTime()) / (1000 * 60 * 60 * 24))
  const dateText = daysAgo === 0 ? "Aujourd'hui" : daysAgo === 1 ? "Hier" : `${daysAgo} j.`
  const views = annonce.views || Math.floor(Math.random() * 200) + 50

  const cardStyle = {
    backgroundColor: 'rgba(15, 15, 15, 0.4)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    position: 'relative'
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-8px)'
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(71, 11, 191, 0.2)'
    e.currentTarget.style.borderColor = 'rgba(71, 11, 191, 0.4)'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
  }

  if (viewMode === 'list') {
    return (
      <Link to={`/annonce/${annonce.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{ ...cardStyle, display: 'flex', gap: '0' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={{ width: '280px', height: '200px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <img
              src={imageUrl}
              alt={annonce.titre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <FaEye /> {views}
            </div>
            <button
              onClick={handleFavoriteClick}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: isFavorite ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '0.5rem',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: isFavorite ? '0 4px 12px rgba(255, 215, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <FaStar />
            </button>
          </div>
          <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {getCategoryLabel(annonce.categorieId)}
                </span>
                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#470BBF'
                }}>
                  {Number(annonce.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: '1.3' }}>{annonce.titre}</h3>
              <p style={{ margin: '0 0 1rem 0', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {annonce.description}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaMapMarkerAlt style={{ color: '#470BBF' }} /> {annonce.ville}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaClock style={{ color: '#470BBF' }} /> {dateText}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/annonce/${annonce.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
          <img
            src={imageUrl}
            alt={annonce.titre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          />
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <FaEye /> {views}
          </div>
          <button
            onClick={handleFavoriteClick}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: isFavorite ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: isFavorite ? '0 4px 12px rgba(255, 215, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <FaStar />
          </button>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(71, 11, 191, 0.3)'
          }}>
            {Number(annonce.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
          </div>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #470BBF 0%, #7B2CBF 100%)',
              color: '#fff',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {getCategoryLabel(annonce.categorieId)}
            </span>
            <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {annonce.titre}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaMapMarkerAlt style={{ color: '#470BBF' }} /> {annonce.ville}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaClock style={{ color: '#470BBF' }} /> {dateText}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
