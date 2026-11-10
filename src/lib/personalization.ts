import type { Interest, InterestId } from "@/types/experience";

export interface PathMoment {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional — only for experience/story pages, not degrees.asu.edu */
  href?: string;
  linkLabel?: string;
}

export interface MirrorImageFeature {
  kicker: string;
  title: string;
  body: string;
  credit: string;
}

export interface PersonalizedContent {
  mirror: {
    preline: string;
    headline: string;
    emphasis: string;
    subline: string;
    imageSrc: string;
    imageAlt: string;
    imageCredit?: string;
    imageFeature?: MirrorImageFeature;
  };
  paths: PathMoment[];
  momentum: {
    stat: string;
    statLabel: string;
    headline: string;
    subline: string;
    imageSrc: string;
    imageAlt: string;
  };
}

export const DEFAULT_CONTENT: PersonalizedContent = {
  mirror: {
    preline: "Every path is different.",
    headline: "Yours is",
    emphasis: "still forming.",
    subline: "Choose what pulls you in above — and watch the story shift.",
    imageSrc:
      "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Student looking toward the horizon on campus",
  },
  paths: [
    {
      title: "Explore freely",
      description: "400+ programs. One campus that lets you try everything.",
      imageSrc:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "University campus aerial view",
    },
    {
      title: "Find your people",
      description: "Clubs, labs, studios — communities built around what you love.",
      imageSrc:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Students collaborating together",
    },
    {
      title: "Make it real",
      description: "Internships, research, ventures — experience before you graduate.",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Team working on a creative project",
    },
  ],
  momentum: {
    stat: "30+",
    statLabel: "#1 rankings in the last 3 years",
    headline: "The future isn't waiting.",
    subline: "Neither should you.",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Students walking across campus at sunset",
  },
};

