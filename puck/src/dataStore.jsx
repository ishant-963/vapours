import React, { createContext, useContext, useReducer, useCallback, useState } from "react";

/**
 * =============================================================================
 * CENTRAL PROJECT DATA & STATE STORE
 * Assimilates all configurations, universes, characters, media, articles,
 * queries, and plain React Context/hooks into a single beginner-friendly file.
 *
 * HOW THIS WORKS (for beginners):
 * ───────────────────────────────
 * Instead of Zustand (an external library), we use React's built-in tools:
 *
 *   1. createContext()  → creates a "mailbox" that child components can read
 *   2. useContext()     → lets any child component read from that mailbox
 *   3. useReducer()     → like useState but better for complex state changes
 *   4. useCallback()    → prevents unnecessary re-renders
 *
 * We define two "Providers" at the bottom of this file:
 *   • LibraryProvider  → wraps the app so any component can bookmark items
 *   • SearchProvider   → wraps the app so any component can open/close search
 *
 * Then we export custom hooks (useLibrary, useSearch) that components call
 * to read state and trigger actions. It's the same idea as Zustand, just
 * with plain React.
 * =============================================================================
 */

// 1. SITE CONFIGURATION
export const siteConfig = {
  "name": "Loreverse",
  "tagline": "The Multi-Universe Wiki & Entertainment Discovery Archive",
  "description": "An interconnected encyclopedia uniting cinematic universes, anime, manga, novels, and fictional lore.",
  "author": "Loreverse Editorial Board",
  "version": "1.0.0",
  "navigation": [
    {
      "label": "Explore",
      "path": "/explore"
    },
    {
      "label": "Universes",
      "path": "/universes"
    },
    {
      "label": "Cinema & Series",
      "path": "/movies"
    },
    {
      "label": "Anime & Manga",
      "path": "/anime"
    },
    {
      "label": "Novels & Books",
      "path": "/books"
    },
    {
      "label": "Characters",
      "path": "/characters"
    },
    {
      "label": "Cyberfiction",
      "path": "/cyberfiction"
    },
    {
      "label": "My Library",
      "path": "/library"
    }
  ],
  "mediaCategories": [
    {
      "id": "movie",
      "label": "Movies",
      "path": "/movies",
      "icon": "Film"
    },
    {
      "id": "series",
      "label": "TV Series",
      "path": "/series",
      "icon": "Tv"
    },
    {
      "id": "anime",
      "label": "Anime",
      "path": "/anime",
      "icon": "Sparkles"
    },
    {
      "id": "manga",
      "label": "Manga",
      "path": "/manga",
      "icon": "BookOpen"
    },
    {
      "id": "manhwa",
      "label": "Manhwa",
      "path": "/manhwa",
      "icon": "Layers"
    },
    {
      "id": "novel",
      "label": "Novels & Webnovels",
      "path": "/novels",
      "icon": "Scroll"
    },
    {
      "id": "book",
      "label": "Books",
      "path": "/books",
      "icon": "Library"
    },
    {
      "id": "cyberfiction",
      "label": "Cyberfiction",
      "path": "/cyberfiction",
      "icon": "Sparkles"
    }
  ],
  "features": {
    "enableLocalLibrary": true,
    "enableFuzzySearch": true
  }
};

// 2. CONTINUITY TYPES & UNIVERSE CONFIG
export const continuityTypes = {
  "CANON": "Prime Canon",
  "CINEMATIC": "Cinematic Continuity",
  "EXPANDED": "Expanded Universe / Legends",
  "ADAPTATION": "Adaptation / Spin-Off",
  "ORIGINAL": "Original Fiction"
};
export const universeConfig = {
  "marvel-cinematic-universe": {
    "displayName": "Marvel Cinematic Universe",
    "continuity": "Cinematic Continuity",
    "accentColor": "#B89545"
  },
  "dc-multiverse": {
    "displayName": "DC Multiverse",
    "continuity": "Expanded Universe / Legends",
    "accentColor": "#92702C"
  },
  "star-wars": {
    "displayName": "Star Wars",
    "continuity": "Prime Canon",
    "accentColor": "#B89545"
  },
  "wizarding-world": {
    "displayName": "Wizarding World",
    "continuity": "Prime Canon",
    "accentColor": "#B89545"
  },
  "solo-leveling": {
    "displayName": "Solo Leveling / Shadow Monarch Realm",
    "continuity": "Prime Canon",
    "accentColor": "#92702C"
  },
  "attack-on-titan": {
    "displayName": "Attack on Titan (Paradis & Marley)",
    "continuity": "Prime Canon",
    "accentColor": "#B89545"
  },
  "one-piece": {
    "displayName": "One Piece World",
    "continuity": "Prime Canon",
    "accentColor": "#B89545"
  },
  "miraheze-fiction-hub": {
    "displayName": "Miraheze Fiction Vault",
    "continuity": "Original Fiction",
    "accentColor": "#92702C"
  },
  "cyberfiction-metaverse": {
    "displayName": "Cyberfiction Metaverse & Web3 Realm",
    "continuity": "Original Fiction",
    "accentColor": "#00F0FF"
  }
};

