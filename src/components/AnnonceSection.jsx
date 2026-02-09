import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCar, FaShoppingBag, FaLaptop, FaRing, FaBook, FaDollarSign, FaUsers, FaStar, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { selectAllAnnonces } from "../store/selectors.js";
import { setFilters } from "../store/annoncesSlice.js";
import { CATEGORIES } from "../data/constants.js";
import AnnonceCard from "./AnnonceCard.jsx";
import "./AnnonceSection.css";

export default function AnnonceSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allAnnonces = useSelector(selectAllAnnonces);
  const [searchLocal, setSearchLocal] = useState({ keyword: '', categorieId: '', ville: '' });
  const acceptedAnnonces = allAnnonces.filter(a => a.etat === 'acceptee').slice(0, 3);

  const categories = [
    { id: 'cat-immo', name: 'Immobilier', icon: FaHome },
    { id: 'cat-transport', name: 'Transport', icon: FaCar },
    { id: 'cat-vetements', name: 'Vêtements', icon: FaShoppingBag },
    { id: 'cat-electronique', name: 'Électronique', icon: FaLaptop },
    { id: 'cat-bijoux', name: 'Bijoux', icon: FaRing },
    { id: 'cat-livres', name: 'Livres', icon: FaBook }
  ].map(cat => ({
    ...cat,
    count: `${allAnnonces.filter(a => a.categorieId === cat.id).length} annonces`
  }));

  const cardImages = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop'
  ];

  return (
    <main className="annonce-page">
      {/* HERO */}
      <section className="annonce-hero">
        

        <h1 className="annonce-hero-title">
          Déposez et trouvez
          <br />
          vos annonces
          <br />
          rapidement.
        </h1>

        <p className="annonce-hero-text">
          Une plateforme centralisée, sécurisée et intuitive pour toutes vos
          annonces — immobilier, emploi, véhicules, multimédia et bien plus.
          Gagnez du temps et atteignez plus de personnes, gratuitement.
        </p>

        <div className="annonce-hero-actions">
          <button
            className="annonce-btn annonce-btn-primary"
            onClick={() => navigate('/publier')}
          >
            Déposer une annonce
          </button>
          <button
            className="annonce-btn annonce-btn-ghost"
            onClick={() => navigate('/recherche')}
          >
            Découvrir les annonces
          </button>
        </div>
      </section>

      {/* SEARCH + CATEGORIES */}
      <section className="annonce-search">
        <header className="annonce-section-header">
          <h2>Trouvez tout ce que vous cherchez</h2>
          <p>Des milliers d&apos;annonces dans toutes les catégories</p>
        </header>

        <div className="annonce-search-box">
          <input
            type="text"
            className="annonce-input"
            placeholder="Que recherchez-vous ?"
            value={searchLocal.keyword}
            onChange={(e) => setSearchLocal({ ...searchLocal, keyword: e.target.value })}
          />
          <select
            className="annonce-input"
            value={searchLocal.categorieId}
            onChange={(e) => setSearchLocal({ ...searchLocal, categorieId: e.target.value })}
          >
            <option value="">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <input
            type="text"
            className="annonce-input"
            placeholder="Ville"
            value={searchLocal.ville}
            onChange={(e) => setSearchLocal({ ...searchLocal, ville: e.target.value })}
          />
          <button
            className="annonce-btn annonce-btn-primary search-btn"
            onClick={() => {
              dispatch(setFilters({ ...searchLocal }));
              navigate('/recherche');
            }}
          >
            Rechercher
          </button>
        </div>

        <div className="annonce-search-ctas">
          <button
            className="annonce-btn annonce-btn-soft"
            onClick={() => navigate('/publier')}
          >
            Publier une annonce
          </button>
          <button
            className="annonce-btn annonce-btn-soft"
            onClick={() => navigate('/recherche')}
          >
            Parcourir les annonces
          </button>
        </div>

        <div className="annonce-categories">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                className="annonce-category-card hover-lift"
                style={{ animationDelay: `${idx * 0.1}s`, cursor: 'pointer' }}
                onClick={() => {
                  dispatch(setFilters({ categorieId: cat.id }));
                  navigate('/recherche');
                }}
              >
                <div className="icon-placeholder">
                  <IconComponent size={28} style={{ color: '#fff' }} />
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED CARDS */}
      <section className="annonce-featured">
        <button
          className="annonce-btn annonce-btn-ghost small-center"
          onClick={() => navigate('/recherche')}
        >
          Voir toutes les annonces
        </button>

        {acceptedAnnonces.length > 0 ? (
          <div className="grid" style={{ marginTop: '2rem' }}>
            {acceptedAnnonces.map(annonce => (
              <AnnonceCard key={annonce.id} annonce={annonce} />
            ))}
          </div>
        ) : (
          <div className="annonce-featured-grid">
            <article className="annonce-card hover-scale">
              <div className="annonce-card-image" style={{ backgroundImage: `url('${cardImages[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="annonce-card-body">
                <span className="annonce-card-chip">Électronique</span>
                <h3>MacBook Pro M3 14"</h3>
                <p className="annonce-card-desc">
                  MacBook Pro 14 pouces, 16GB RAM, 512GB SSD. Parfait pour le
                  travail.
                </p>
                <div className="annonce-card-meta">
                  <span><FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />Marrakech</span>
                  <span>⏱ Il y a 10 mois</span>
                  <span className="price">2 200 €</span>
                </div>
              </div>
            </article>

            <article className="annonce-card hover-scale">
              <div className="annonce-card-image" style={{ backgroundImage: `url('${cardImages[1]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="annonce-card-body">
                <span className="annonce-card-chip">Immobilier</span>
                <h3>Appartement T3 centre ville</h3>
                <p className="annonce-card-desc">
                  Appartement T3 de 75m² en centre ville, rénové, balcon, parking inclus.
                </p>
                <div className="annonce-card-meta">
                  <span><FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />Rabat</span>
                  <span>⏱ Il y a 10 mois</span>
                  <span className="price">1 200 €</span>
                </div>
              </div>
            </article>

            <article className="annonce-card hover-scale">
              <div className="annonce-card-image" style={{ backgroundImage: `url('${cardImages[2]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="annonce-card-body">
                <span className="annonce-card-chip">Transport</span>
                <h3>BMW X3 xDrive30d</h3>
                <p className="annonce-card-desc">
                  BMW X3 xDrive30d, diesel, boîte automatique, GPS, sièges chauffants.
                </p>
                <div className="annonce-card-meta">
                  <span><FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />Casablanca</span>
                  <span>⏱ Il y a 10 mois</span>
                  <span className="price">35 000 €</span>
                </div>
              </div>
            </article>
          </div>
        )}
      </section>

      {/* STATS */}
      <section className="annonce-stats">
        <h2>Notre communauté en chiffres</h2>
        <p>
          Rejoignez des milliers d&apos;utilisateurs qui font confiance à
          QuickAnnonces
        </p>

        <div className="annonce-stats-grid">
          <div className="annonce-stat">
            <div className="stat-icon"><FaDollarSign /></div>
            <h3>4 300+</h3>
            <p>Annonces actives</p>
          </div>
          <div className="annonce-stat">
            <div className="stat-icon"><FaUsers /></div>
            <h3>15 000+</h3>
            <p>Utilisateurs inscrits</p>
          </div>
          <div className="annonce-stat">
            <div className="stat-icon"><FaStar /></div>
            <h3>98%</h3>
            <p>Taux de satisfaction</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="annonce-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>À propos</h4>
            <ul>
              <li><a href="#">Qui sommes-nous</a></li>
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Catégories</h4>
            <ul>
              <li><a href="#">Électronique</a></li>
              <li><a href="#">Immobilier</a></li>
              <li><a href="#">Transport</a></li>
              <li><a href="#">Mode</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Aide</h4>
            <ul>
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="#">Signaler une annonce</a></li>
              <li><a href="#">Sécurité</a></li>
              <li><a href="#">Règles de confiance</a></li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h4>Suivez-nous</h4>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 QuickAnnonces. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
