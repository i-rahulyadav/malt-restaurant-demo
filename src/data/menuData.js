const createConceptImage = (title, subtitle, accent = '#d4af37') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#191310" />
          <stop offset="55%" stop-color="#0f0c0a" />
          <stop offset="100%" stop-color="#241a14" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.34" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="350" cy="220" r="320" fill="url(#glow)" />
      <circle cx="910" cy="700" r="260" fill="rgba(127,57,64,0.18)" />
      <path d="M160 690c100-150 240-220 420-220s320 70 460 220" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round" />
      <rect x="120" y="660" width="960" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      <text x="120" y="220" fill="#f4eee7" font-family="Georgia, serif" font-size="72" font-weight="700">${title}</text>
      <text x="120" y="290" fill="#d9c9ba" font-family="Inter, Arial, sans-serif" font-size="30" letter-spacing="5">${subtitle}</text>
      <text x="120" y="392" fill="#f1d27c" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="4">CONCEPT IMAGE • EDITABLE SAMPLE</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const menuCategories = ['All', 'Food', 'Pizza', 'Momos', 'Vegetarian', 'Beverages'];

export const heroImage = createConceptImage('MALT', 'Fine dining concept hero', '#f1d27c');

export const aboutImage = createConceptImage('MALT INTERIOR', 'Premium lounge and dining mood', '#d4af37');

export const menuItems = [
  {
    name: 'Paneer Tikka',
    category: 'Food',
    description: 'Smoky concept presentation for a classic paneer favorite.',
    image: createConceptImage('Paneer Tikka', 'Sample food card', '#d4af37'),
    priceLabel: 'Price to be confirmed',
    vegetarian: true,
  },
  {
    name: 'Jhol Momos',
    category: 'Momos',
    description: 'A warm, comforting momo concept shown in a rich broth style.',
    image: createConceptImage('Jhol Momos', 'Concept menu image', '#f1d27c'),
    priceLabel: 'Price to be confirmed',
  },
  {
    name: 'Kothey Momos',
    category: 'Momos',
    description: 'Golden steamed-and-pan-finished momos for the menu demo.',
    image: createConceptImage('Kothey Momos', 'Concept menu image', '#c78d4c'),
    priceLabel: 'Price to be confirmed',
  },
  {
    name: 'Margherita Pizza',
    category: 'Pizza',
    description: 'Classic pizza styling with basil, tomato, and mozzarella tones.',
    image: createConceptImage('Margherita Pizza', 'Concept menu image', '#d4af37'),
    priceLabel: 'Price to be confirmed',
    vegetarian: true,
  },
  {
    name: 'Mushroom and Paneer Masala',
    category: 'Vegetarian',
    description: 'A rich vegetarian curry concept with layered spices and texture.',
    image: createConceptImage('Paneer Masala', 'Concept menu image', '#7f3940'),
    priceLabel: 'Price to be confirmed',
    vegetarian: true,
  },
  {
    name: 'Chinese Bhel',
    category: 'Food',
    description: 'Crisp, colorful street-style fusion presented for the demo.',
    image: createConceptImage('Chinese Bhel', 'Concept menu image', '#f1d27c'),
    priceLabel: 'Price to be confirmed',
    vegetarian: true,
  },
  {
    name: 'Chocolate Frappe',
    category: 'Beverages',
    description: 'A chilled cafe-style drink concept with decadent dessert notes.',
    image: createConceptImage('Chocolate Frappe', 'Concept beverage image', '#c78d4c'),
    priceLabel: 'Price to be confirmed',
  },
  {
    name: 'Pau Bhaji',
    category: 'Food',
    description: 'Warm, hearty comfort food captured as a polished concept card.',
    image: createConceptImage('Pau Bhaji', 'Concept menu image', '#d4af37'),
    priceLabel: 'Price to be confirmed',
    vegetarian: true,
  },
];

export const galleryItems = [
  {
    category: 'Food',
    title: 'Concept Food Styling',
    image: createConceptImage('Food Styling', 'Gallery concept', '#d4af37'),
  },
  {
    category: 'Drinks',
    title: 'Concept Lounge Drinks',
    image: createConceptImage('Lounge Drinks', 'Gallery concept', '#f1d27c'),
  },
  {
    category: 'Interior',
    title: 'Atmospheric Interior Mood',
    image: createConceptImage('Interior Mood', 'Gallery concept', '#7f3940'),
  },
  {
    category: 'Events',
    title: 'Live Music Concept',
    image: createConceptImage('Live Music', 'Gallery concept', '#c78d4c'),
  },
  {
    category: 'Food',
    title: 'Fine Dining Detail',
    image: createConceptImage('Fine Dining', 'Gallery concept', '#d4af37'),
  },
  {
    category: 'Drinks',
    title: 'Evening Service Mood',
    image: createConceptImage('Evening Service', 'Gallery concept', '#f1d27c'),
  },
];

export const experienceItems = [
  {
    title: 'Fine Dining',
    description: 'A polished concept for a premium restaurant experience and refined presentation.',
  },
  {
    title: 'Lounge Atmosphere',
    description: 'A warm, low-light mood that suggests relaxed dinners and evening gatherings.',
  },
  {
    title: 'Live Music',
    description: 'An elegant entertainment concept with room for confirmed programming later.',
  },
  {
    title: 'Family Gatherings',
    description: 'A welcoming setting for celebrations, dinners, and everyday meetups.',
  },
];