// 3. CURATED UNIVERSES DATA
export const universesData = [
  {
    "id": "cyberfiction",
    "slug": "cyberfiction-metaverse",
    "name": "Cyberfiction Metaverse",
    "creator": "Cyberfiction Collective",
    "debutYear": 2024,
    "category": "Cyberfiction & Virtual Reality",
    "tagline": "Cyberfiction is the real story in the metaverse.",
    "description": "Cyberfiction aims to be a decentralized community that can create new values and profits through play in the virtual world. Beyond competition, creators and players build, take chances, and maintain good humanity across infinite digital horizons.",
    "bannerImage": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "Cyberfield Pioneers",
        "description": "Decentralized explorers inhabiting virtual frontier spaces."
      },
      {
        "name": "Avatar Architects",
        "description": "Creators crafting 3D consciousness containers and neural simulations."
      },
      {
        "name": "Humanity Keepers",
        "description": "Guardians preserving empathy, art, and community across the metaverse."
      }
    ],
    "timeline": [
      {
        "year": "Genesis",
        "event": "The 300-frame digital consciousness scans synchronize in the Cyberfield."
      },
      {
        "year": "Epoch 1",
        "event": "Cyberfiction community establishes open metaverse playground protocol."
      },
      {
        "year": "Epoch 2",
        "event": "Cross-dimensional convergence unites synthetic avatars and digital storytellers."
      }
    ],
    "featured": true,
    "mediaCount": 6,
    "characterCount": 10
  },
  {
    "id": "mcu",
    "slug": "marvel-cinematic-universe",
    "name": "Marvel Cinematic Universe",
    "creator": "Marvel Studios / Stan Lee, Jack Kirby",
    "debutYear": 2008,
    "category": "Cinematic Universe",
    "tagline": "Earth's Mightiest Heroes and the Multiverse Saga.",
    "description": "An American media franchise and shared universe centered on a series of superhero films and television series produced by Marvel Studios. The franchise has expanded to include comic books, short films, digital series, and television series exploring heroes across space, time, and alternate dimensions.",
    "bannerImage": "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "The Avengers",
        "description": "Earth's premier superhero team formed by S.H.I.E.L.D."
      },
      {
        "name": "S.H.I.E.L.D.",
        "description": "Strategic Homeland Intervention, Enforcement, and Logistics Division."
      },
      {
        "name": "Masters of the Mystic Arts",
        "description": "Order of sorcerers guarding Earth from interdimensional threats."
      },
      {
        "name": "Guardians of the Galaxy",
        "description": "Intergalactic outlaws turned protectors of the cosmos."
      }
    ],
    "timeline": [
      {
        "year": "1942",
        "event": "Project Rebirth creates Captain America."
      },
      {
        "year": "2008",
        "event": "Tony Stark reveals himself as Iron Man."
      },
      {
        "year": "2012",
        "event": "The Battle of New York unites the Avengers."
      },
      {
        "year": "2018",
        "event": "Thanos snaps half of all life out of existence."
      },
      {
        "year": "2023",
        "event": "The Time Heist restores the fallen universe."
      }
    ],
    "featured": true,
    "mediaCount": 34,
    "characterCount": 68
  },
  {
    "id": "star-wars",
    "slug": "star-wars",
    "name": "Star Wars",
    "creator": "George Lucas",
    "debutYear": 1977,
    "category": "Space Opera & Mythos",
    "tagline": "A long time ago in a galaxy far, far away...",
    "description": "An epic space-opera multimedia franchise created by George Lucas. It depicts the adventures of characters in a galaxy where the Force—a ubiquitous energy field generated by all living beings—binds all things and grants Jedi and Sith supernatural abilities.",
    "bannerImage": "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "The Jedi Order",
        "description": "Ancient monastic order devoted to the light side of the Force."
      },
      {
        "name": "The Sith",
        "description": "Wielders of the dark side seeking absolute dominance."
      },
      {
        "name": "Galactic Empire",
        "description": "Authoritarian regime engineered by Emperor Palpatine."
      },
      {
        "name": "Rebel Alliance",
        "description": "Coalition of freedom fighters restoring the Republic."
      }
    ],
    "timeline": [
      {
        "year": "32 BBY",
        "event": "The Trade Federation blockades Naboo."
      },
      {
        "year": "19 BBY",
        "event": "Order 66 executed; rise of the Galactic Empire."
      },
      {
        "year": "0 BBY",
        "event": "Destruction of the first Death Star at the Battle of Yavin."
      },
      {
        "year": "4 ABY",
        "event": "Defeat of the Emperor at the Battle of Endor."
      }
    ],
    "featured": true,
    "mediaCount": 12,
    "characterCount": 52
  },
  {
    "id": "solo-leveling",
    "slug": "solo-leveling",
    "name": "Solo Leveling (Shadow Monarch)",
    "creator": "Chugong, DUBU (Redice Studio)",
    "debutYear": 2016,
    "category": "Manhwa & Webnovel",
    "tagline": "Arise. The awakening of the world's weakest hunter.",
    "description": "A South Korean web novel written by Chugong and illustrated by DUBU. Set in a world where mysterious 'Gates' connect the human realm with dungeons full of monsters, certain humans awakened superhuman powers to combat them. Sung Jinwoo, notoriously known as the Weakest Hunter, is chosen by an enigmatic 'System' granting him unprecedented leveling capabilities.",
    "bannerImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "Shadow Army",
        "description": "Resurrected spirit soldiers summoned and commanded by the Shadow Monarch."
      },
      {
        "name": "Korean Hunters Association",
        "description": "Governing body regulating awakened hunters and raid permits."
      },
      {
        "name": "The Rulers",
        "description": "Ancient beings of light fighting the primordial Monarchs."
      },
      {
        "name": "The Monarchs",
        "description": "Lords of calamity born from the darkness to eradicate human realms."
      }
    ],
    "timeline": [
      {
        "year": "Year 0",
        "event": "First Gates appear worldwide; human awakening occurs."
      },
      {
        "year": "Year 10",
        "event": "Sung Jinwoo enters the Double Dungeon in D-Rank raid."
      },
      {
        "year": "Year 11",
        "event": "Sung Jinwoo awakens as the Player and overcomes the Job Quest."
      },
      {
        "year": "Year 12",
        "event": "The Shadow Monarch descends to protect the world."
      }
    ],
    "featured": true,
    "mediaCount": 4,
    "characterCount": 24
  },
  {
    "id": "attack-on-titan",
    "slug": "attack-on-titan",
    "name": "Attack on Titan",
    "creator": "Hajime Isayama",
    "debutYear": 2009,
    "category": "Anime & Manga",
    "tagline": "If you win, you live. If you don't fight, you can't win.",
    "description": "A dark fantasy manga and anime series written and illustrated by Hajime Isayama. Humans live inside concentric circular walls to shield themselves from gigantic man-eating humanoids known as Titans. The discovery of the true history of the world plunges the survivors into war across continental borders.",
    "bannerImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "Survey Corps (Scouts)",
        "description": "Branch of the military exploring beyond the walls."
      },
      {
        "name": "Garrison Regiment",
        "description": "Forces maintaining the defensive perimeter of the walls."
      },
      {
        "name": "Military Police",
        "description": "Guards serving the royal family within Wall Sina."
      },
      {
        "name": "Marleyan Warrior Unit",
        "description": "Eldian conscripts chosen to wield Titan powers for Marley."
      }
    ],
    "timeline": [
      {
        "year": "Year 743",
        "event": "King Fritz builds the three concentric walls on Paradis."
      },
      {
        "year": "Year 845",
        "event": "Colossal Titan breaches Wall Maria at Shiganshina."
      },
      {
        "year": "Year 850",
        "event": "Battle of Trost District; Eren transforms into the Attack Titan."
      },
      {
        "year": "Year 854",
        "event": "The Raid on Liberio and awakening of the Rumbling."
      }
    ],
    "featured": true,
    "mediaCount": 6,
    "characterCount": 38
  },
  {
    "id": "wizarding-world",
    "slug": "wizarding-world",
    "name": "Wizarding World",
    "creator": "J.K. Rowling",
    "debutYear": 1997,
    "category": "Literature & Fantasy",
    "tagline": "Where magic is real and darkness lurks beneath the surface.",
    "description": "A fantasy media franchise and shared universe centered on the Harry Potter novel series and related films. It details the lives of young wizards at Hogwarts School of Witchcraft and Wizardry and their conflict against the dark wizard Lord Voldemort.",
    "bannerImage": "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "Order of the Phoenix",
        "description": "Secret society founded by Albus Dumbledore to oppose Voldemort."
      },
      {
        "name": "Death Eaters",
        "description": "Pure-blood supremacist wizards following Lord Voldemort."
      },
      {
        "name": "Ministry of Magic",
        "description": "Governmental authority regulating magical society in Britain."
      },
      {
        "name": "Dumbledore's Army",
        "description": "Student resistance group practicing defensive magic."
      }
    ],
    "timeline": [
      {
        "year": "1981",
        "event": "Voldemort attacks the Potters; the Boy Who Lived survives."
      },
      {
        "year": "1991",
        "event": "Harry Potter starts his first year at Hogwarts."
      },
      {
        "year": "1995",
        "event": "Voldemort returns to bodily form in Little Hangleton."
      },
      {
        "year": "1998",
        "event": "The Battle of Hogwarts ends the Second Wizarding War."
      }
    ],
    "featured": true,
    "mediaCount": 11,
    "characterCount": 45
  },
  {
    "id": "one-piece",
    "slug": "one-piece",
    "name": "One Piece",
    "creator": "Eiichiro Oda",
    "debutYear": 1997,
    "category": "Anime & Manga",
    "tagline": "Inherited will, the destiny of the age, and the dreams of its people.",
    "description": "A legendary Japanese manga series written and illustrated by Eiichiro Oda. It follows the adventures of Monkey D. Luffy and his Straw Hat Pirates as they explore the Grand Line in search of the mythical treasure known as 'One Piece' to become the Pirate King.",
    "bannerImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    "factions": [
      {
        "name": "Straw Hat Pirates",
        "description": "Crew led by Monkey D. Luffy sailing aboard the Thousand Sunny."
      },
      {
        "name": "The Marines",
        "description": "World Government military sea force enforcing Absolute Justice."
      },
      {
        "name": "The Four Emperors",
        "description": "Four most notorious pirate captains in the New World."
      },
      {
        "name": "Revolutionary Army",
        "description": "Global rebellion seeking to overthrow the World Nobles."
      }
    ],
    "timeline": [
      {
        "year": "800 Years Ago",
        "event": "The Void Century ends; World Government established."
      },
      {
        "year": "24 Years Ago",
        "event": "Execution of Gol D. Roger sparks the Great Pirate Era."
      },
      {
        "year": "Present Day",
        "event": "Monkey D. Luffy sets sail from Windmill Village."
      }
    ],
    "featured": true,
    "mediaCount": 15,
    "characterCount": 90
  }
];

