import { TYPES_ANNONCE, CATEGORIES } from './constants.js'

export const seedUsers = [
  { id: 'admin-1', nom: 'Admin', prenom: 'Alice', email: 'admin@qa.test', password: 'admin123', role: 'admin' },
  { id: 'user-1', nom: 'Doe', prenom: 'John', email: 'john@qa.test', password: 'john1234', role: 'user' },
  { id: 'user-2', nom: 'Martin', prenom: 'Sophie', email: 'sophie@qa.test', password: 'sophie123', role: 'user' },
]

export const seedAnnonces = [
  // --- IMMOBILIER (2 annonces) ---
  {
    id: 'a1',
    titre: 'Villa moderne avec piscine',
    description: 'Magnifique villa de 200m² avec piscine, jardin paysagé et garage double. Quartier calme et résidentiel. 4 chambres, 2 salles de bain, cuisine équipée.',
    typeAnnonce: 'vente',
    categorieId: 'cat-immo',
    sousCategorieId: 'immo-maison',
    prix: 450000,
    ville: 'Nice',
    photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    datePoster: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
    etat: 'acceptee'
  },
  {
    id: 'a2',
    titre: 'Appartement T3 centre-ville',
    description: 'Superbe appartement T3 rénové de 75m² en plein centre-ville, proche de toutes commodités. Balcon, parking, ascenseur.',
    typeAnnonce: 'location',
    categorieId: 'cat-immo',
    sousCategorieId: 'immo-appartement',
    prix: 1200,
    ville: 'Lyon',
    photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    datePoster: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2',
    etat: 'acceptee'
  },

  // --- TRANSPORT (2 annonces) ---
  {
    id: 'a3',
    titre: 'Porsche 911 Carrera S',
    description: 'Splendide Porsche 911 Carrera S 2020, gris argent, intérieur cuir rouge. 35 000 km, entretien exclusif Porsche, état impeccable.',
    typeAnnonce: 'vente',
    categorieId: 'cat-transport',
    sousCategorieId: 'auto-voiture',
    prix: 115000,
    ville: 'Cannes',
    marque: 'Porsche',
    annee: 2020,
    photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'],
    datePoster: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    etat: 'acceptee'
  },
  {
    id: 'a4',
    titre: 'Yamaha MT-07 2022',
    description: 'Moto sportive Yamaha MT-07, noire, 8 500 km. Excellent état, révisions à jour, pneus neufs. Idéale pour débutant confirmé.',
    typeAnnonce: 'vente',
    categorieId: 'cat-transport',
    sousCategorieId: 'auto-moto',
    prix: 6800,
    ville: 'Toulouse',
    marque: 'Yamaha',
    annee: 2022,
    photos: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'],
    datePoster: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
    etat: 'acceptee'
  },

  // --- VÊTEMENTS (2 annonces) ---
  {
    id: 'a5',
    titre: 'Veste en cuir vintage',
    description: 'Veste en cuir véritable style vintage années 80, taille L, très peu portée. Couleur marron cognac, doublure satin.',
    typeAnnonce: 'vente',
    categorieId: 'cat-vetements',
    sousCategorieId: 'vet-homme',
    prix: 85,
    ville: 'Bordeaux',
    photos: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
    datePoster: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2',
    etat: 'acceptee'
  },
  {
    id: 'a6',
    titre: 'Robe de soirée élégante',
    description: 'Magnifique robe de soirée longue, taille 38, couleur bordeaux. Portée une seule fois, état neuf. Parfaite pour mariage ou gala.',
    typeAnnonce: 'vente',
    categorieId: 'cat-vetements',
    sousCategorieId: 'vet-femme',
    prix: 120,
    ville: 'Paris',
    photos: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'],
    datePoster: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2',
    etat: 'acceptee'
  },

  // --- ÉLECTRONIQUE (2 annonces) ---
  {
    id: 'a7',
    titre: 'iPhone 15 Pro Max 256Go',
    description: 'Le dernier iPhone 15 Pro Max, 256Go, Titane Naturel. Boîte scellée, jamais ouvert, facture fournie. Garantie Apple 2 ans.',
    typeAnnonce: 'vente',
    categorieId: 'cat-electronique',
    sousCategorieId: 'elec-tel',
    prix: 1250,
    ville: 'Lille',
    marque: 'Apple',
    annee: 2024,
    photos: ['https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80'],
    datePoster: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    etat: 'acceptee'
  },
  {
    id: 'a8',
    titre: 'MacBook Pro M3 14 pouces',
    description: 'MacBook Pro 2024 avec puce M3, 16Go RAM, 512Go SSD. Comme neuf, utilisé 2 mois. Facture et garantie Apple Care+ incluses.',
    typeAnnonce: 'vente',
    categorieId: 'cat-electronique',
    sousCategorieId: 'elec-pc',
    prix: 2100,
    ville: 'Marseille',
    marque: 'Apple',
    annee: 2024,
    photos: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'],
    datePoster: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
    etat: 'acceptee'
  },

  // --- BIJOUX (2 annonces) ---
  {
    id: 'a9',
    titre: 'Bague en Or 18k avec Diamant',
    description: 'Magnifique bague solitaire en or blanc 18 carats, diamant certifié 0.5 carat. Certificat GIA inclus. Écrin de luxe.',
    typeAnnonce: 'vente',
    categorieId: 'cat-bijoux',
    sousCategorieId: 'bij-bague',
    prix: 1500,
    ville: 'Strasbourg',
    photos: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
    datePoster: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    etat: 'acceptee'
  },
  {
    id: 'a10',
    titre: 'Collier Perles de Tahiti',
    description: 'Superbe collier en perles de Tahiti véritables, fermoir en or 18k. Longueur 45cm, perles de 9-10mm. Certificat d\'authenticité.',
    typeAnnonce: 'vente',
    categorieId: 'cat-bijoux',
    sousCategorieId: 'bij-collier',
    prix: 890,
    ville: 'Monaco',
    photos: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
    datePoster: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2',
    etat: 'acceptee'
  },

  // --- LIVRES (2 annonces) ---
  {
    id: 'a11',
    titre: 'Les Misérables - Édition Luxe',
    description: 'Édition prestigieuse du chef-d\'œuvre de Victor Hugo. Reliure cuir pleine fleur et dorures à l\'or fin. Collection Bibliothèque de la Pléiade.',
    typeAnnonce: 'vente',
    categorieId: 'cat-livres',
    sousCategorieId: 'liv-roman',
    prix: 85,
    ville: 'Nantes',
    photos: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'],
    datePoster: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    etat: 'acceptee'
  },
  {
    id: 'a12',
    titre: 'Collection Tintin intégrale',
    description: 'Collection complète des 24 albums de Tintin en excellent état. Éditions originales Casterman. Parfait pour collectionneurs.',
    typeAnnonce: 'vente',
    categorieId: 'cat-livres',
    sousCategorieId: 'liv-bd',
    prix: 320,
    ville: 'Rennes',
    photos: ['https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=800&q=80'],
    datePoster: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
    etat: 'acceptee'
  },
]
