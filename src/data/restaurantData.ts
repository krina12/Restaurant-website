import heroImage from "../assets/images/hero_restaurant_interior_1793094172948.jpg";
import chefVegImage from "../assets/images/chef_veg_special_1793094909014.jpg";
import woodfireImage from "../assets/images/restaurant_woodfire_hearth_1793094174668.jpg";
import dessertImage from "../assets/images/restaurant_dessert_art_1793094174832.jpg";
import wineCellarImage from "../assets/images/restaurant_wine_cellar_1793094174995.jpg";

export const RESTAURANT_IMAGES = {
  hero: heroImage,
  chefVeg: chefVegImage,
  woodfire: woodfireImage,
  dessert: dessertImage,
  wineCellar: wineCellarImage,
};

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: "starters" | "mains" | "tasting" | "desserts" | "drinks";
  price: number;
  description: string;
  pairingNote?: string;
  dietary: ("100%-vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "chef-signature")[];
  origin?: string;
  calories?: string;
  image?: string;
}

export interface ChefSpecial {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  chefQuote: string;
  sommelierPairing: string;
  pairingVintage: string;
  flavorNotes: string[];
  ingredients: string[];
  technique: string;
  origin: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  occasion: string;
  comment: string;
  verified: boolean;
  dishRecommended?: string;
}

export interface CriticReview {
  id: string;
  outlet: string;
  critic: string;
  quote: string;
  ratingBadge: string;
  year: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  location: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  accolade: string;
}

export interface DirectionRoute {
  id: string;
  originName: string;
  distance: string;
  durationDrive: string;
  durationTransit: string;
  durationWalk?: string;
  instructions: string[];
}