// 4. CURATED CHARACTERS DATA (3D models removed)
export const charactersData = [
  {
    "id": "iron-man",
    "slug": "iron-man-tony-stark",
    "name": "Tony Stark / Iron Man",
    "realName": "Anthony Edward Stark",
    "universeId": "mcu",
    "universeName": "Marvel Cinematic Universe",
    "aliases": [
      "Genius, Billionaire, Playboy, Philanthropist",
      "The Armored Avenger",
      "Mechanic",
      "Iron Knight"
    ],
    "portrait": "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    "species": "Human (Cybernetically Enhanced)",
    "affiliations": [
      "Avengers",
      "Stark Industries",
      "Illuminati",
      "MIT Alumni",
      "Department of Damage Control"
    ],
    "firstAppearance": "Iron Man (2008)",
    "occupation": "CEO & Industrialist, Chief Technical Officer, Avenger",
    "stats": {
      "power": 92,
      "intelligence": 100,
      "durability": 88,
      "speed": 85,
      "combat": 84
    },
    "localModel": "/models/iron_man.glb",

    "slides": [
      {
        "title": "The Stark Industries Arc Forge",
        "subtitle": "Malibu Research & Development Facility",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
        "tag": "ORIGIN REALM",
        "caption": "Where Tony synthesized the clean miniature palladium and vibranium arc reactor cores, revolutionizing clean global energy and personal armored defense."
      },
      {
        "title": "Nanotech Weapon Matrix (Mark 85)",
        "subtitle": "Bleeding-Edge Particle Crystallization",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
        "tag": "WEAPONRY & GEAR",
        "caption": "Liquid-gold titanium nano-particles that can instantly morph into energy shields, repulsor blade gauntlets, and cosmic lightning refractors at will."
      },
      {
        "title": "The Battle of Earth (2023)",
        "subtitle": "The Ultimate Sacrificial Decimation",
        "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80",
        "tag": "ICONIC MILESTONE",
        "caption": "Wielding the synthesized Nano Gauntlet housing all six Infinity Stones, Stark uttered 'I am Iron Man' to disintegrate Thanos's intergalactic invasion fleet."
      }
    ],
    "weapons": [
      {
        "name": "Mark 85 Nano Gauntlet",
        "type": "Cosmic Channeler",
        "desc": "Able to safely house and wield all six Infinity Stones through nanotech distribution."
      },
      {
        "name": "Repulsor Cannons",
        "type": "Directed Energy",
        "desc": "High-density plasma beams emitted from the palms and chest unibeam."
      },
      {
        "name": "Micro-Missile Clusters",
        "type": "Ordnance",
        "desc": "Shoulder-mounted bunker-busting projectile salvos guided by F.R.I.D.A.Y."
      }
    ],
    "abilities": [
      "Omni-Disciplinary Engineering & Super-Genius Intellect",
      "Powered Exoskeleton Flight with Mach 8+ Supersonic Vectoring",
      "Nanotechnology Adaptive Armor Synthesis (Mark 50 & 85)",
      "Vibranium-Alloy Unibeam & Concentrated Repulsor Projection",
      "F.R.I.D.A.Y. Tactical Artificial Intelligence Integration"
    ],
    "weaknesses": [
      "Psychological Trauma, Insomnia, and Post-Wormhole PTSD",
      "Armor Power Cell Exhaustion under sustained orbital energy load",
      "Emotional vulnerability regarding Peter Parker, Morgan, and Pepper Potts"
    ],
    "biography": "Anthony Edward Stark was an American industrialist and engineer who transformed from a cynical arms manufacturer into Earth's foremost protector after surviving captivity through the invention of a powered exoskeleton. As the leader and benefactor of the Avengers, Stark defended the world from global catastrophes, Ultron, and interdimensional invaders, ultimately giving his life with the Infinity Stones to restore half of the cosmos.",
    "relationships": [
      {
        "name": "Pepper Potts",
        "relation": "Wife, Stark Industries CEO & Rescue Suit Pilot"
      },
      {
        "name": "James 'Rhodey' Rhodes",
        "relation": "Brother-in-Arms & Fellow Pilot (War Machine)"
      },
      {
        "name": "Peter Parker",
        "relation": "Protégé & Surrogate Son (Spider-Man)"
      },
      {
        "name": "Steve Rogers",
        "relation": "Comrade, Co-Founder & Ideological Counterpart"
      },
      {
        "name": "Morgan Stark",
        "relation": "Beloved Daughter"
      }
    ],
    "appearances": [
      {
        "id": "iron-man-1",
        "title": "Iron Man",
        "year": 2008,
        "type": "Movie"
      },
      {
        "id": "iron-man-2",
        "title": "Iron Man 2",
        "year": 2010,
        "type": "Movie"
      },
      {
        "id": "avengers-1",
        "title": "The Avengers",
        "year": 2012,
        "type": "Movie"
      },
      {
        "id": "iron-man-3",
        "title": "Iron Man 3",
        "year": 2013,
        "type": "Movie"
      },
      {
        "id": "captain-america-civil-war",
        "title": "Captain America: Civil War",
        "year": 2016,
        "type": "Movie"
      },
      {
        "id": "avengers-infinity-war",
        "title": "Avengers: Infinity War",
        "year": 2018,
        "type": "Movie"
      },
      {
        "id": "avengers-endgame",
        "title": "Avengers: Endgame",
        "year": 2019,
        "type": "Movie"
      }
    ],
    "sourceAttribution": "Marvel Studios LLC / Marvel Characters, Inc."
  },
  {
    "id": "darth-vader",
    "slug": "darth-vader-anakin-skywalker",
    "name": "Darth Vader",
    "realName": "Anakin Skywalker",
    "universeId": "star-wars",
    "universeName": "Star Wars",
    "aliases": [
      "The Chosen One",
      "Lord Vader",
      "Hero with No Fear",
      "Dark Lord of the Sith",
      "Supreme Commander"
    ],
    "portrait": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?auto=format&fit=crop&w=1600&q=80",
    "species": "Human (Cybernetic Sith Lord)",
    "affiliations": [
      "Sith Order",
      "Galactic Empire",
      "501st Legion",
      "Formerly Jedi High Council"
    ],
    "firstAppearance": "Star Wars: Episode IV - A New Hope (1977)",
    "occupation": "Supreme Commander of the Imperial Armed Forces, Sith Apprentice",
    "stats": {
      "power": 98,
      "intelligence": 90,
      "durability": 94,
      "speed": 78,
      "combat": 99
    },
    "slides": [
      {
        "title": "Fortress Vader on Mustafar",
        "subtitle": "The Volcanic Sith Sanctuary",
        "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80",
        "tag": "CITADEL OF THE SITH",
        "caption": "Erected above the very lava falls where Anakin fell, this obsidian spire focuses the dark side of the Force for profound meditation and power channeling."
      },
      {
        "title": "Bridge of the Super Star Destroyer Executor",
        "subtitle": "Flagship of the Death Squadron",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
        "tag": "IMPERIAL DOMINION",
        "caption": "From the command bridge of his 19-kilometer dreadnought, Vader orchestrated the crushing of rebel strongholds from Hoth to the Outer Rim."
      },
      {
        "title": "The Revelation on Cloud City (Bespin)",
        "subtitle": "The Fateful Dual with Luke Skywalker",
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
        "tag": "LEGENDARY DUEL",
        "caption": "Disarming Luke Skywalker upon the reactor gantry, Vader revealed the universe-shattering truth: 'No, I am your father.'"
      }
    ],
    "weapons": [
      {
        "name": "Bled Kyber Lightsaber",
        "type": "Plasma Melee",
        "desc": "Heavy dual-phase emitter with variable blade length tuned for devastating Form V overhead cleaves."
      },
      {
        "name": "TIE Advanced x1",
        "type": "Starfighter",
        "desc": "Customized hyperdrive-equipped fighter featuring bent solar arrays and dual heavy laser cannons."
      }
    ],
    "abilities": [
      "Peerless Midichlorian Potential & Dark Side Nexus",
      "Form V (Djem So) Master Swordsman & Kinetic Overpower",
      "Long-Range Force Choke & Molecular Force Crush",
      "Telekinetic Deflection & Blaster Bolt Absorption",
      "Instinctive Supernatural Starfighter Pilot Navigation"
    ],
    "weaknesses": [
      "Vulnerability to Force Lightning due to intricate cybernetics",
      "Continuous physical agony from pulmonary and dermal burn damage",
      "Lingering paternal love for Luke and Leia weakening Dark Side resolve"
    ],
    "biography": "Once the heroic Jedi Knight Anakin Skywalker believed to fulfill the ancient prophecy of the Chosen One, he fell to the dark side under the manipulation of Chancellor Palpatine. Severely maimed on Mustafar, he was encased in an obsidian life-support suit and emerged as Darth Vader, the dreaded fist of the Galactic Empire. For two decades he hunted surviving Jedi until his son Luke Skywalker reawakened his compassion.",
    "relationships": [
      {
        "name": "Luke Skywalker",
        "relation": "Son, Jedi Knight & Savior"
      },
      {
        "name": "Leia Organa",
        "relation": "Daughter, Princess of Alderaan & Rebel General"
      },
      {
        "name": "Padmé Amidala",
        "relation": "Late Wife, Queen and Senator of Naboo"
      },
      {
        "name": "Obi-Wan Kenobi",
        "relation": "Former Master, Mentor & Brother-in-Arms"
      },
      {
        "name": "Emperor Palpatine / Darth Sidious",
        "relation": "Sith Master & Galactic Sovereign"
      }
    ],
    "appearances": [
      {
        "id": "sw-ep3",
        "title": "Star Wars: Episode III - Revenge of the Sith",
        "year": 2005,
        "type": "Movie"
      },
      {
        "id": "sw-rogue-one",
        "title": "Rogue One: A Star Wars Story",
        "year": 2016,
        "type": "Movie"
      },
      {
        "id": "sw-ep4",
        "title": "Star Wars: Episode IV - A New Hope",
        "year": 1977,
        "type": "Movie"
      },
      {
        "id": "sw-ep5",
        "title": "Star Wars: Episode V - The Empire Strikes Back",
        "year": 1980,
        "type": "Movie"
      },
      {
        "id": "sw-ep6",
        "title": "Star Wars: Episode VI - Return of the Jedi",
        "year": 1983,
        "type": "Movie"
      }
    ],
    "sourceAttribution": "Lucasfilm Ltd. / Disney Enterprises"
  },
  {
    "id": "sung-jinwoo",
    "slug": "sung-jinwoo",
    "name": "Sung Jinwoo",
    "realName": "Sung Jinwoo (성진우)",
    "universeId": "solo-leveling",
    "universeName": "Solo Leveling",
    "aliases": [
      "The Weakest Hunter of All Mankind (Former)",
      "Shadow Monarch",
      "Monarch of Shadows",
      "Player of the System",
      "S-Rank Hunter"
    ],
    "portrait": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    "species": "Human / Greater Sovereign (Shadow Monarch)",
    "affiliations": [
      "Ahjin Guild",
      "Korean Hunters Association",
      "Shadow Army",
      "Formerly D-Rank Hunters"
    ],
    "firstAppearance": "Solo Leveling Chapter 1 (Webtoon)",
    "occupation": "Master of the Ahjin Guild, Sovereign of Death",
    "stats": {
      "power": 100,
      "intelligence": 94,
      "durability": 96,
      "speed": 100,
      "combat": 98
    },
    "slides": [
      {
        "title": "The Double Dungeon & The Cartenon Temple",
        "subtitle": "Birthplace of the Player System",
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
        "tag": "SACRED AWAKENING",
        "caption": "Sacrificing himself to save his party before the smiling stone god statue, Jinwoo triggered the hidden 'Courage of the Weak' quest and received the System."
      },
      {
        "title": "The Shadow Army Sovereign Domain",
        "subtitle": "Army of Ten Million Immortal Shadows",
        "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80",
        "tag": "SHADOW MONARCH DOMAIN",
        "caption": "Commanding the immortal legion led by Marshall Bellion, General Igris, and Beru, Jinwoo stores entire armies within his shadow realm."
      },
      {
        "title": "The War of the Monarchs",
        "subtitle": "Clash of Sovereign Extinction",
        "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80",
        "tag": "MULTIVERSAL CLIMAX",
        "caption": "Embracing Ashborn's full sovereign heart, Jinwoo transcends human mortality to battle the Dragon Monarch Antares and save Earth from extinction."
      }
    ],
    "weapons": [
      {
        "name": "Kamish's Wrath",
        "type": "Dragon-Tooth Daggers",
        "desc": "Forged from the strongest fang of the Calamity Dragon Kamish; possesses supreme mana amplification."
      },
      {
        "name": "Demon King's Dagger",
        "type": "Twin Shortswords",
        "desc": "Dropped by Baran, Monarch of White Flames; unleashes White Lightning storms."
      }
    ],
    "abilities": [
      "Shadow Extraction & Shadow Preservation ('Arise')",
      "Ruler's Authority (Invisible Telekinetic Force Vectoring)",
      "Domain of the Monarch (100% Shadow Stat Buff Aura)",
      "Dragon's Fear (Area-of-Effect Paralysis & Soul Terror)",
      "Quicksilver & Bloodlust (Hypersonic Dagger Arts)"
    ],
    "weaknesses": [
      "Burden of protecting the human populace during planetary dimensional tears",
      "Limited temporal stamina when operating outside the System realm before full Sovereign awakening"
    ],
    "biography": "Starting out as an impoverished E-Rank hunter ridiculed as the 'Weakest Hunter of All Mankind', Sung Jinwoo survived a catastrophic dual dungeon trial by following three ancient commandments. Reborn as the sole 'Player' blessed with an exclusive leveling system, Jinwoo steadily climbed from mortal insignificance to inherit the cosmic mantle of Ashborn, the Primordial Monarch of Shadows, commanding an immortal army of extracted shadow warriors.",
    "relationships": [
      {
        "name": "Cha Hae-In",
        "relation": "Wife, S-Rank Hunter & Sword Guild Associate"
      },
      {
        "name": "Sung Jin-Ah",
        "relation": "Beloved Younger Sister"
      },
      {
        "name": "Yoo Jinho",
        "relation": "Vice Guild Master, Best Friend & Sworn Brother"
      },
      {
        "name": "Ashborn",
        "relation": "Predecessor & Primordial Monarch of Shadows"
      },
      {
        "name": "Igris & Beru",
        "relation": "Loyal Marshal & General of the Shadow Army"
      }
    ],
    "appearances": [
      {
        "id": "sl-s1",
        "title": "Solo Leveling Season 1",
        "year": 2024,
        "type": "Anime"
      },
      {
        "id": "sl-s2",
        "title": "Solo Leveling: Arise from the Shadow",
        "year": 2025,
        "type": "Anime"
      },
      {
        "id": "sl-webtoon",
        "title": "Solo Leveling Original Manhwa",
        "year": 2018,
        "type": "Manhwa"
      }
    ],
    "sourceAttribution": "D&C Media / Chugong / DUBU (REDICE STUDIO)"
  },
  {
    "id": "eren-yeager",
    "slug": "eren-yeager",
    "name": "Eren Yeager",
    "realName": "Eren Yeager (エレン・イェーガー)",
    "universeId": "attack-on-titan",
    "universeName": "Attack on Titan",
    "aliases": [
      "The Attack Titan",
      "The Founding Titan",
      "The War Hammer Titan",
      "Usurper",
      "Hope of Paradis"
    ],
    "portrait": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    "species": "Eldian Titan Shifter",
    "affiliations": [
      "Scout Regiment (Special Operations Squad)",
      "Yeagerists",
      "104th Training Corps"
    ],
    "firstAppearance": "Attack on Titan Chapter 1 (2009)",
    "occupation": "Scout Regiment Soldier, Sovereign Leader of the Yeagerists",
    "stats": {
      "power": 99,
      "intelligence": 86,
      "durability": 98,
      "speed": 88,
      "combat": 95
    },
    "slides": [
      {
        "title": "The Coordinate & The Paths",
        "subtitle": "Metaphysical Realm Beyond Space and Time",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
        "tag": "FOUNDING TITAN DOMAIN",
        "caption": "Where the memories, souls, and bodies of all Subjects of Ymir converge at the radiant coordinate tree across past, present, and future."
      },
      {
        "title": "The Walls of Paradis: Shiganshina",
        "subtitle": "Hometown of the Boy Who Sought Freedom",
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
        "tag": "ORIGIN REALM",
        "caption": "The outer district of Wall Maria where Eren witnessed the fall of his mother to the Smiling Titan, swearing to exterminate all Titans from the world."
      },
      {
        "title": "The Rumbling Unleashed",
        "subtitle": "The March of the Wall Colossals",
        "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80",
        "tag": "APOCALYPTIC TURNING POINT",
        "caption": "Freeing the Founder Ymir from 2,000 years of royal slavery, Eren unhardens the three walls to initiate the planetary Rumbling to ensure Paradis's survival."
      }
    ],
    "weapons": [
      {
        "name": "Ultrahard Steel Blades",
        "type": "Cutting Weapon",
        "desc": "Dual snap-blade swords designed to slice through Titan nape flesh."
      },
      {
        "name": "War Hammer Hardening Spikes",
        "type": "Titan Biomass Construct",
        "desc": "Instantaneous creation of crystalline pillars, spikes, and giant crossbows."
      }
    ],
    "abilities": [
      "Triple Titan Shifter Physiology (Attack, Founding, War Hammer)",
      "Temporal Memory Transference (Access to Past & Future Shifter Memories)",
      "Structural Hardening & Crystalline Armor Generation",
      "Command of the Colossal Wall Titans via the Founder's Will",
      "High-Speed Regenerative Biology and Consciousness Redirection"
    ],
    "weaknesses": [
      "Curse of Ymir (13-year lifespan limitation for Titan shifters)",
      "Nape Vulnerability (1 meter long, 10 cm wide cervical weakness)",
      "Crushing psychic toll from perceiving past, present, and future simultaneously"
    ],
    "biography": "Born in Shiganshina District on the isolated island of Paradis, Eren Yeager swore vengeance against the Titans after witnessing the catastrophic breach of Wall Maria. After discovering his own dormant ability to transform into the 15-meter Attack Titan, Eren became the military's greatest weapon. As the conspiracy of the outside world unfolded, Eren chose an uncompromising path, initiating the Rumbling to protect his homeland.",
    "relationships": [
      {
        "name": "Mikasa Ackerman",
        "relation": "Adoptive Sister & Devoted Protector"
      },
      {
        "name": "Armin Arlert",
        "relation": "Childhood Best Friend & Intellectual Counterweight"
      },
      {
        "name": "Zeke Yeager",
        "relation": "Half-Brother & Beast Titan Shifter"
      },
      {
        "name": "Levi Ackerman",
        "relation": "Captain & Squad Leader"
      },
      {
        "name": "Grisha Yeager",
        "relation": "Father & Inherited Titan Predecessor"
      }
    ],
    "appearances": [
      {
        "id": "aot-s1",
        "title": "Attack on Titan Season 1",
        "year": 2013,
        "type": "Anime"
      },
      {
        "id": "aot-s2",
        "title": "Attack on Titan Season 2",
        "year": 2017,
        "type": "Anime"
      },
      {
        "id": "aot-s3",
        "title": "Attack on Titan Season 3",
        "year": 2018,
        "type": "Anime"
      },
      {
        "id": "aot-final",
        "title": "Attack on Titan: The Final Season",
        "year": 2020,
        "type": "Anime"
      }
    ],
    "sourceAttribution": "Hajime Isayama / Kodansha / WIT Studio / MAPPA"
  },
  {
    "id": "monkey-d-luffy",
    "slug": "monkey-d-luffy",
    "name": "Monkey D. Luffy",
    "realName": "Monkey D. Luffy (モンキー・D・ルフィ)",
    "universeId": "one-piece",
    "universeName": "One Piece",
    "aliases": [
      "Straw Hat Luffy",
      "Fifth Emperor of the Sea",
      "Emperor of the Sea (Yonko)",
      "Sun God Nika",
      "Warrior of Liberation"
    ],
    "portrait": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    "species": "Human (Mythical Zoan Devil Fruit Eater)",
    "affiliations": [
      "Straw Hat Pirates",
      "Straw Hat Grand Fleet",
      "Ninja-Pirate-Mink-Samurai Alliance",
      "Worst Generation"
    ],
    "firstAppearance": "One Piece Romance Dawn (Chapter 1, 1997)",
    "occupation": "Captain of the Straw Hat Pirates, Emperor of the Sea",
    "stats": {
      "power": 98,
      "intelligence": 75,
      "durability": 100,
      "speed": 96,
      "combat": 97
    },
    "slides": [
      {
        "title": "Sailing the Grand Line aboard the Thousand Sunny",
        "subtitle": "The Ship of the Future Pirate King",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
        "tag": "MARITIME ADVENTURE",
        "caption": "Crafted from the legendary Treasure Tree Adam by Franky, the Thousand Sunny carries the crew through the New World toward Laugh Tale."
      },
      {
        "title": "Awakening of Gear 5: The Drums of Liberation",
        "subtitle": "Roof of Onigashima against Kaido",
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
        "tag": "GOD-TIER AWAKENING",
        "caption": "With his heartbeat echoing the legendary Drums of Liberation, Luffy transcends reality into Sun God Nika, turning lightning and ground into rubber."
      },
      {
        "title": "The Summit War of Marineford",
        "subtitle": "Infiltration of the Navy Headquarters",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
        "tag": "DEFINING SAGA",
        "caption": "Falling from the sky into the clash between Whitebeard and the World Government, Luffy risked his life to rescue his sworn brother Portgas D. Ace."
      }
    ],
    "weapons": [
      {
        "name": "Nidai Kitetsu (Temporary)",
        "type": "Cursed Katana",
        "desc": "One of the 21 Great Grade Swords wielded playfully during the Wano Country opening."
      },
      {
        "name": "Straw Hat",
        "type": "Inherited Treasure",
        "desc": "A sacred keepsake passed from Gol D. Roger to Shanks, and finally to Luffy."
      }
    ],
    "abilities": [
      "Mythical Zoan Devil Fruit: Hito Hito no Mi, Model: Nika",
      "Gear Transformations (Gear 2nd, 3rd, 4th Bounce-Man/Snake-Man, Gear 5th)",
      "Advanced Conqueror's Haki Infusion (Haoshoku Haki)",
      "Advanced Armament & Observation Haki (Future Sight)",
      "Toon Force & Reality-Bending Rubberizing Transmutation"
    ],
    "weaknesses": [
      "Total Paralysis and energy drain upon contact with Seastone or seawater",
      "Extreme vulnerability to piercing and slashing weapons in standard rubber form",
      "Insatiable appetite causing rapid exhaustion if food is unavailable"
    ],
    "biography": "Raised in Foosha Village on Dawn Island, Monkey D. Luffy accidentally ate the Mythical Zoan Devil Fruit, turning his body into rubber. Inspired by his savior 'Red-Haired' Shanks, Luffy set to sea alone in a small dinghy to assemble a loyal crew and uncover the legendary treasure left behind by Gol D. Roger to become the freest man on the seas: the Pirate King.",
    "relationships": [
      {
        "name": "Roronoa Zoro",
        "relation": "First Mate, Swordsman & Right Hand"
      },
      {
        "name": "Portgas D. Ace",
        "relation": "Sworn Older Brother & Whitebeard Commander"
      },
      {
        "name": "Sabo",
        "relation": "Sworn Brother & Chief of Staff of the Revolutionary Army"
      },
      {
        "name": "Red-Haired Shanks",
        "relation": "Idol, Savior & Mentor"
      },
      {
        "name": "Monkey D. Dragon",
        "relation": "Father & Supreme Commander of the Revolutionary Army"
      }
    ],
    "appearances": [
      {
        "id": "op-anime",
        "title": "One Piece TV Anime Series",
        "year": 1999,
        "type": "Anime"
      },
      {
        "id": "op-film-red",
        "title": "One Piece Film: Red",
        "year": 2022,
        "type": "Movie"
      },
      {
        "id": "op-manga",
        "title": "One Piece Serialized Manga",
        "year": 1997,
        "type": "Manga"
      }
    ],
    "sourceAttribution": "Eiichiro Oda / Shueisha / Toei Animation"
  },
  {
    "id": "harry-potter",
    "slug": "harry-potter",
    "name": "Harry Potter",
    "realName": "Harry James Potter",
    "universeId": "wizarding-world",
    "universeName": "Wizarding World",
    "aliases": [
      "The Boy Who Lived",
      "The Chosen One",
      "Master of Death",
      "Head of the Auror Office",
      "Triwizard Champion"
    ],
    "portrait": "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=600&q=80",
    "backgroundImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    "species": "Human (Half-Blood Wizard)",
    "affiliations": [
      "Order of the Phoenix",
      "Dumbledore's Army",
      "Gryffindor House",
      "Ministry of Magic Auror Office"
    ],
    "firstAppearance": "Harry Potter and the Philosopher's Stone (1997)",
    "occupation": "Head of Magical Law Enforcement, Auror",
    "stats": {
      "power": 88,
      "intelligence": 85,
      "durability": 89,
      "speed": 92,
      "combat": 91
    },
    "slides": [
      {
        "title": "Hogwarts Castle & The Great Hall",
        "subtitle": "Sanctuary of Magic and Seven Years of Lore",
        "image": "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=80",
        "tag": "ORIGIN REALM",
        "caption": "The ancient Scottish highlands fortress where Harry found his first true home, studied defensive charms, and united Gryffindor house."
      },
      {
        "title": "The Deathly Hallows",
        "subtitle": "Cloak of Invisibility, Resurrection Stone, Elder Wand",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
        "tag": "ANCIENT RELICS",
        "caption": "The three mythical artifacts of Death. Harry became the true Master of Death not by conquering it, but by accepting mortality for others."
      },
      {
        "title": "The Battle of Hogwarts (1998)",
        "subtitle": "The Final Confrontation in the Courtyard",
        "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80",
        "tag": "HISTORIC CLIMAX",
        "caption": "Standing in the ruined castle courtyard at dawn, Harry cast his signature Expelliarmus against Voldemort's Killing Curse, ending the Second Wizarding War."
      }
    ],
    "weapons": [
      {
        "name": "Holly & Phoenix Feather Wand",
        "type": "Primary Wand",
        "desc": "11 inches, supple, containing a tail feather from Dumbledore's phoenix Fawkes; twin core to Voldemort's wand."
      },
      {
        "name": "Cloak of Invisibility",
        "type": "Deathly Hallow",
        "desc": "Flawless, never-fading woven cloak that conceals the wearer entirely from magical and mortal detection."
      },
      {
        "name": "Sword of Godric Gryffindor",
        "type": "Goblin-Wrought Relic",
        "desc": "Imbibed with basilisk venom, capable of destroying Voldemort's Horcruxes."
      }
    ],
    "abilities": [
      "Mastery of Defense Against the Dark Arts & Wand Dueling",
      "Corporeal Patronus Charm (Prancing Stag Projection)",
      "Unrivaled Aerial Broom Flight & Quidditch Seeker Instincts",
      "Parseltongue Serpent Telepathy (Formerly)",
      "Occulmency & Mental Connection Resistance"
    ],
    "weaknesses": [
      "Tendency toward impulsive heroism ('saving people thing')",
      "Mortal human physical constitution without magical defensive shields"
    ],
    "biography": "Orphaned as an infant after Lord Voldemort murdered his parents, Harry survived through his mother's ancient sacrificial protection, leaving him with a lightning bolt scar. On his eleventh birthday, he discovered his magical heritage and entered Hogwarts School of Witchcraft and Wizardry. Over seven tumultuous years, Harry uncovered the truth of the Deathly Hallows and Horcruxes, ultimately defeating Voldemort and bringing peace to the Wizarding World.",
    "relationships": [
      {
        "name": "Hermione Granger",
        "relation": "Closest Friend & Intellectual Anchor"
      },
      {
        "name": "Ron Weasley",
        "relation": "Best Friend & Sworn Brother"
      },
      {
        "name": "Ginny Weasley",
        "relation": "Wife & Professional Chaser"
      },
      {
        "name": "Albus Dumbledore",
        "relation": "Headmaster & Guiding Mentor"
      },
      {
        "name": "Sirius Black",
        "relation": "Godfather & Padfoot"
      }
    ],
    "appearances": [
      {
        "id": "hp-1",
        "title": "Harry Potter and the Sorcerer's Stone",
        "year": 2001,
        "type": "Movie"
      },
      {
        "id": "hp-3",
        "title": "Harry Potter and the Prisoner of Azkaban",
        "year": 2004,
        "type": "Movie"
      },
      {
        "id": "hp-7-2",
        "title": "Harry Potter and the Deathly Hallows - Part 2",
        "year": 2011,
        "type": "Movie"
      }
    ],
    "sourceAttribution": "J.K. Rowling / Warner Bros. Entertainment Inc."
  }
];

