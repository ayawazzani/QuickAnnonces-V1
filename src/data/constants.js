export const TYPES_ANNONCE = ['vente', 'location', 'service']

export const CATEGORIES = [
  {
    id: 'cat-immo', label: 'Immobilier', sous: [
      { id: 'immo-maison', label: 'Maison' },
      { id: 'immo-appartement', label: 'Appartement' },
    ]
  },
  {
    id: 'cat-transport', label: 'Transport', sous: [
      { id: 'auto-voiture', label: 'Voiture' },
      { id: 'auto-moto', label: 'Moto' },
    ]
  },
  {
    id: 'cat-vetements', label: 'Vêtements', sous: [
      { id: 'vet-homme', label: 'Homme' },
      { id: 'vet-femme', label: 'Femme' },
    ]
  },
  {
    id: 'cat-electronique', label: 'Électronique', sous: [
      { id: 'elec-tel', label: 'Téléphone' },
      { id: 'elec-pc', label: 'Ordinateur' },
    ]
  },
  {
    id: 'cat-bijoux', label: 'Bijoux', sous: [
      { id: 'bij-bague', label: 'Bague' },
      { id: 'bij-collier', label: 'Collier' },
    ]
  },
  {
    id: 'cat-livres', label: 'Livres', sous: [
      { id: 'liv-roman', label: 'Roman' },
      { id: 'liv-bd', label: 'BD' },
    ]
  },
]
