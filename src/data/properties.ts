export interface Property {
  slug: string;
  title: string;
  location: string;
  city: string;
  price: string;
  priceRaw: number;
  type: 'Apartamento' | 'Casa' | 'Cobertura' | 'Terreno';
  badge: 'Destaque' | 'Exclusivo' | 'Novo' | null;
  badgeType: 'gold' | 'navy' | 'excl';
  beds: number;
  baths: number;
  area: number;
  gradient: string;
  image: string;
  gallery: string[];
  description: string;
  featured: boolean;
}

export const properties: Property[] = [
  {
    slug: 'apartamento-frente-mar-enseada',
    title: 'Apartamento Frente Mar — Enseada',
    location: 'Enseada',
    city: 'Guarujá, SP',
    price: 'R$ 1,85M',
    priceRaw: 1850000,
    type: 'Apartamento',
    badge: 'Destaque',
    badgeType: 'gold',
    beds: 3,
    baths: 2,
    area: 112,
    gradient: 'linear-gradient(145deg, #0d2848 0%, #081c34 55%, #122e56 100%)',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Apartamento de alto padrão com vista panorâmica para o mar. Acabamento premium, varanda gourmet e área de lazer completa no condomínio.',
    featured: true,
  },
  {
    slug: 'cobertura-riviera-sao-lourenco',
    title: 'Cobertura Duplex — Riviera',
    location: 'Riviera de São Lourenço',
    city: 'Bertioga, SP',
    price: 'R$ 3,20M',
    priceRaw: 3200000,
    type: 'Cobertura',
    badge: 'Exclusivo',
    badgeType: 'excl',
    beds: 4,
    baths: 4,
    area: 240,
    gradient: 'linear-gradient(155deg, #182808 0%, #0e1e05 55%, #223614 100%)',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Cobertura duplex exclusiva na Riviera, com piscina privativa, rooftop e vista 360° para o mar e a mata. Projeto assinado.',
    featured: true,
  },
  {
    slug: 'casa-condominio-guaruja',
    title: 'Casa em Condomínio Fechado',
    location: 'Jardim Acapulco',
    city: 'Guarujá, SP',
    price: 'R$ 2,40M',
    priceRaw: 2400000,
    type: 'Casa',
    badge: 'Novo',
    badgeType: 'navy',
    beds: 4,
    baths: 3,
    area: 320,
    gradient: 'linear-gradient(150deg, #08162a 0%, #050e1c 55%, #0e2238 100%)',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Casa em condomínio de alto padrão com segurança 24h, piscina, churrasqueira e amplo espaço de lazer. Bairro nobre de Guarujá.',
    featured: true,
  },
  {
    slug: 'apartamento-santos-gonzaga',
    title: 'Apartamento — Gonzaga',
    location: 'Gonzaga',
    city: 'Santos, SP',
    price: 'R$ 890K',
    priceRaw: 890000,
    type: 'Apartamento',
    badge: null,
    badgeType: 'gold',
    beds: 2,
    baths: 1,
    area: 78,
    gradient: 'linear-gradient(160deg, #28190a 0%, #180f05 55%, #382210 100%)',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Apartamento moderno no bairro Gonzaga, a 200m da praia. Reformado, mobiliado e pronto para morar. Infraestrutura completa na região.',
    featured: false,
  },
  {
    slug: 'terreno-riviera-premium',
    title: 'Terreno Premium — Riviera',
    location: 'Riviera de São Lourenço',
    city: 'Bertioga, SP',
    price: 'R$ 1,20M',
    priceRaw: 1200000,
    type: 'Terreno',
    badge: null,
    badgeType: 'gold',
    beds: 0,
    baths: 0,
    area: 600,
    gradient: 'linear-gradient(145deg, #0d2848 0%, #122e56 55%, #081c34 100%)',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Terreno plano em condomínio de alto padrão na Riviera. Topografia favorável, documentação completa. Ideal para construção de mansão ou projeto personalizado.',
    featured: false,
  },
  {
    slug: 'cobertura-enseada-triplex',
    title: 'Cobertura Triplex — Enseada',
    location: 'Enseada',
    city: 'Guarujá, SP',
    price: 'R$ 4,80M',
    priceRaw: 4800000,
    type: 'Cobertura',
    badge: 'Exclusivo',
    badgeType: 'excl',
    beds: 5,
    baths: 5,
    area: 380,
    gradient: 'linear-gradient(155deg, #0e2238 0%, #122848 55%, #06101e 100%)',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'Rara cobertura triplex frente ao mar na Enseada. Piscina privativa aquecida, home theater, adega climatizada e estacionamento para 4 carros.',
    featured: false,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