// 5. CURATED MEDIA DATA
export const mediaData = [
  {
    "id": "iron-man-1",
    "slug": "iron-man-2008",
    "title": "Iron Man",
    "type": "movie",
    "category": "Cinema & Movies",
    "universeId": "mcu",
    "universeName": "Marvel Cinematic Universe",
    "releaseYear": 2008,
    "releaseDate": "May 2, 2008",
    "director": "Jon Favreau",
    "runtime": "126 min",
    "genres": [
      "Action",
      "Sci-Fi",
      "Superhero"
    ],
    "coverImage": "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=700&q=80",
    "synopsis": "After being captured by terrorists in Afghanistan, billionaire industrialist Tony Stark constructs a high-tech suit of armor to escape and vows to use his technology to protect the innocent as the armored superhero Iron Man.",
    "characterIds": [
      "iron-man"
    ],
    "viewingOrder": "Phase 1 - Film 1",
    "externalUrl": "https://www.marvel.com/movies/iron-man",
    "sourceAttribution": "Marvel Studios / Paramount Pictures",
    "featured": true
  },
  {
    "id": "avengers-endgame",
    "slug": "avengers-endgame-2019",
    "title": "Avengers: Endgame",
    "type": "movie",
    "category": "Cinema & Movies",
    "universeId": "mcu",
    "universeName": "Marvel Cinematic Universe",
    "releaseYear": 2019,
    "releaseDate": "April 26, 2019",
    "director": "Anthony Russo, Joe Russo",
    "runtime": "181 min",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Drama"
    ],
    "coverImage": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80",
    "synopsis": "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
    "characterIds": [
      "iron-man"
    ],
    "viewingOrder": "Phase 3 - Film 11",
    "externalUrl": "https://www.marvel.com/movies/avengers-endgame",
    "sourceAttribution": "Marvel Studios / Walt Disney Studios",
    "featured": true
  },
  {
    "id": "sw-ep5",
    "slug": "star-wars-the-empire-strikes-back",
    "title": "Star Wars: The Empire Strikes Back",
    "type": "movie",
    "category": "Cinema & Movies",
    "universeId": "star-wars",
    "universeName": "Star Wars",
    "releaseYear": 1980,
    "releaseDate": "May 21, 1980",
    "director": "Irvin Kershner",
    "runtime": "124 min",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?auto=format&fit=crop&w=700&q=80",
    "synopsis": "After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
    "characterIds": [
      "darth-vader"
    ],
    "viewingOrder": "Episode V (Original Trilogy)",
    "externalUrl": "https://www.starwars.com/films/star-wars-episode-v-the-empire-strikes-back",
    "sourceAttribution": "Lucasfilm Ltd. / 20th Century Fox",
    "featured": true
  },
  {
    "id": "loki-series",
    "slug": "loki-series",
    "title": "Loki (Seasons 1 & 2)",
    "type": "series",
    "category": "Television & Web Series",
    "universeId": "mcu",
    "universeName": "Marvel Cinematic Universe",
    "releaseYear": 2021,
    "releaseDate": "June 9, 2021",
    "creator": "Michael Waldron",
    "episodes": "12 Episodes",
    "genres": [
      "Sci-Fi",
      "Fantasy",
      "Time Travel",
      "Mystery"
    ],
    "coverImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
    "synopsis": "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame, confronting the Time Variance Authority and the multiverse loom.",
    "characterIds": [
      "iron-man"
    ],
    "viewingOrder": "Multiverse Saga - Disney+ Series",
    "externalUrl": "https://www.marvel.com/tv-shows/loki/2",
    "sourceAttribution": "Marvel Studios"
  },
  {
    "id": "mandalorian-series",
    "slug": "the-mandalorian",
    "title": "The Mandalorian",
    "type": "series",
    "category": "Television & Web Series",
    "universeId": "star-wars",
    "universeName": "Star Wars",
    "releaseYear": 2019,
    "releaseDate": "November 12, 2019",
    "creator": "Jon Favreau",
    "episodes": "24 Episodes (3 Seasons)",
    "genres": [
      "Space Western",
      "Action",
      "Adventure"
    ],
    "coverImage": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=700&q=80",
    "synopsis": "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic, who adopts an infant Force-sensitive foundling named Grogu.",
    "characterIds": [
      "darth-vader"
    ],
    "viewingOrder": "New Republic Era (9 ABY)",
    "externalUrl": "https://www.starwars.com/series/the-mandalorian",
    "sourceAttribution": "Lucasfilm Ltd. / Disney+"
  },
  {
    "id": "aot-anime",
    "slug": "attack-on-titan-anime",
    "title": "Attack on Titan (Shingeki no Kyojin)",
    "type": "anime",
    "category": "Anime",
    "universeId": "attack-on-titan",
    "universeName": "Attack on Titan",
    "releaseYear": 2013,
    "releaseDate": "April 7, 2013",
    "director": "Tetsurō Araki / Yuichiro Hayashi",
    "episodes": "89 Episodes + OVAs",
    "genres": [
      "Dark Fantasy",
      "Action",
      "Military",
      "Mystery"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    "synopsis": "After his hometown is destroyed and his mother is killed by Titans, Eren Yeager vows to cleanse the earth of the giant humanoids that have brought humanity to the brink of extinction.",
    "characterIds": [
      "eren-yeager"
    ],
    "viewingOrder": "Seasons 1-4 Complete",
    "externalUrl": "https://shingeki.tv/",
    "sourceAttribution": "Wit Studio / MAPPA / Kodansha",
    "featured": true
  },
  {
    "id": "sl-anime",
    "slug": "solo-leveling-anime",
    "title": "Solo Leveling (Ore dake Level Up na Ken)",
    "type": "anime",
    "category": "Anime",
    "universeId": "solo-leveling",
    "universeName": "Solo Leveling",
    "releaseYear": 2024,
    "releaseDate": "January 7, 2024",
    "director": "Shunsuke Nakashige",
    "episodes": "24+ Episodes",
    "genres": [
      "Action",
      "Fantasy",
      "Supernatural"
    ],
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
    "synopsis": "In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo struggles as the weakest hunter until a secret quest gives him the unique ability to level up infinitely.",
    "characterIds": [
      "sung-jinwoo"
    ],
    "viewingOrder": "Anime Adaptation",
    "externalUrl": "https://sololeveling-anime.net/",
    "sourceAttribution": "A-1 Pictures / Aniplex / Netmarble",
    "featured": true
  },
  {
    "id": "op-anime",
    "slug": "one-piece-anime",
    "title": "One Piece",
    "type": "anime",
    "category": "Anime",
    "universeId": "one-piece",
    "universeName": "One Piece",
    "releaseYear": 1999,
    "releaseDate": "October 20, 1999",
    "director": "Kōnosuke Uda, Munehisa Sakai, Tatsuya Nagamine",
    "episodes": "1100+ Episodes",
    "genres": [
      "Adventure",
      "Fantasy",
      "Action",
      "Comedy"
    ],
    "coverImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
    "synopsis": "Monkey D. Luffy sails with his crew of Straw Hat Pirates through the Grand Line to find the legendary treasure One Piece and become the Pirate King.",
    "characterIds": [
      "monkey-d-luffy"
    ],
    "viewingOrder": "East Blue to Egghead Island",
    "externalUrl": "https://one-piece.com/",
    "sourceAttribution": "Toei Animation / Fuji TV / Eiichiro Oda"
  },
  {
    "id": "sl-manhwa",
    "slug": "solo-leveling-manhwa",
    "title": "Solo Leveling (Webtoon)",
    "type": "manhwa",
    "category": "Manhwa",
    "universeId": "solo-leveling",
    "universeName": "Solo Leveling",
    "releaseYear": 2018,
    "releaseDate": "March 4, 2018",
    "author": "Chugong, DUBU (Redice Studio)",
    "chapters": "200 Chapters (Complete)",
    "genres": [
      "Action",
      "Fantasy",
      "Game System",
      "Supernatural"
    ],
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
    "synopsis": "The global phenomenon webtoon illustrating Sung Jinwoo's meteoric ascent from an E-Rank laughingstock into the supreme sovereign commanding millions of shadows.",
    "characterIds": [
      "sung-jinwoo"
    ],
    "viewingOrder": "Season 1, Season 2 & Side Stories",
    "externalUrl": "https://page.kakao.com/content/50866481",
    "sourceAttribution": "KakaoPage / D&C Media / Redice Studio",
    "featured": true
  },
  {
    "id": "orv-manhwa",
    "slug": "omniscient-readers-viewpoint",
    "title": "Omniscient Reader's Viewpoint",
    "type": "manhwa",
    "category": "Manhwa",
    "universeId": "solo-leveling",
    "universeName": "Original / Modern Apocalypse",
    "releaseYear": 2020,
    "releaseDate": "May 26, 2020",
    "author": "Sing Shong, Sleepy-C (Redice Studio)",
    "chapters": "210+ Chapters (Ongoing)",
    "genres": [
      "Apocalyptic Fantasy",
      "Action",
      "Psychological",
      "Metafiction"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    "synopsis": "Kim Dokja is the sole reader of an obscure 3,149-chapter webnovel titled 'Three Ways to Survive in an Apocalyptic World'. When the novel suddenly becomes reality, Dokja must use his exclusive knowledge to survive the brutal scenarios.",
    "characterIds": [],
    "viewingOrder": "Webtoon Serial",
    "externalUrl": "https://comic.naver.com/webtoon/list?titleId=747269",
    "sourceAttribution": "Naver Webtoon / Redice Studio"
  },
  {
    "id": "aot-manga",
    "slug": "attack-on-titan-manga",
    "title": "Attack on Titan (Manga)",
    "type": "manga",
    "category": "Manga",
    "universeId": "attack-on-titan",
    "universeName": "Attack on Titan",
    "releaseYear": 2009,
    "releaseDate": "September 9, 2009",
    "author": "Hajime Isayama",
    "chapters": "139 Chapters (34 Volumes)",
    "genres": [
      "Dark Fantasy",
      "Military Fiction",
      "Post-Apocalyptic"
    ],
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    "synopsis": "The complete, groundbreaking original manga serialized in Bessatsu Shōnen Magazine tracing the geopolitical conflict between Paradis and the world.",
    "characterIds": [
      "eren-yeager"
    ],
    "viewingOrder": "Volumes 1 - 34",
    "externalUrl": "https://shonenmagazine.com/special_shingeki",
    "sourceAttribution": "Kodansha Comics"
  },
  {
    "id": "hp-book1",
    "slug": "harry-potter-and-the-philosophers-stone",
    "title": "Harry Potter and the Philosopher's Stone",
    "type": "book",
    "category": "Books & Literature",
    "universeId": "wizarding-world",
    "universeName": "Wizarding World",
    "releaseYear": 1997,
    "releaseDate": "June 26, 1997",
    "author": "J.K. Rowling",
    "pages": "223 pages",
    "genres": [
      "Fantasy",
      "Young Adult",
      "Mystery"
    ],
    "coverImage": "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=700&q=80",
    "synopsis": "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive, whisking him away into a magical world of wizards, spells, and ancient mysteries.",
    "characterIds": [
      "harry-potter"
    ],
    "viewingOrder": "Book 1 of 7",
    "externalUrl": "https://www.wizardingworld.com/",
    "sourceAttribution": "Bloomsbury Publishing / Scholastic",
    "featured": true
  },
  {
    "id": "sl-novel",
    "slug": "solo-leveling-webnovel",
    "title": "Solo Leveling (Original Webnovel)",
    "type": "novel",
    "category": "Novels & Webnovels",
    "universeId": "solo-leveling",
    "universeName": "Solo Leveling",
    "releaseYear": 2016,
    "releaseDate": "July 25, 2016",
    "author": "Chugong",
    "chapters": "270 Chapters",
    "genres": [
      "Action",
      "Fantasy",
      "LitRPG",
      "Monarch Lore"
    ],
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
    "synopsis": "The definitive prose edition containing the psychological depths of Sung Jinwoo's evolution, inner monologues of the Absolute Being, and the primordial war between Rulers and Monarchs.",
    "characterIds": [
      "sung-jinwoo"
    ],
    "viewingOrder": "Original Source Work",
    "externalUrl": "https://page.kakao.com/content/48787313",
    "sourceAttribution": "D&C Media (Papyrus imprint)"
  },
  {
    "id": "cyberfiction-metaverse-genesis",
    "slug": "cyberfiction-real-story-in-metaverse",
    "title": "Cyberfiction: The Real Story in the Metaverse",
    "type": "cyberfiction",
    "category": "Cyberfiction",
    "universeId": "cyberfiction",
    "universeName": "Cyberfiction Metaverse",
    "releaseYear": 2024,
    "releaseDate": "March 2024",
    "author": "Cyberfiction Collective",
    "runtime": "Interactive 300-Frame Experience",
    "genres": [
      "Cyberfiction",
      "Metaverse",
      "Virtual Reality",
      "Sci-Fi",
      "Web3"
    ],
    "coverImage": "/cyberfiction/male0001.png",
    "synopsis": "Cyberfiction aims to be a decentralized community that can create new values and profits through play in the virtual world. Make a story, take a chance, build and own, and maintain good humanity in the not-too-distant future.",
    "characterIds": [],
    "viewingOrder": "Core Genesis Narrative",
    "externalUrl": "/cyberfiction",
    "sourceAttribution": "Cyberfiction Project",
    "featured": true
  },
  {
    "id": "cyberfield-playground-zero",
    "slug": "cyberfield-playground-zero",
    "title": "Cyberfield: Playground Zero",
    "type": "cyberfiction",
    "category": "Cyberfiction",
    "universeId": "cyberfiction",
    "universeName": "Cyberfiction Metaverse",
    "releaseYear": 2025,
    "releaseDate": "January 2025",
    "author": "Neural Nexus Studios",
    "runtime": "Digital Chronicle",
    "genres": [
      "Cyberfiction",
      "Cyberpunk",
      "Metaverse",
      "Futurism"
    ],
    "coverImage": "/cyberfiction/male0150.png",
    "synopsis": "Throw away age, gender, region, and status. Don't compete, don't fight, cooperate and share with each other. Cyberfield is our playground — an expansive collective reality where human dreamers co-exist with artificial minds.",
    "characterIds": [],
    "viewingOrder": "Playground Chronicle 1",
    "externalUrl": "/cyberfiction",
    "sourceAttribution": "Cyberfiction Autonomous Labs",
    "featured": true
  },
  {
    "id": "neuromancer-cyber-saga",
    "slug": "neuromancer-matrix-chronicles",
    "title": "Neuromancer & The Matrix Protocol",
    "type": "cyberfiction",
    "category": "Cyberfiction",
    "universeId": "cyberfiction",
    "universeName": "Cyberfiction Metaverse",
    "releaseYear": 2024,
    "releaseDate": "October 2024",
    "author": "Cyberspace Archivists",
    "runtime": "Serialized Cyberspace Arc",
    "genres": [
      "Cyberfiction",
      "Cyberpunk",
      "Artificial Intelligence",
      "Decker Lore"
    ],
    "coverImage": "/cyberfiction/male0280.png",
    "synopsis": "A tribute to the origins of cyberfiction literature: consensual hallucinations experienced daily by billions of legitimate operators in every nation. Graphical representations of data abstracted from the banks of every computer in the human system.",
    "characterIds": [],
    "viewingOrder": "Historical Cyber Matrix",
    "externalUrl": "/cyberfiction",
    "sourceAttribution": "Loreverse Digital Archives",
    "featured": true
  }
];

// 6. CURATED ARTICLES DATA
export const articlesData = [
  {
    "id": "infinity-stones",
    "slug": "the-infinity-stones",
    "title": "The Infinity Stones",
    "type": "artifact",
    "category": "Cosmic Relics",
    "universeId": "mcu",
    "universeName": "Marvel Cinematic Universe",
    "summary": "Six singularities compressed into concentrated ingots at the dawn of the cosmos, controlling Space, Reality, Power, Soul, Mind, and Time.",
    "author": "Loreverse Editorial Archivist",
    "lastUpdated": "October 2026",
    "infobox": [
      {
        "label": "Origin",
        "value": "Big Bang Primordial Singularities"
      },
      {
        "label": "Count",
        "value": "6 Unique Singularities"
      },
      {
        "label": "Primary Vessel",
        "value": "Infinity Gauntlet / Nano Gauntlet"
      },
      {
        "label": "Current Status",
        "value": "Atomized / Restored across Timelines"
      },
      {
        "label": "Universe",
        "value": "Marvel Cinematic Universe"
      }
    ],
    "sections": [
      {
        "heading": "Cosmic Creation & Composition",
        "content": "Before creation itself, there were six singularities. Then the universe exploded into existence, and the remnants of these systems were forged into concentrated ingots: the Infinity Stones. Each stone governs a fundamental aspect of reality. A being of immense physical fortitude can harness the power of an individual stone, but wielding all six simultaneously grants godlike command over the entirety of existence."
      },
      {
        "heading": "The Six Aspects",
        "content": "1. Space Stone (Tesseract): Controls teleportation and spatial dimensions.\n2. Mind Stone (Scepter): Bestows telepathy, advanced consciousness, and energy blasts.\n3. Reality Stone (Aether): Transmutes matter and defies physical laws.\n4. Power Stone (Orb): Unleashes catastrophic kinetic destruction capable of sterilizing planets.\n5. Time Stone (Eye of Agamotto): Enables manipulation of temporal flow, paradox loops, and forward precognition.\n6. Soul Stone (Vormir): Governs spirits, requiring the sacrifice of that which the seeker loves most."
      },
      {
        "heading": "The Decimation & Time Heist",
        "content": "In 2018, the warlord Thanos successfully gathered all six stones and executed the Decimation, wiping out fifty percent of all living beings before reducing the stones to atoms. Five years later, the surviving Avengers traveled through the Quantum Realm to borrow alternate stones, constructing Tony Stark's Nano Gauntlet to undo the catastrophic snap."
      }
    ],
    "relatedArticles": [
      "iron-man-tony-stark",
      "avengers-endgame-2019"
    ],
    "sourceAttribution": "Marvel Studios / Marvel Entertainment"
  },
  {
    "id": "the-force",
    "slug": "the-force-and-lightsaber-combat",
    "title": "The Force & Lightsaber Combat",
    "type": "concept",
    "category": "Cosmic Metaphysics",
    "universeId": "star-wars",
    "universeName": "Star Wars",
    "summary": "An energy field created by all living things that surrounds, penetrates, and binds the galaxy together, harnessed through seven classic lightsaber forms.",
    "author": "Jedi Archives Curator",
    "lastUpdated": "September 2026",
    "infobox": [
      {
        "label": "Classification",
        "value": "Universal Energy Field"
      },
      {
        "label": "Aspects",
        "value": "Light Side (Ashla) & Dark Side (Bogan)"
      },
      {
        "label": "Primary Practitioners",
        "value": "Jedi Knights & Sith Lords"
      },
      {
        "label": "Signature Weapon",
        "value": "Kyber Crystal Lightsaber"
      },
      {
        "label": "Universe",
        "value": "Star Wars"
      }
    ],
    "sections": [
      {
        "heading": "Nature of the Force",
        "content": "The Force consists of two interdependent aspects: the Living Force, generated by all organic life, and the Cosmic Force, which binds the universe and guides destiny. Symbiotic microscopic life-forms known as midi-chlorians reside within all cells, communicating the will of the Force to sensitive individuals."
      },
      {
        "heading": "The Seven Forms of Lightsaber Combat",
        "content": "Over millennia, the Jedi developed seven distinct combat disciplines:\n• Form I (Shii-Cho): The foundational Way of the Sarlacc.\n• Form II (Makashi): Elegant dueling discipline designed for blade-to-blade precision.\n• Form III (Soresu): Supreme defensive resilience capable of deflecting blaster fire.\n• Form IV (Ataru): High-velocity acrobatic offense utilizing Force-assisted jumps.\n• Form V (Shien / Djem So): Counter-attacking mastery pioneered by Anakin Skywalker.\n• Form VI (Niman): Balanced diplomat form blending telekinesis with strikes.\n• Form VII (Juyo / Vaapad): Unorthodox discipline channeling inner darkness without succumbing to it."
      }
    ],
    "relatedArticles": [
      "darth-vader-anakin-skywalker",
      "star-wars-the-empire-strikes-back"
    ],
    "sourceAttribution": "Lucasfilm Ltd."
  },
  {
    "id": "shadow-monarch-lore",
    "slug": "shadow-monarch-and-primordial-rulers",
    "title": "The Shadow Monarch & Primordial Rulers",
    "type": "faction",
    "category": "Mythology & Cosmography",
    "universeId": "solo-leveling",
    "universeName": "Solo Leveling",
    "summary": "The ancient war between the Emissaries of Light (Rulers) and the Lords of Darkness (Monarchs), culminating in the coronation of Sung Jinwoo.",
    "author": "Hunter Lore Guild",
    "lastUpdated": "August 2026",
    "infobox": [
      {
        "label": "Supreme Sovereign",
        "value": "Sung Jinwoo (Formerly Ashborn)"
      },
      {
        "label": "Capital Realm",
        "value": "Land of Eternal Rest"
      },
      {
        "label": "Army Size",
        "value": "Over 10 Million Shadows"
      },
      {
        "label": "Opposing Faction",
        "value": "Monarchs of Destruction & Frost"
      },
      {
        "label": "Universe",
        "value": "Solo Leveling"
      }
    ],
    "sections": [
      {
        "heading": "The Genesis of the Absolute Being",
        "content": "In the primordial void, the Absolute Being divided light into Rulers and darkness into Monarchs. The Monarchs were driven by an innate urge to destroy existence, while the Rulers were compelled to protect it. Weary of endless stalemate, seven of the eight Rulers rebelled against their creator, discovering the Absolute Being viewed their bloodshed as mere entertainment."
      },
      {
        "heading": "Ashborn's Transformation",
        "content": "Ashborn, the greatest of the Rulers who remained loyal to the Absolute Being, fell in battle against his fellow comrades. Upon death, he realized the creator had hidden inside him the power of death itself. Rising as the Monarch of Shadows, he possessed the unique ability to turn departed souls into immortal soldiers."
      },
      {
        "heading": "Inheritance by Sung Jinwoo",
        "content": "Seeking a mortal vessel capable of containing his immense spiritual weight, Ashborn partnered with the Architect to create the 'System'. After witnessing Sung Jinwoo's unbreakable willpower, Ashborn relinquished his heart and throne, naming Jinwoo the definitive Shadow Monarch."
      }
    ],
    "relatedArticles": [
      "sung-jinwoo",
      "solo-leveling-manhwa"
    ],
    "sourceAttribution": "Chugong / D&C Media"
  },
  {
    "id": "titans-and-paths",
    "slug": "titans-and-the-paths",
    "title": "Titan Shifting & The Paths",
    "type": "concept",
    "category": "Metaphysics & Biology",
    "universeId": "attack-on-titan",
    "universeName": "Attack on Titan",
    "summary": "The intangible coordinate plane connecting all Subjects of Ymir to the Founder, enabling instantaneous transfer of flesh, blood, and memories.",
    "author": "Survey Corps Historian",
    "lastUpdated": "July 2026",
    "infobox": [
      {
        "label": "Originator",
        "value": "Ymir Fritz (2,000 Years Ago)"
      },
      {
        "label": "The Nine Titans",
        "value": "Founding, Attack, Colossal, Armored, Female, Beast, Jaw, Cart, War Hammer"
      },
      {
        "label": "The Coordinate",
        "value": "Single Nexus Tree in the Paths"
      },
      {
        "label": "Lifespan Penalty",
        "value": "Curse of Ymir (13 Years)"
      },
      {
        "label": "Universe",
        "value": "Attack on Titan"
      }
    ],
    "sections": [
      {
        "heading": "The Origin of Titan Power",
        "content": "Titan power originated when the slave girl Ymir Fritz made contact with the source of all living matter beneath a giant tree. Transformed into the first Titan, she served King Fritz of Eldia. Upon her death, her soul entered an otherworldly coordinate realm known as the 'Paths', where she tirelessly molded Titan bodies out of sand across limitless timelessness."
      },
      {
        "heading": "The Coordinate and Memory Inheritance",
        "content": "The Paths transcend physical distance and time. Whenever an Eldian injects Titan spinal fluid or shifts into one of the Nine Titans, flesh and bone flow instantly through the Paths. Shifters inherit memories from predecessors, and the Attack Titan uniquely possesses the ability to receive memories from future successors."
      }
    ],
    "relatedArticles": [
      "eren-yeager",
      "attack-on-titan-manga"
    ],
    "sourceAttribution": "Hajime Isayama / Kodansha"
  }
];

// 7. CONTENT SERVICE (Helper query methods)
export const contentService = {
  // Universes
  getAllUniverses: () => universesData,
  getFeaturedUniverses: () => universesData.filter((u) => u.featured),
  getUniverseBySlug: (slug) => universesData.find((u) => u.slug === slug),
  getUniverseById: (id) => universesData.find((u) => u.id === id),

  // Characters
  getAllCharacters: () => charactersData,
  getCharacterBySlug: (slug) => charactersData.find((c) => c.slug === slug),
  getCharactersByUniverse: (universeId) => charactersData.filter((c) => c.universeId === universeId),
  getFeaturedCharacters: () => charactersData.slice(0, 4),

  // Media
  getAllMedia: () => mediaData,
  getMediaBySlug: (slug) => mediaData.find((m) => m.slug === slug),
  getMediaByType: (type) => mediaData.filter((m) => m.type.toLowerCase() === type.toLowerCase()),
  getCyberfictionMedia: () => mediaData.filter((m) => m.type.toLowerCase() === "cyberfiction" || m.genres?.includes("Cyberfiction")),
  getMediaByUniverse: (universeId) => mediaData.filter((m) => m.universeId === universeId),
  getFeaturedMedia: () => mediaData.filter((m) => m.featured),

  // Articles
  getAllArticles: () => articlesData,
  getArticleBySlug: (slug) => articlesData.find((a) => a.slug === slug),
  getArticlesByUniverse: (universeId) => articlesData.filter((a) => a.universeId === universeId),
  getFeaturedArticles: () => articlesData.slice(0, 3),

  // Full Universe Payload
  getUniverseFullDetails: (slug) => {
    const universe = universesData.find((u) => u.slug === slug);
    if (!universe) return null;

    const characters = charactersData.filter((c) => c.universeId === universe.id);
    const media = mediaData.filter((m) => m.universeId === universe.id);
    const articles = articlesData.filter((a) => a.universeId === universe.id);

    return {
      ...universe,
      characters,
      media,
      articles
    };
  }
};

// 8. SEARCH SERVICE (Universal multi-entity search)
export const searchService = {
  search: (query, { type = "all", universeId = "all" } = {}) => {
    if (!query || typeof query !== "string") {
      return { total: 0, results: [], groups: {} };
    }

    const q = query.trim().toLowerCase();
    if (!q) {
      return { total: 0, results: [], groups: {} };
    }

    let allResults = [];

    // Search Universes
    if (type === "all" || type === "universe") {
      universesData.forEach((u) => {
        const matchName = u.name.toLowerCase().includes(q);
        const matchDesc = u.description.toLowerCase().includes(q);
        const matchTag = u.tagline && u.tagline.toLowerCase().includes(q);
        if (matchName || matchDesc || matchTag) {
          allResults.push({
            id: u.id,
            slug: u.slug,
            title: u.name,
            subtitle: `${u.category} · Debut ${u.debutYear}`,
            type: "universe",
            url: `/universes/${u.slug}`,
            image: u.bannerImage,
            universeId: u.id
          });
        }
      });
    }

    // Search Characters
    if (type === "all" || type === "character") {
      charactersData.forEach((c) => {
        const matchName = c.name.toLowerCase().includes(q);
        const matchReal = c.realName && c.realName.toLowerCase().includes(q);
        const matchAlias = c.aliases && c.aliases.some((a) => a.toLowerCase().includes(q));
        const matchBio = c.biography.toLowerCase().includes(q);
        if (matchName || matchReal || matchAlias || matchBio) {
          allResults.push({
            id: c.id,
            slug: c.slug,
            title: c.name,
            subtitle: `${c.universeName} · ${c.species}`,
            type: "character",
            url: `/characters/${c.slug}`,
            image: c.portrait,
            universeId: c.universeId
          });
        }
      });
    }

    // Search Media
    if (type === "all" || type === "media") {
      mediaData.forEach((m) => {
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchSynopsis = m.synopsis.toLowerCase().includes(q);
        const matchGenre = m.genres && m.genres.some((g) => g.toLowerCase().includes(q));
        if (matchTitle || matchSynopsis || matchGenre) {
          allResults.push({
            id: m.id,
            slug: m.slug,
            title: m.title,
            subtitle: `${m.universeName} · ${m.type.toUpperCase()} (${m.releaseYear})`,
            type: "media",
            url: `/media/${m.slug}`,
            image: m.coverImage,
            universeId: m.universeId
          });
        }
      });
    }

    // Search Articles
    if (type === "all" || type === "article") {
      articlesData.forEach((a) => {
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchSummary = a.summary.toLowerCase().includes(q);
        if (matchTitle || matchSummary) {
          allResults.push({
            id: a.id,
            slug: a.slug,
            title: a.title,
            subtitle: `${a.universeName} · ${a.category}`,
            type: "article",
            url: `/articles/${a.slug}`,
            image: a.coverImage || null,
            universeId: a.universeId
          });
        }
      });
    }

    if (universeId && universeId !== "all") {
      allResults = allResults.filter((item) => item.universeId === universeId);
    }

    const groups = {
      universes: allResults.filter((r) => r.type === "universe"),
      characters: allResults.filter((r) => r.type === "character"),
      media: allResults.filter((r) => r.type === "media"),
      articles: allResults.filter((r) => r.type === "article")
    };

    return {
      total: allResults.length,
      results: allResults,
      groups
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 10. REACT CONTEXT: PERSONAL LIBRARY (replaces old Zustand store)
// ═══════════════════════════════════════════════════════════════════════════════
//
// HOW IT WORKS (step by step):
//
//   1. getInitialLibrary() loads saved bookmarks from the browser's localStorage.
//      If nothing is saved yet, it provides a few starter items.
//
//   2. libraryReducer() handles every type of change (add, remove, update, clear).
//      Think of it like a switchboard: you tell it WHAT to do, it figures out HOW.
//
//   3. LibraryProvider is a React component that wraps the app.
//      It holds the state (items) and passes it down so every child can read it.
//
//   4. useLibrary() is a custom hook that any component calls to:
//      - Read the current items list
//      - Check if something is bookmarked (isInLibrary)
//      - Add / remove / update / clear items
//
// ═══════════════════════════════════════════════════════════════════════════════

const LIBRARY_STORAGE_KEY = "loreverse_personal_library_v1";

// Step 1: Load saved library from browser storage (or use defaults)
const getInitialLibrary = () => {
  try {
    const saved = localStorage.getItem(LIBRARY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (err) {
    console.warn("Could not load library from localStorage:", err);
  }
  return [
    {
      id: "iron-man-1",
      slug: "iron-man-2008",
      title: "Iron Man",
      type: "movie",
      category: "Cinema & Movies",
      status: "completed",
      coverImage: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=700&q=80",
      universeName: "Marvel Cinematic Universe",
      addedAt: new Date().toISOString()
    },
    {
      id: "sl-manhwa",
      slug: "solo-leveling-manhwa",
      title: "Solo Leveling (Webtoon)",
      type: "manhwa",
      category: "Manhwa",
      status: "reading",
      coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
      universeName: "Solo Leveling",
      addedAt: new Date().toISOString()
    },
    {
      id: "infinity-stones",
      slug: "the-infinity-stones",
      title: "The Infinity Stones",
      type: "article",
      category: "Cosmic Relics",
      status: "bookmarked",
      coverImage: null,
      universeName: "Marvel Cinematic Universe",
      addedAt: new Date().toISOString()
    }
  ];
};

// Helper: persist the items list to browser localStorage
const saveLibraryToLocalStorage = (items) => {
  try {
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save personal library:", err);
  }
};

// Step 2: The reducer — handles all library state changes
// Every "action" has a { type, payload } shape.
// The reducer returns the NEW items array after applying the action.
function libraryReducer(items, action) {
  let updated;

  switch (action.type) {
    case "ADD_ITEM": {
      // Don't add duplicates
      if (items.some((i) => i.id === action.payload.item.id)) return items;

      const newEntry = {
        id: action.payload.item.id,
        slug: action.payload.item.slug,
        title: action.payload.item.title || action.payload.item.name,
        type: action.payload.item.type || "media",
        category: action.payload.item.category || "General",
        status: action.payload.status,
        coverImage: action.payload.item.coverImage || action.payload.item.portrait || null,
        universeName: action.payload.item.universeName || "Fictional Universe",
        addedAt: new Date().toISOString()
      };
      updated = [newEntry, ...items];
      saveLibraryToLocalStorage(updated);
      return updated;
    }

    case "REMOVE_ITEM": {
      updated = items.filter((item) => item.id !== action.payload.id);
      saveLibraryToLocalStorage(updated);
      return updated;
    }

    case "UPDATE_STATUS": {
      updated = items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, status: action.payload.newStatus };
        }
        return item;
      });
      saveLibraryToLocalStorage(updated);
      return updated;
    }

    case "CLEAR": {
      saveLibraryToLocalStorage([]);
      return [];
    }

    default:
      return items;
  }
}

// Step 3: Create the Context "mailbox"
const LibraryContext = createContext(null);

// Step 3b: The Provider component — wraps the app in main.jsx or App.jsx
export function LibraryProvider({ children }) {
  // useReducer gives us [currentState, dispatch].
  // "dispatch" is a function we call to trigger an action in the reducer.
  const [items, dispatch] = useReducer(libraryReducer, null, getInitialLibrary);

  // Build helper functions that match the old API
  // useCallback prevents creating new function references on every render
  const isInLibrary = useCallback(
    (id) => items.some((item) => item.id === id),
    [items]
  );

  const getItemStatus = useCallback(
    (id) => {
      const found = items.find((i) => i.id === id);
      return found ? found.status : null;
    },
    [items]
  );

  const addItem = useCallback(
    (item, status = "plan_to_watch") => {
      dispatch({ type: "ADD_ITEM", payload: { item, status } });
    },
    []
  );

  const removeItem = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    []
  );

  const updateStatus = useCallback(
    (id, newStatus) => dispatch({ type: "UPDATE_STATUS", payload: { id, newStatus } }),
    []
  );

  const clearLibrary = useCallback(
    () => dispatch({ type: "CLEAR" }),
    []
  );

  // The value object is what every child component receives
  const value = { items, isInLibrary, getItemStatus, addItem, removeItem, updateStatus, clearLibrary };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

const defaultLibraryValue = {
  items: [],
  isInLibrary: () => false,
  getItemStatus: () => null,
  addItem: () => {},
  removeItem: () => {},
  updateStatus: () => {},
  clearLibrary: () => {}
};

// Step 4: Custom hook — components call this to read library state safely
export function useLibrary() {
  const context = useContext(LibraryContext);
  return context || defaultLibraryValue;
}


// ═══════════════════════════════════════════════════════════════════════════════
// 11. REACT CONTEXT: GLOBAL SEARCH MODAL (replaces old Zustand store)
// ═══════════════════════════════════════════════════════════════════════════════

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const value = { isModalOpen, openModal, closeModal };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

const defaultSearchValue = {
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
};

// Custom hook — components call this to open/close search safely
export function useSearch() {
  const context = useContext(SearchContext);
  return context || defaultSearchValue;
}

