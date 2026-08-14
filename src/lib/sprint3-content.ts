import { MEDIA } from "@/lib/media";
import type { InterestId } from "@/types/experience";

export interface StudentVoice {
  quote: string;
  name: string;
  context: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StatBeat {
  stat: string;
  label: string;
  sublabel?: string;
}

export interface RealExperience {
  program: string;
  headline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BelongingMoment {
  chapter: string;
  preline: string;
  headline: string;
  emphasis: string;
  subline: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Sprint3Content {
  studentVoice: StudentVoice;
  statBeats: StatBeat[];
  experiences: RealExperience[];
  belonging: BelongingMoment;
}

export const DEFAULT_SPRINT3: Sprint3Content = {
  studentVoice: {
    quote:
      "The relationships that you make with people make you who you are.",
    name: "Nikhil D.",
    context: "ASU alum · Senior Director, Business Development",
    imageSrc: MEDIA.scenes.graduatingStudent.local,
    imageAlt: MEDIA.scenes.graduatingStudent.alt,
  },
  statBeats: [
    { stat: "#1", label: "in innovation", sublabel: "among public universities — 10 years running" },
    { stat: "400+", label: "undergraduate degrees", sublabel: "across 18 colleges and schools" },
    { stat: "1,000+", label: "student organizations", sublabel: "find your people from day one" },
  ],
  experiences: [
    {
      program: "Dreamscape Learn",
      headline: "You're part of the story.",
      description:
        "ASU's immersive VR biology lab uses gripping storytelling to teach concepts — students retain more and raise grades by a full letter.",
      imageSrc:
        "https://images.unsplash.com/photo-1592478411213-76181894ffd2?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Immersive virtual reality learning environment",
    },
    {
      program: "Barrett, The Honors College",
      headline: "8,000 students. One community.",
      description:
        "A nationally recognized honors experience with exclusive courses, personalized mentorship, and 600+ academic experiences every semester.",
      imageSrc:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Honors students walking on campus",
    },
    {
      program: "Sun Devil Welcome",
      headline: "Pure passion and fire.",
      description:
        "Before classes even start — marching band, Sparky, President Crow, and 70,000 Sun Devils welcoming you home at Mountain America Stadium.",
      imageSrc:
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Stadium filled with cheering students",
    },
  ],
  belonging: {
    chapter: "03.",
    preline: "If you're starting to picture yourself here —",
    headline: "you",
    emphasis: "belong.",
    subline: "Join 140,000+ Sun Devils who chose to explore what's possible.",
    imageSrc:
      "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Student on campus at golden hour",
  },
};

export const SPRINT3_CONTENT: Record<InterestId, Sprint3Content> = {
  build: {
    studentVoice: {
      quote:
        "You're not just learning the material — you're part of the material, part of the story, part of the exploration.",
      name: "Alysha H.",
      context: "Senior research assistant · NeoBio & Dreamscape Learn",
      imageSrc:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Students collaborating on a technology project",
    },
    statBeats: [
      { stat: "#1", label: "in innovation", sublabel: "U.S. News — 10 consecutive years" },
      { stat: "Full letter", label: "grade improvement", sublabel: "Dreamscape Learn VR biology lab" },
      { stat: "1,000+", label: "students in Venture Devils", sublabel: "ASU's startup incubator" },
    ],
    experiences: [
      {
        program: "Luminosity Lab",
        headline: "Build what doesn't exist yet.",
        description:
          "A student-driven research and development lab where undergrads lead projects that become real products — and real companies.",
        imageSrc:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students building technology in a lab",
      },
      {
        program: "Dreamscape Learn",
        headline: "Learn inside the story.",
        description:
          "Immersive VR labs that shift how biology is taught — powerful technology and gripping narrative combined.",
        imageSrc:
          "https://images.unsplash.com/photo-1592478411213-76181894ffd2?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Virtual reality learning experience",
      },
      {
        program: "Fulton Schools of Engineering",
        headline: "From day one, in the lab.",
        description:
          "Learn alongside professors shaping their fields — undergraduate research isn't reserved for grad students here.",
        imageSrc:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Engineering students in a makerspace",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Builders like you —",
      headline: "this is where",
      emphasis: "you ship.",
      subline: "140,000+ Sun Devils. One university that doesn't wait for permission.",
      imageSrc:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Students collaborating on innovation",
    },
  },
  help: {
    studentVoice: {
      quote:
        "I loved ASU because of all the different opportunities and all the amazing people I met and formed connections with.",
      name: "Olivia B.",
      context: "Biomedical science · Pre-PA, Hospice of the Valley intern",
      imageSrc:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Healthcare student in clinical setting",
    },
    statBeats: [
      { stat: "Top 10", label: "nursing program", sublabel: "in the nation" },
      { stat: "24/7/365", label: "counseling services", sublabel: "free, unlimited — wherever you are" },
      { stat: "95%", label: "Barrett retention rate", sublabel: "students who find community, stay" },
    ],
    experiences: [
      {
        program: "College of Health Solutions",
        headline: "Heal. Advocate. Show up.",
        description:
          "Nursing, public health, social work — programs that put compassion into practice from your first semester.",
        imageSrc:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Healthcare professionals caring for patients",
      },
      {
        program: "Next Generation Service Corps",
        headline: "Lead through service.",
        description:
          "ASU's character-based leadership academy — students go on to elected office, nonprofits, and community impact.",
        imageSrc:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students engaged in community service",
      },
      {
        program: "Global Futures Impact Scholars",
        headline: "Design solutions for people and planet.",
        description:
          "First-year program connecting you with leading scientists, up to $5,000 in funding, and mentorship with purpose.",
        imageSrc:
          "https://images.unsplash.com/photo-1488523789244-0d3859664576?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students on a global impact project",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "People who show up for others —",
      headline: "find their",
      emphasis: "people here.",
      subline: "A community of 140,000+ who believe caring is action.",
      imageSrc:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Healthcare community at work",
    },
  },
  create: {
    studentVoice: {
      quote:
        "I'm doing exactly what I envisioned when I was a student in the Cronkite School.",
      name: "Lina W.",
      context: "Sports reporter & anchor · 12 News, Phoenix",
      imageSrc:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Creative professional on stage",
    },
    statBeats: [
      {
        stat: "7",
        label: "arts and design programs",
        sublabel: "ranked top 20 in the U.S.",
      },
      {
        stat: "600+",
        label: "arts and design",
        sublabel: "faculty members",
      },
      {
        stat: "35",
        label: "arts and design",
        sublabel: "student clubs",
      },
      {
        stat: "38,000+",
        label: "alumni connections in",
        sublabel: "the arts and design",
      },
    ],
    experiences: [
      {
        program: "MIX Center · Mesa",
        headline: "From superhero films to VR games.",
        description:
          "Planar virtual production technology — the same used in The Mandalorian and Dune — available to ASU film students.",
        imageSrc:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Film and media production studio",
      },
      {
        program: "Herberger Institute",
        headline: "Portfolio before diploma.",
        description:
          "Gallery shows, film festivals, client projects — your work goes public while you're still a student.",
        imageSrc:
          "https://images.unsplash.com/photo-1499781350541-7783f3095d63?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Art gallery exhibition",
      },
      {
        program: "ASU California Center",
        headline: "Steps from the film industry.",
        description:
          "Downtown LA — Fashion District, studios, and professional opportunities in film, media, and virtual reality.",
        imageSrc:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Creative industry workspace in Los Angeles",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Creators like you —",
      headline: "deserve a",
      emphasis: "stage.",
      subline: "Not a syllabus. A studio. A screen. A story only you can tell.",
      imageSrc:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Artist at work",
    },
  },
  "change-world": {
    studentVoice: {
      quote:
        "ASU equipped me to approach challenges with a strategic mindset and innovative solutions.",
      name: "Jordan D.",
      context: "CEO · nonprofit serving adults with disabilities",
      imageSrc:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Leader addressing a community",
    },
    statBeats: [
      { stat: "#1", label: "in sustainability", sublabel: "among U.S. universities" },
      { stat: "Top 25", label: "for free speech", sublabel: "FIRE Foundation ranking" },
      { stat: "300+", label: "global education programs", sublabel: "65+ countries" },
    ],
    experiences: [
      {
        program: "Dialogues for Democracy",
        headline: "Join the conversation.",
        description:
          "Nationally recognized thinkers, journalists, and leaders — Mark Cuban, Jane Goodall, Condoleezza Rice — on campus, for you.",
        imageSrc:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Civic dialogue and public forum",
      },
      {
        program: "Watts College of Public Service",
        headline: "Policy that moves the needle.",
        description:
          "Social work, public policy, community solutions — professors conducting research that improves society right now.",
        imageSrc:
          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Community organizing and public service",
      },
      {
        program: "Study Abroad · Antarctica",
        headline: "Go to class in unexpected places.",
        description:
          "4,300+ students participate in global education each year — from Antarctica wildlife research to Spain, Japan, and beyond.",
        imageSrc:
          "https://images.unsplash.com/photo-1488523789244-0d3859664576?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students on a global education trip",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "World-changers like you —",
      headline: "don't adapt.",
      emphasis: "They reshape.",
      subline: "A charter-driven university measured by who it includes — and how they succeed.",
      imageSrc:
        "https://images.unsplash.com/photo-1473341304170-971dccb5acae?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Sustainable landscape at sunrise",
    },
  },
  business: {
    studentVoice: {
      quote:
        "I'm driven by wanting to make the world better, and the fastest way to do that is through startups.",
      name: "Max B.",
      context: "Co-founder, BreatheEV · Flinn Scholar · ASU alum",
      imageSrc:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Entrepreneur presenting a startup idea",
    },
    statBeats: [
      { stat: "Top 25", label: "undergraduate business", sublabel: "W. P. Carey School of Business" },
      { stat: "620+", label: "jobs at ASU-linked startups", sublabel: "Venture Devils ecosystem" },
      { stat: "130+", label: "Fortune 500 recruiters", sublabel: "on campus hiring ASU grads" },
    ],
    experiences: [
      {
        program: "Venture Devils",
        headline: "Pitch. Launch. Repeat.",
        description:
          "1,000+ students supported through ASU's startup incubator — from pitch competitions to funded ventures in 11 states.",
        imageSrc:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Startup pitch event",
      },
      {
        program: "W. P. Carey School",
        headline: "Business with depth.",
        description:
          "Finance, marketing, supply chain, entrepreneurship — a top-ranked school where theory meets real markets.",
        imageSrc:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Business strategy and leadership",
      },
      {
        program: "Thunderbird School",
        headline: "Global from day one.",
        description:
          "Ranked among the world's best for global management — prepare for careers that don't stop at borders.",
        imageSrc:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Global business skyline",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Founders like you —",
      headline: "need a place that",
      emphasis: "moves fast.",
      subline: "600,000+ alumni. The largest network in metro Phoenix.",
      imageSrc:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Modern entrepreneurial workspace",
    },
  },
  discover: {
    studentVoice: {
      quote: "I felt like a true scientist when I was in there.",
      name: "Michelle V.",
      context: "ASU student · undergraduate research",
      imageSrc:
        "https://images.unsplash.com/photo-1532094349883-543bc11b234d?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Student scientist in a research lab",
    },
    statBeats: [
      { stat: "$700M+", label: "annual research", sublabel: "one of the largest research enterprises in the U.S." },
      { stat: "400+", label: "National Academies faculty", sublabel: "including Nobel laureates" },
      { stat: "Top producer", label: "of Fulbright scholars", sublabel: "ahead of Stanford, USC, Johns Hopkins" },
    ],
    experiences: [
      {
        program: "Biodesign Institute",
        headline: "Cure cancer. Destroy tumors. Save lives.",
        description:
          "Regents Professor Hao Yan develops autonomous nanobots targeting disease — and undergrads work alongside him.",
        imageSrc:
          "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Biomedical research laboratory",
      },
      {
        program: "NASA · Space Futures",
        headline: "Build instruments for space.",
        description:
          "ASU built instruments for NASA missions. Laurie Leshin, former JPL director, leads Space Futures at ASU.",
        imageSrc:
          "https://images.unsplash.com/photo-1446776653960-20c1d3a81b27?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Space and astronomy research",
      },
      {
        program: "ASU BIOS · Bermuda",
        headline: "Study the ocean. Save the planet.",
        description:
          "The Bermuda Institute of Ocean Sciences — scientific analysis of the ocean with hands-on student learning.",
        imageSrc:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Ocean science research",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Curious minds like yours —",
      headline: "belong in the",
      emphasis: "lab.",
      subline: "Questions are the most powerful major. Answers are just the beginning.",
      imageSrc:
        "https://images.unsplash.com/photo-1507413245164-6160d829bb77?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Scientific discovery under a microscope",
    },
  },
  games: {
    studentVoice: {
      quote:
        "ASU gives students the autonomy to shape their own experience — to take initiative, explore interests, and design our own path.",
      name: "Mario C.",
      context: "Mechanical engineering · hired at TSMC two months after graduation",
      imageSrc:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Gaming and interactive media workspace",
    },
    statBeats: [
      { stat: "Planar VP", label: "virtual production", sublabel: "same tech used in The Mandalorian — at ASU film schools" },
      { stat: "35", label: "arts & design clubs", sublabel: "including game design and esports" },
      { stat: "MIX", label: "Center · Mesa", sublabel: "blockbuster films to VR games — one facility" },
    ],
    experiences: [
      {
        program: "Narrative & Emerging Media",
        headline: "Ship games, not just demos.",
        description:
          "Student studios publishing to Steam and mobile — playable portfolios that prove what you can do.",
        imageSrc:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Game development studio",
      },
      {
        program: "MIX Center",
        headline: "The Mandalorian's tech. Your classroom.",
        description:
          "Planar virtual production at the MIX Center and ASU California Center — one of the only film schools offering this.",
        imageSrc:
          "https://images.unsplash.com/photo-1612287230202-1ff1d85c1bdf?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Virtual production and game design",
      },
      {
        program: "Esports · The Inferno",
        headline: "Big 12 energy. Pure fire.",
        description:
          "Student section of the week — twice in 2025. Gameday atmosphere that's pure passion, whether you play or cheer.",
        imageSrc:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Esports and gaming arena",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Players and makers like you —",
      headline: "build worlds",
      emphasis: "here.",
      subline: "Imagination is the ultimate engine. ASU is the launchpad.",
      imageSrc:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Immersive gaming experience",
    },
  },
  planet: {
    studentVoice: {
      quote:
        "This holistic approach enables my students to see the bigger picture and empowers them to connect to people and the planet.",
      name: "Cliff Kapono",
      context: "ASU professor · School of Ocean Futures · surfer & storyteller",
      imageSrc:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Natural landscape and environmental stewardship",
    },
    statBeats: [
      { stat: "#1", label: "university for sustainability", sublabel: "in the United States" },
      { stat: "24", label: "national parks & monuments", sublabel: "within reach in Arizona" },
      { stat: "300", label: "sunny days a year", sublabel: "field research in your backyard" },
    ],
    experiences: [
      {
        program: "School of Sustainability",
        headline: "The first of its kind.",
        description:
          "The nation's first school dedicated to sustainability — degrees built for the defining challenge of our time.",
        imageSrc:
          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Sustainable green architecture",
      },
      {
        program: "Rob Walton College of Global Futures",
        headline: "Antarctica. The Grand Canyon. Your lab.",
        description:
          "Study abroad to Antarctica for wildlife and climate research — Arizona's landscape is part of the curriculum.",
        imageSrc:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Forest and natural environment research",
      },
      {
        program: "Indigenous Innovation",
        headline: "Honoring first innovators.",
        description:
          "ASU recognizes the 22 tribal nations of this land — and the canal systems Indigenous peoples designed centuries ago.",
        imageSrc:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Solar energy and sustainable innovation",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Stewards like you —",
      headline: "the planet needs",
      emphasis: "you.",
      subline: "Not spectators. Contributors. Starting before you graduate.",
      imageSrc:
        "https://images.unsplash.com/photo-1473341304170-971dccb5acae?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Renewable energy landscape",
    },
  },
  exploring: {
    studentVoice: {
      quote:
        "I switched my major to broadcast journalism toward the end of my first year. ASU shaped who I am today.",
      name: "Lina W.",
      context: "Journalism · switched from dance · now at 12 News",
      imageSrc:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Student exploring academic options",
    },
    statBeats: [
      { stat: "400+", label: "undergraduate degrees", sublabel: "if it exists, ASU probably teaches it" },
      { stat: "18", label: "colleges & schools", sublabel: "sample before you commit" },
      { stat: "95%", label: "on-campus retention", sublabel: "community from day one keeps you here" },
    ],
    experiences: [
      {
        program: "University College",
        headline: "Undecided? Perfect.",
        description:
          "Exploratory tracks let you sample majors before committing — curiosity isn't a penalty, it's the point.",
        imageSrc:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Students exploring campus together",
      },
      {
        program: "eAdvisor™",
        headline: "Stay on track. Or change course.",
        description:
          "Online tools that map your degree path — and make switching direction seamless when you find your thing.",
        imageSrc:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Student planning their academic journey",
      },
      {
        program: "4 Campuses · 1 University",
        headline: "Find the ASU that fits you.",
        description:
          "Tempe's energy. Polytechnic's makerspaces. Downtown's city feel. West Valley's tight-knit community.",
        imageSrc:
          "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Multiple campus environments at ASU",
      },
    ],
    belonging: {
      chapter: "03.",
      preline: "Still figuring it out?",
      headline: "That's the most",
      emphasis: "honest place to start.",
      subline: "Most students change direction at least once. Here, that's a feature.",
      imageSrc:
        "https://images.unsplash.com/photo-1523580495183-7fccf8c64754?auto=format&fit=crop&w=2400&q=80",
      imageAlt: "Student contemplating their future",
    },
  },
};

export function getSprint3Content(interestId: InterestId | null): Sprint3Content {
  if (!interestId) return DEFAULT_SPRINT3;
  return SPRINT3_CONTENT[interestId];
}