export const PERSONALIZED_CONTENT: Record<InterestId, PersonalizedContent> = {
  build: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "build.",
      subline: "Code, prototype, ship. At ASU, makers don't wait for permission.",
      imageSrc:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Developer working on a laptop in a modern workspace",
    },
    paths: [
      {
        title: "Prototype fast",
        description: "Makerspaces, hackathons, and labs where ideas become working products in days.",
        imageSrc:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Engineering student building a prototype",
      },
      {
        title: "Launch at Demo Day",
        description: "Pitch to investors, join venture programs, and take your startup from sketch to stage.",
        imageSrc:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Entrepreneur presenting to an audience",
      },
      {
        title: "Build with industry",
        description: "Intern at Fortune 500s and startups alike — Phoenix is one of America's fastest-growing tech hubs.",
        imageSrc:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Modern tech office workspace",
      },
    ],
    momentum: {
      stat: "#1",
      statLabel: "in innovation — ahead of MIT & Stanford",
      headline: "Your ideas deserve",
      subline: "a place that builds with you.",
      imageSrc:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Students collaborating on a tech project",
    },
  },
  help: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "help.",
      subline: "Heal, advocate, uplift. The world needs people who show up for others.",
      imageSrc:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Healthcare professional caring for a patient",
    },
    paths: [
      {
        title: "Heal communities",
        description: "Nursing, social work, public health — programs that put compassion into practice.",
        imageSrc:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Medical students in a clinical setting",
      },
      {
        title: "Lead change",
        description: "Policy, advocacy, and community orgs where your voice moves the needle.",
        imageSrc:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Diverse group of advocates together",
      },
      {
        title: "Connect across cultures",
        description: "Global health initiatives and cross-cultural programs that expand who you can reach.",
        imageSrc:
          "https://images.unsplash.com/photo-1488523789244-0d3859664576?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students on a global service trip",
      },
    ],
    momentum: {
      stat: "Top 10",
      statLabel: "nursing program in the nation",
      headline: "Caring at scale",
      subline: "starts with one person who gives a damn.",
      imageSrc:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Healthcare workers in a hospital setting",
    },
  },
  create: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "create.",
      subline: "Design, film, perform, shape. Expression isn't extra here — it's essential.",
      imageSrc:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Artist working on a vibrant canvas",
    },
    paths: [
      {
        title: "Studio to stage",
        description: "Herberger programs in design, film, music, and theatre — create in world-class facilities.",
        imageSrc:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Concert lights and creative performance",
      },
      {
        title: "Portfolio before diploma",
        description: "Client projects, gallery shows, and film festivals — your work goes public early.",
        imageSrc:
          "https://images.unsplash.com/photo-1499781350541-7783f3095d63?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Art gallery exhibition opening",
      },
      {
        title: "Collide with tech",
        description: "XR labs, digital media, and design-meets-engineering studios at the fusion of art and innovation.",
        imageSrc:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Digital art and creative technology",
      },
    ],
    momentum: {
      stat: "7",
      statLabel: "arts and design programs ranked top 20 in the U.S.",
      headline: "Your voice",
      subline: "deserves a stage, not a syllabus.",
      imageSrc:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Creative performance on stage",
    },
  },
  "change-world": {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "change things.",
      subline: "Justice, equity, impact. You don't want to adapt to the world — you want to reshape it.",
      imageSrc:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Activists raising hands together",
    },
    paths: [
      {
        title: "Policy that matters",
        description: "School of Public Affairs, sustainability law, and civic engagement programs with real reach.",
        imageSrc:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Government and civic building",
      },
      {
        title: "Global impact",
        description: "Study abroad, Peace Corps prep, and international development — think beyond borders.",
        imageSrc:
          "https://images.unsplash.com/photo-1488523789244-0d3859664576?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Global community gathering",
      },
      {
        title: "Sustainability in action",
        description: "Solar research, urban planning, and green initiatives — ASU leads in sustainability.",
        imageSrc:
          "https://images.unsplash.com/photo-1473341304170-971dccb5acae?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Solar panels and sustainable campus",
      },
    ],
    momentum: {
      stat: "#1",
      statLabel: "in global impact — ahead of MIT & Penn State",
      headline: "The world needs",
      subline: "people who refuse to accept it as-is.",
      imageSrc:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Community organizing and social impact",
    },
  },
  business: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "build something.",
      subline: "Entrepreneurship isn't a club here — it's a culture.",
      imageSrc:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Entrepreneur presenting a business idea",
    },
    paths: [
      {
        title: "W. P. Carey edge",
        description: "Top-ranked business school with programs in finance, marketing, and supply chain.",
        imageSrc:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Business strategy meeting",
      },
      {
        title: "Startup ecosystem",
        description: "ASU Venture Devils, incubator space, and mentor networks that de-risk your first launch.",
        imageSrc:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Startup team brainstorming",
      },
      {
        title: "Real revenue, real early",
        description: "Student-run businesses generating actual income before graduation — not just case studies.",
        imageSrc:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Mobile payment and commerce",
      },
    ],
    momentum: {
      stat: "No. 17",
      statLabel: "worldwide for business school research",
      headline: "Your ambition",
      subline: "needs room to move fast.",
      imageSrc:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Modern business district skyline",
    },
  },
  discover: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "discover.",
      subline: "Questions drive you. Answers are just the beginning.",
      imageSrc:
        "https://images.unsplash.com/photo-1532094349883-543bc11b234d?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Scientist examining samples in a lab",
    },
    paths: [
      {
        title: "Research from day one",
        description: "Undergrads in labs alongside faculty — not waiting until grad school to do real science.",
        imageSrc:
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Laboratory research equipment",
      },
      {
        title: "Space & beyond",
        description: "ASU built instruments for NASA missions. You could work on the next one.",
        imageSrc:
          "https://images.unsplash.com/photo-1446776653960-20c1d3a81b27?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Space and astronomy research",
      },
      {
        title: "Biodesign breakthroughs",
        description: "The Biodesign Institute tackles cancer, infectious disease, and personalized medicine.",
        imageSrc:
          "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Biomedical research facility",
      },
    ],
    momentum: {
      stat: "$700M+",
      statLabel: "in annual research expenditures",
      headline: "Curiosity",
      subline: "is the most powerful major.",
      imageSrc:
        "https://images.unsplash.com/photo-1507413245164-6160d829bb77?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Microscope and scientific discovery",
    },
  },
  games: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "play.",
      subline: "Games are worlds. You want to be the one who builds them.",
      imageSrc:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Gaming setup with immersive lighting",
    },
    paths: [
      {
        title: "Game design programs",
        description: "Narrative design, 3D modeling, and interactive media — learn the full pipeline.",
        imageSrc:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Video game development workspace",
      },
      {
        title: "Esports & community",
        description: "Competitive gaming, streaming culture, and events that turn passion into profession.",
        imageSrc:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Esports gaming arena",
      },
      {
        title: "Ship your game",
        description: "Student studios publishing to Steam and mobile — playable portfolios, not just demos.",
        imageSrc:
          "https://images.unsplash.com/photo-1612287230202-1ff1d85c1bdf?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Game design on multiple screens",
      },
    ],
    momentum: {
      stat: "Top 10",
      statLabel: "most innovative gaming programs",
      headline: "Imagination",
      subline: "is the ultimate engine.",
      imageSrc:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Immersive gaming experience",
    },
  },
  planet: {
    mirror: {
      preline: "You feel it —",
      headline: "the pull to",
      emphasis: "protect.",
      subline:
        "Climate, conservation, stewardship — the planet isn't someone else's problem.",
      imageSrc: "/images/interests/planet-mirror.jpg",
      imageAlt: "ASU students learning forward-looking ocean science in SEA 194: Ocean Futures",
      imageFeature: {
        kicker: "School of Ocean Futures",
        title: "SEA 194: Ocean Futures",
        body: "With the School of Ocean Futures' inaugural course, students can now prepare to join efforts on the forefront of ocean solutions, research, and conservation.",
        credit:
          "Bermuda Institute of Ocean Sciences (BIOS) · Julie Ann Wrigley Global Futures Laboratory at ASU",
      },
    },
    paths: [
      {
        title: "School of Sustainability",
        description: "The first of its kind in the nation — degrees built for the defining challenge of our time.",
        imageSrc: "/images/interests/planet-path-1.jpg",
        imageAlt: "ASU School of Sustainability",
      },
      {
        title: "Field to policy",
        description: "From desert ecology research to environmental law — protect at every level.",
        imageSrc: "/images/interests/planet-path-2.jpg",
        imageAlt: "Desert ecology and environmental research at ASU",
      },
      {
        title: "Carbon-neutral campus",
        description: "Learn on a campus that practices what it teaches — solar, water conservation, zero waste goals.",
        imageSrc: "/images/interests/planet-path-3.jpg",
        imageAlt: "Solar and sustainability on the ASU campus",
      },
    ],
    momentum: {
      stat: "#1",
      statLabel: "for sustainability — ahead of Stanford & UC Berkeley",
      headline: "The planet",
      subline: "doesn't need spectators.",
      imageSrc: "/images/interests/planet-momentum.jpg",
      imageAlt: "ASU sustainability and planetary stewardship in action",
    },
  },
  exploring: {
    mirror: {
      preline: "You're still",
      headline: "figuring it",
      emphasis: "out.",
      subline: "Good. That's exactly where the best stories begin.",
      imageSrc:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Student contemplating their future on campus",
    },
    paths: [
      {
        title: "Undecided? Perfect.",
        description: "Exploratory tracks let you sample majors before committing — no penalty for curiosity.",
        imageSrc:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students exploring campus together",
      },
      {
        title: "400+ paths",
        description: "From astrophysics to fashion — if it exists, ASU probably teaches it.",
        imageSrc:
          "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "University campus overview",
      },
      {
        title: "Change your mind",
        description: "Most students switch direction at least once. Here, that's a feature — not a failure.",
        imageSrc:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Student studying with an open mind",
      },
    ],
    momentum: {
      stat: "30+",
      statLabel: "#1 rankings in the last 3 years",
      headline: "Not knowing",
      subline: "is the most honest place to start.",
      imageSrc:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Students walking across campus",
    },
  },
};

export function getPersonalizedContent(interestId: InterestId | null): PersonalizedContent {
  if (!interestId) return DEFAULT_CONTENT;
  return PERSONALIZED_CONTENT[interestId];
}

export function getThemeAccent(theme: Interest["theme"]): string {
  const accents: Record<Interest["theme"], string> = {
    tech: "#FFC627",
  human: "#FFC627",
  creative: "#E8618C",
  impact: "#FFC627",
  venture: "#FFC627",
    science: "#4A90A4",
    play: "#E8618C",
    environment: "#6B8E4E",
    open: "#FFC627",
  };
  return accents[theme];
}