export const RESTAURANT_INFO = {
  name: "Aurelia",
  legalName: "L'Atelier Aurelia Restaurant & Hearth LLC",
  tagline: "Woodfire Vegetarian Gastronomy & Coastal Terroir",
  address: "450 Heritage Quay Blvd, San Francisco, CA 94105",
  neighborhood: "Embarcadero Waterfront",
  phone: "+1 (415) 890-3400",
  email: "reservations@aureliasf.com",
  coordinates: {
    lat: 37.7915,
    lng: -122.3925
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=450+Heritage+Quay+Blvd+San+Francisco+CA+94105",
  hours: [
    { days: "Tuesday – Thursday", dinner: "5:00 PM – 10:30 PM", lounge: "4:30 PM – 11:30 PM" },
    { days: "Friday – Saturday", dinner: "4:30 PM – 11:30 PM", lounge: "4:00 PM – Midnight" },
    { days: "Sunday", dinner: "4:30 PM – 10:00 PM", lounge: "4:00 PM – 11:00 PM" },
    { days: "Monday", dinner: "Closed for botanical farm harvesting & cellar curation", lounge: "Closed" }
  ],
  dressCode: "Smart Elegant. Athletic wear, beachwear, and baseball caps are respectfully discouraged.",
  valet: "Complimentary private valet service available at the front entrance portico starting at 4:00 PM daily.",
  cancellationPolicy: "Reservations may be cancelled or modified up to 24 hours prior to service without penalty."
};

export const CHEF_SPECIALS: ChefSpecial[] = [
  {
    id: "maitake-sunchoke",
    title: "Hearth-Roasted Maitake & Truffled Sunchoke",
    subtitle: "Wood-fired maitake mushroom steak, caramelized sunchoke velouté, golden chanterelles & 24k gold leaf",
    price: 48,
    image: chefVegImage,
    chefQuote: "We roast wild maitake over cured red oak until the edges turn shatteringly crisp while retaining an earthy, unctuous center. It rests on an emulsion of slow-simmered winter sunchokes and foraged golden chanterelles.",
    sommelierPairing: "Domaine Leflaive Puligny-Montrachet 1er Cru",
    pairingVintage: "2021 Burgundy, France",
    flavorNotes: ["Smoky Umami", "Earthy Truffle", "Silken Hazelnut", "Saline Crisp"],
    ingredients: ["Sierra Wild Maitake", "Sebastopol Sunchokes", "Foraged Chanterelles", "Black Winter Truffle", "Cultured Brittany Butter"],
    technique: "Direct woodfire ember roast & low-temperature sunchoke reduction emulsion",
    origin: "Sierra Nevada Mycological Foragers & Little Organic Farm, Sebastopol"
  },
  {
    id: "woodfire-kabocha",
    title: "Kabocha Squash & Shaved Périgord Truffle",
    subtitle: "Ember-charred Japanese pumpkin, whipped almond ricotta, smoked sage reduction & candied pepitas",
    price: 44,
    image: woodfireImage,
    chefQuote: "The high natural sugar of Kabocha caramelizes into deep honeyed notes when exposed to 800°F almond wood heat. Shaved black truffle provides the perfect earthy counterpoint.",
    sommelierPairing: "Château de Beaucastel Châteauneuf-du-Pape Blanc",
    pairingVintage: "2020 Rhône, France",
    flavorNotes: ["Caramelized Pumpkin", "Forest Truffle", "Herbal Sage", "Toasted Nut"],
    ingredients: ["Heirloom Kabocha Squash", "Périgord Black Truffle", "Artisanal Almond Ricotta", "Wild Mountain Sage"],
    technique: "Direct hearth ember roasting with smoked sage oil infusion",
    origin: "Capay Valley Organic Farm & Northern California Foragers"
  },
  {
    id: "nocturne-valrhona",
    title: "Nocturne Valrhona & Smoked Blackberry",
    subtitle: "70% Guanaja chocolate sphere, wild Oregon blackberry coulis, roasted cocoa nibs & edible violas",
    price: 28,
    image: dessertImage,
    chefQuote: "Dessert should surprise both the eye and the spirit. The warm smoked fruit compote is poured tableside, collapsing the dark chocolate dome into a warm silken ganache.",
    sommelierPairing: "Taylor Fladgate 30 Year Old Tawny Port",
    pairingVintage: "Douro Valley, Portugal",
    flavorNotes: ["Bittersweet Cocoa", "Tart Wild Berry", "Smoky Oak", "Floral Violet"],
    ingredients: ["Valrhona 70% Guanaja", "Organic Oregon Blackberries", "Smoked Sea Salt", "Bourbon Vanilla Cream"],
    technique: "Hand-spun cocoa globe tempered to 0.8mm thickness with tableside warm pour",
    origin: "Tain-l'Hermitage, France & Willamette Valley Berry Farms"
  },
  {
    id: "cellar-flight",
    title: "Grand Reserve Sommelier Cellar Pairing",
    subtitle: "Five rare vintage botanical and biodynamic pours selected by Master Sommelier Camille Laurent",
    price: 135,
    image: wineCellarImage,
    chefQuote: "Our subterranean cellar houses over 2,200 curated labels dating back to 1961. This flight celebrates historic biodynamic estates whose terroir harmonizes seamlessly with plant-forward cuisine.",
    sommelierPairing: "Curated 5-course library flight including Grand Cru Champagne, Premier Cru & Vintage Port",
    pairingVintage: "Multi-Vintage Sommelier Selection",
    flavorNotes: ["Brioche & Minerals", "Aged Leather", "Black Currant", "Honeycomb"],
    ingredients: ["Rare Library Vintages", "Biodynamic Estate Releases", "Coravin-preserved collector bottles"],
    technique: "Temperature-regulated cellaring at 54°F and Riedel Sommeliers crystal service",
    origin: "Burgundy, Bordeaux, Napa Valley, Piedmont & Champagne"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Starters (100% Vegetarian)
  {
    id: "s1",
    name: "Heirloom Beet & Whipped Goat Curd Tartare",
    frenchName: "Tartare de Betteraves & Chèvre Cendré",
    category: "starters",
    price: 24,
    description: "Salt-baked golden and Chioggia beets, whipped Redwood Hill Farm goat curd, toasted pistachio praline, and aged sherry reduction.",
    pairingNote: "Sancerre Domaine Vacheron 2023",
    dietary: ["100%-vegetarian", "gluten-free", "chef-signature"],
    origin: "Sebastopol Organic Farms, CA",
    calories: "280 kcal"
  },
  {
    id: "s2",
    name: "King Oyster Carpaccio & Citrus Caviar",
    frenchName: "Carpaccio de Pleurotes du Panicaut",
    category: "starters",
    price: 26,
    description: "Thinly sliced wood-smoked king oyster mushrooms, Australian finger lime pearls, cold-pressed bergamot olive oil, and crispy caper berries.",
    pairingNote: "Chablis Premier Cru Fourchaume 2022",
    dietary: ["100%-vegetarian", "vegan", "gluten-free", "dairy-free", "chef-signature"],
    origin: "Sonoma Mountain Mycology",
    calories: "190 kcal"
  },
  {
    id: "s3",
    name: "Burrata di Bufala & Ember-Charred Figs",
    frenchName: "Burrata & Figues Noires au Feu de Bois",
    category: "starters",
    price: 27,
    description: "Creamy artisanal burrata, woodfire-blistered Black Mission figs, 25-year aged Modena balsamic, garden micro-basil, and grilled sourdough.",
    pairingNote: "Etna Bianco Tenuta delle Terre Nere 2022",
    dietary: ["100%-vegetarian"],
    origin: "Di Stefano Cheese & Brentwood Orchards",
    calories: "380 kcal"
  },
  {
    id: "s4",
    name: "Sonoma Sunchoke & Périgord Truffle Velouté",
    frenchName: "Velouté de Topinambour & Truffes Noires",
    category: "starters",
    price: 25,
    description: "Slow-simmered winter sunchoke silk, shaved black winter truffle, charred rosemary croutons, and cold-pressed hazelnut oil.",
    pairingNote: "Meursault Domaine des Comtes Lafon 2020",
    dietary: ["100%-vegetarian", "gluten-free"],
    origin: "Sonoma Coast Farms",
    calories: "240 kcal"
  },

  // Mains (100% Vegetarian)
  {
    id: "m1",
    name: "Hearth-Roasted Maitake Mushroom Steak",
    frenchName: "Steak de Pleurotes & Velouté de Topinambour",
    category: "mains",
    price: 48,
    description: "Charred Sierra maitake roasted over red oak embers, truffled sunchoke velouté, foraged golden chanterelles, and crispy samphire greens.",
    pairingNote: "Puligny-Montrachet Domaine Leflaive 2021",
    dietary: ["100%-vegetarian", "gluten-free", "chef-signature"],
    origin: "Sierra Nevada Mycological & Little Organic Farm",
    calories: "460 kcal"
  },
  {
    id: "m2",
    name: "Kabocha Squash & Shaved Périgord Truffle",
    frenchName: "Courge Kabocha au Feu de Bois & Truffes",
    category: "mains",
    price: 44,
    description: "Ember-charred Japanese pumpkin, almond ricotta, smoked sage reduction, crispy leek threads, and fresh black truffle carpaccio.",
    pairingNote: "Châteauneuf-du-Pape Blanc Beaucastel 2020",
    dietary: ["100%-vegetarian", "vegan", "gluten-free", "dairy-free", "chef-signature"],
    origin: "Capay Valley Organic Farm",
    calories: "420 kcal"
  },
  {
    id: "m3",
    name: "Black Truffle & Ricotta Agnolotti",
    frenchName: "Agnolotti aux Truffes Noires & Maïs Doux",
    category: "mains",
    price: 46,
    description: "Handmade folded pasta pockets filled with Bellwether Farms ricotta, sweet Brentwood corn broth, chive oil, and shaved Italian summer truffles.",
    pairingNote: "Barolo Vietti Castiglione 2018",
    dietary: ["100%-vegetarian"],
    origin: "Bellwether Farms, Sonoma County",
    calories: "530 kcal"
  },
  {
    id: "m4",
    name: "Charred Romanesco & Chanterelle Fricassee",
    frenchName: "Romanesco Braisé & Girolles Poêlées",
    category: "mains",
    price: 39,
    description: "Whole roasted romanesco hearth-steamed over almond embers, sautéed golden chanterelles, hazelnut emulsion, and preserved Meyer lemon.",
    pairingNote: "Riesling Grand Cru Schlossberg 2021",
    dietary: ["100%-vegetarian", "vegan", "gluten-free", "dairy-free"],
    origin: "Capay Valley Organics",
    calories: "360 kcal"
  },
  {
    id: "m5",
    name: "Wild Morel & Porcini Risotto",
    frenchName: "Risotto aux Morilles & Cèpes de Montagne",
    category: "mains",
    price: 45,
    description: "Acquerello aged carnaroli rice, slow-simmered forest mushroom broth, foraged Sierra morels, and 36-month Parmigiano Reggiano crisp.",
    pairingNote: "Brunello di Montalcino Biondi-Santi 2016",
    dietary: ["100%-vegetarian", "gluten-free", "chef-signature"],
    origin: "Acquerello Estate & Sierra Wild Harvesters",
    calories: "510 kcal"
  },

  // Tasting Menu Items (100% Vegetarian)
  {
    id: "t1",
    name: "8-Course Botanical & Mycological Hearth Tasting",
    frenchName: "Menu Dégustation Végétal en Huit Services",
    category: "tasting",
    price: 175,
    description: "An evolutionary culinary journey celebrating organic California heirloom harvests, wild Sierra mushrooms, and hearth alchemy. Sommelier biodynamic wine pairing optional (+ $135).",
    pairingNote: "Full sommelier biodynamic cellar pairing available",
    dietary: ["100%-vegetarian", "chef-signature"],
    origin: "Curated Daily by Executive Chef Elena Rostova",
    calories: "Tasting Experience"
  },
  {
    id: "t2",
    name: "White Truffle & Foraged Mushroom Service",
    frenchName: "Service de Truffes Blanches d'Alba",
    category: "tasting",
    price: 120,
    description: "Generous tableside shaving of Alba white truffles over cultured butter hand-cut tajarin or creamy polenta with sea salt crystals.",
    pairingNote: "Gaja Barbaresco 2017",
    dietary: ["100%-vegetarian", "chef-signature"],
    origin: "Alba, Piedmont, Italy",
    calories: "340 kcal"
  },

  // Desserts (100% Vegetarian)
  {
    id: "d1",
    name: "Nocturne Valrhona & Smoked Blackberry",
    frenchName: "Sphère Noire au Chocolat Guanaja",
    category: "desserts",
    price: 28,
    description: "70% Guanaja chocolate sphere, wild blackberry coulis poured warm tableside, roasted cocoa nib brittle, vanilla fleur de sel.",
    pairingNote: "Taylor Fladgate 30 Year Tawny Port",
    dietary: ["100%-vegetarian", "chef-signature"],
    origin: "Tain-l'Hermitage & Willamette Valley",
    calories: "450 kcal"
  },
  {
    id: "d2",
    name: "Meyer Lemon Meringue & Thyme Sorbet",
    frenchName: "Tarte au Citron Déstructurée",
    category: "desserts",
    price: 22,
    description: "Deconstructed Meyer lemon curd, torched Swiss meringue, almond sablé crumble, and garden thyme sorbet.",
    pairingNote: "Château d'Yquem Sauternes 2017",
    dietary: ["100%-vegetarian"],
    origin: "Carmel Valley Citrus Groves",
    calories: "320 kcal"
  },
  {
    id: "d3",
    name: "Artisanal Fromage Cart & Honeycomb",
    frenchName: "Plateau de Fromages Affinés",
    category: "desserts",
    price: 26,
    description: "Five cave-aged European and Californian raw milk vegetarian cheeses, wild mountain honeycomb, walnut bread, and quince paste.",
    pairingNote: "Châteauneuf-du-Pape Clos des Papes 2018",
    dietary: ["100%-vegetarian"],
    origin: "Point Reyes, Comte Jura, & Roquefort-sur-Soulzon",
    calories: "390 kcal"
  },

  // Cocktails & Drinks (100% Vegetarian / Plant-Based)
  {
    id: "c1",
    name: "The Ember & Old Fashioned",
    category: "drinks",
    price: 24,
    description: "WhistlePig 10-Year Rye, charred almond syrup, Angostura & orange bitters, smoked with applewood under glass cloche.",
    dietary: ["100%-vegetarian", "vegan", "dairy-free", "gluten-free", "chef-signature"],
    calories: "190 kcal"
  },
  {
    id: "c2",
    name: "Aurelia Golden Spritz",
    category: "drinks",
    price: 22,
    description: "Yellow Chartreuse, Italicus bergamot liqueur, clarified Meyer lemon, Brut Champagne, 24k gold shimmer.",
    dietary: ["100%-vegetarian", "vegan", "dairy-free", "gluten-free"],
    calories: "160 kcal"
  },
  {
    id: "c3",
    name: "Coastal Pine & Smoked Juniper (Zero Proof)",
    category: "drinks",
    price: 18,
    description: "Botanical distillate, Douglas fir syrup, tonic water, toasted rosemary sprig, and charred grapefruit peel.",
    dietary: ["100%-vegetarian", "vegan", "dairy-free", "gluten-free"],
    calories: "65 kcal"
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "r1",
    author: "Eleanor Vance-Sterling",
    location: "Pacific Heights, SF",
    date: "October 18, 2026",
    rating: 5,
    occasion: "20th Anniversary",
    comment: "A breathtaking vegetarian revelation! The hearth-roasted maitake prepared over live almond wood coals was transcendental, and Camille's biodynamic wine pairings were sublime. Table 14 overlooking the bay was perfection.",
    verified: true,
    dishRecommended: "Hearth-Roasted Maitake Mushroom Steak"
  },
  {
    id: "r2",
    author: "Marcus Chen",
    location: "New York, NY",
    date: "October 12, 2026",
    rating: 5,
    occasion: "Chef's Counter Experience",
    comment: "Sitting at the counter watching Chef Elena craft plant-forward haute cuisine over open flames is pure artistry. The Sunchoke Velouté and the Morel Risotto were both unforgettable. Truly a global benchmark for vegetarian fine dining.",
    verified: true,
    dishRecommended: "Wild Morel & Porcini Risotto"
  },
  {
    id: "r3",
    author: "Sophia & Julian Ross",
    location: "London, UK",
    date: "September 29, 2026",
    rating: 5,
    occasion: "Botanical Tasting Menu",
    comment: "We flew in from London and booked Aurelia specifically for their 100% vegetarian hearth tasting. The tableside Valrhona chocolate sphere was theatrical and delicious. Flawless hospitality.",
    verified: true,
    dishRecommended: "Nocturne Valrhona & Smoked Blackberry"
  },
  {
    id: "r4",
    author: "David K. Lindqvist",
    location: "Marin County, CA",
    date: "September 15, 2026",
    rating: 5,
    occasion: "Executive Business Dinner",
    comment: "Hosted six international partners in the Private Wine Vault. The botanical menu astonished everyone—no one missed meat for a second. The depth of flavor extracted from wood-charred vegetables is astonishing.",
    verified: true,
    dishRecommended: "Kabocha Squash & Shaved Périgord Truffle"
  },
  {
    id: "r5",
    author: "Amira Patel",
    location: "San Jose, CA",
    date: "August 28, 2026",
    rating: 5,
    occasion: "Birthday Celebration",
    comment: "As a lifelong vegetarian, dining at Aurelia brought tears to my eyes. A Michelin-level dining experience where every single dish is crafted with reverence for vegetables, fungi, and fire.",
    verified: true,
    dishRecommended: "Charred Romanesco & Chanterelle Fricassee"
  }
];

export const CRITIC_REVIEWS: CriticReview[] = [
  {
    id: "c-1",
    outlet: "The Michelin Guide",
    critic: "Inspectors' Verdict",
    quote: "Aurelia elevates pure vegetarian cooking to the highest zenith of world gastronomy. Chef Elena Rostova coaxing smoky depths from wild mushrooms and California heirlooms over almond wood is transcendent.",
    ratingBadge: "Two Michelin Stars · Green Star",
    year: "2026 Edition"
  },
  {
    id: "c-2",
    outlet: "San Francisco Chronicle",
    critic: "Soleil Ho & Editorial Board",
    quote: "San Francisco's most thrilling restaurant happens to be completely vegetarian. The hearth-roasted maitake steak and white truffle service redefine what luxury dining means today.",
    ratingBadge: "Critic's Choice · 4/4 Stars",
    year: "Autumn 2026"
  },
  {
    id: "c-3",
    outlet: "Wine Spectator",
    critic: "Grand Award Panel",
    quote: "With over 2,200 biodynamic and classic selections preserved in an architectural vault, Aurelia harmonizes fine wine with vegetarian gastronomy like nowhere else on earth.",
    ratingBadge: "Grand Award Winner",
    year: "2025 – 2026"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "The Main Dining Room at Dusk",
    category: "Atmosphere",
    image: heroImage,
    caption: "Architectural timber tables and glowing amber candles overlooking San Francisco Bay."
  },
  {
    id: "g2",
    title: "Wood-Fired Maitake Mushroom Steak Plating",
    category: "Culinary Art",
    image: "/src/assets/images/chef_veg_special_1793094909014.jpg",
    caption: "Ember-roasted wild maitake, truffled sunchoke velouté, golden chanterelles, and edible gold leaf."
  },
  {
    id: "g3",
    title: "The Live Fire Hearth in Motion",
    category: "The Kitchen",
    image: "/src/assets/images/restaurant_woodfire_hearth_1793094174668.jpg",
    caption: "Executive Chef Elena Rostova and the brigade executing service by open fire."
  },
  {
    id: "g4",
    title: "Tableside Valrhona Sphere Pour",
    category: "Culinary Art",
    image: "/src/assets/images/restaurant_dessert_art_1793094174832.jpg",
    caption: "Hand-spun 70% Guanaja chocolate sphere with warm smoked berry coulis."
  },
  {
    id: "g5",
    title: "The Subterranean Wine Vault",
    category: "The Wine Cellar",
    image: "/src/assets/images/restaurant_wine_cellar_1793094174995.jpg",
    caption: "Private dining room seating up to 14 guests amidst 2,200 collector vintages."
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1988",
    title: "The Botanical Hearth in St. Germain",
    description: "Master Chef Henri Aurelia opened a 24-seat atelier in Paris, introducing open-fire grilling to market vegetables and foraged wild fungi.",
    location: "Rue de Seine, Paris"
  },
  {
    year: "2004",
    title: "The California Coast Migration",
    description: "Captivated by Northern California's organic farms and biodynamic growers, the Aurelia family relocated to the historic Embarcadero waterfront.",
    location: "San Francisco, CA"
  },
  {
    year: "2015",
    title: "Michelin Distinction & The Vault",
    description: "Awarded its first Michelin star and unveiled the architectural subterranean wine cellar curated by European master sommeliers.",
    location: "Heritage Quay"
  },
  {
    year: "2021",
    title: "Chef Elena Rostova Takes the Helm",
    description: "Following tenures at Arpège and Geranium, Chef Elena Rostova pivoted Aurelia into a 100% vegetarian & plant-forward woodfire temple.",
    location: "Kitchen Leadership"
  },
  {
    year: "2026",
    title: "The Modern Chapter & Two Stars + Green Star",
    description: "Celebrated with Two Michelin Stars and a Michelin Green Star for sustainable fine dining and revolutionary plant gastronomy.",
    location: "Today"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Elena Rostova",
    role: "Executive Chef & Partner",
    bio: "Trained under vegetable maestro Alain Passard in Paris. Elena brings an obsession with fire, wild forest mushrooms, and biodynamic California produce.",
    accolade: "James Beard Best Chef West Nominee 2025 · Michelin Green Star"
  },
  {
    name: "Camille Laurent",
    role: "Head Sommelier & Cellar Master",
    bio: "Former Head Sommelier at Le Meurice. Camille oversees our 2,200-bottle cellar, harmonizing biodynamic vintages with vegetable terroir.",
    accolade: "Master Sommelier & Wine Spectator Grand Award"
  },
  {
    name: "Mathieu Delacroix",
    role: "Executive Pastry Chef",
    bio: "Master patissier from Lyon specializing in architectural confections, wild fruit fermentations, and structural tableside presentations.",
    accolade: "World Pastry Cup Silver Medalist"
  }
];

export const DIRECTION_ROUTES: DirectionRoute[] = [
  {
    id: "sfo",
    originName: "San Francisco International Airport (SFO)",
    distance: "14.2 miles",
    durationDrive: "22 mins",
    durationTransit: "38 mins (BART to Embarcadero)",
    instructions: [
      "Take US-101 N toward San Francisco (approx. 11 miles).",
      "Take Exit 433B for I-80 E toward the Bay Bridge / Downtown.",
      "Take the 4th Street exit and turn left onto Bryant Street.",
      "Proceed to The Embarcadero and turn left onto Heritage Quay Blvd.",
      "Arrive at 450 Heritage Quay Blvd; valet attendants will receive your vehicle."
    ]
  },
  {
    id: "union-square",
    originName: "Union Square / Downtown Hotels",
    distance: "1.1 miles",
    durationDrive: "6 mins",
    durationTransit: "9 mins (California St Cable Car / F-Line)",
    durationWalk: "18 mins scenic walk",
    instructions: [
      "Head east on Market Street toward The Embarcadero.",
      "Turn right onto Steuart Street, then left onto Heritage Quay Blvd.",
      "The entrance is located across from the historic Marina Pier."
    ]
  },
  {
    id: "bay-bridge",
    originName: "East Bay / Oakland via Bay Bridge (I-80 W)",
    distance: "7.8 miles",
    durationDrive: "14 mins",
    durationTransit: "20 mins (BART to Embarcadero)",
    instructions: [
      "Cross the Bay Bridge (I-80 W) into San Francisco.",
      "Take the Fremont Street exit (first exit off the bridge).",
      "Turn right onto Mission Street, then right onto The Embarcadero.",
      "Turn right onto Heritage Quay Blvd. Complimentary valet is on your right."
    ]
  }
];
