import { Project, Service, ClientLogo } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "supremacy-2025",
    title: "SUPREMACY 2025 - THE RAW REIGN",
    category: "Festival Aftermovie",
    client: "Supremacy (Art of Dance)",
    year: "2025",
    videoUrl: "https://www.youtube.com/embed/pSj72v9k_Ww", // High energy music style
    thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200",
    description: "The official extreme-intensity recap for the world's leading indoor raw hardstyle arena. Filmed under monumental lightning, strobes, and dense low-hanging lasers. This production focuses on massive kickrolls, earthshaking crowd reactions, and hyper-kinetic editing that mirrors the extreme BPM transitions.",
    specs: {
      camera: "RED V-Raptor 8K VV",
      lens: "Atlas Orion Anamorphic Prime Set",
      framerate: "4K 120fps (Ultra Smooth Climax)",
      colorSpace: "REDWideGamut / Log3G10",
      crewSize: "4 Cine Operators",
      crowdSize: "15,000 Raw Troops"
    },
    role: "Director of Photography & Editor-in-Chief",
    stats: [
      { label: "Views", value: "1.4M+" },
      { label: "BPM Cut Rate", value: "160" },
      { label: "Glow Layer Comp", value: "240fps" }
    ],
    tags: ["Anamorphic", "Festival", "RED 8K", "Indoor Lasers"]
  },
  {
    id: "rebirth-2025",
    title: "REBIRTH FESTIVAL - REVELATION",
    category: "Festival Video Production",
    client: "Rebirth Festival (official)",
    year: "2025",
    videoUrl: "https://www.youtube.com/embed/g2f7Z_88C8s",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
    description: "Inaugurating the outdoor festival season under pristine skies and electric nights. We deployed heavy drone coverage and FPV loops flying right over the mainstage structure, tracking the DJs and high-speed crowd interactions. Synchronized to the energetic summer hardstyle anthem.",
    specs: {
      camera: "Sony FX6 Cinema Line & DJI Inspire 3",
      lens: "Sony G-Master & Kowa Cine adapters",
      framerate: "4K 120fps / ProRes RAW",
      colorSpace: "S-Log3 / S-Gamut3.Cine",
      crewSize: "3 Cam + 1 FPV Specialist",
      crowdSize: "32,000 Weekend Warriors"
    },
    role: "Lead DP & Aerial Coordinator",
    stats: [
      { label: "Rebirth Reach", value: "980K+" },
      { label: "FPV Aerials", value: "48 Cuts" },
      { label: "Turnaround Time", value: "24 Hours" }
    ],
    tags: ["FPV Drone", "Outdoor Mainstage", "Day-to-Night", "Speed Ramp"]
  },
  {
    id: "sub-zero-project-2024",
    title: "SUB ZERO PROJECT - HOLOGRAPHIC ENTRANCE",
    category: "Artist Stage Visuals",
    client: "Sub Zero Project (Dirty Workz)",
    year: "2024",
    videoUrl: "https://www.youtube.com/embed/5U77F2mCOms",
    thumbnailUrl: "https://images.unsplash.com/photo-1482440308425-276ad0f28b19?q=80&w=1200",
    description: "A dark cyberpunk custom visual narrative created to play on giant transparent LED screens during the duo's worldwide arena tours. Combining cinematic live-action shots in an abandoned hangar, heavy smog machines, futuristic lighting setups, and deep electric blue color schemes.",
    specs: {
      camera: "ARRI Alexa Mini LF",
      lens: "Cooke Anamorphic i/2 T2.3",
      framerate: "4K 48fps (Dreamy Cinematic)",
      colorSpace: "ARRI Log-C v3",
      crewSize: "8 Person Studio Crew",
      crowdSize: "Artist Special Video"
    },
    role: "Co-Director & Senior Cyber VFX",
    stats: [
      { label: "Tour Venues", value: "18 Cities" },
      { label: "Rendering Time", value: "72 Hours" },
      { label: "Visual Scale", value: "32Kpx Span" }
    ],
    tags: ["Sci-Fi Narrative", "Artist Special", "Alexa Mini LF", "Cyber Neon"]
  },
  {
    id: "defqon1-legends",
    title: "DEFQON.1 - THE PYRO SYNC RECAP",
    category: "Event Highlight Video",
    client: "Q-dance (Defqon.1)",
    year: "2024",
    videoUrl: "https://www.youtube.com/embed/gTId89hK5pM",
    thumbnailUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200",
    description: "Filming the holy ground of harder styles. Working as an official press partner to cover 'The Gathering' and the legendary Defqon Power Hour. Custom lighting-rig protection gear was used to film right underneath 1000+ synchronized pyrotechnic explosive launches.",
    specs: {
      camera: "Sony FX3 Run-and-Gun Rig",
      lens: "Laowa Cine 12mm & 24mm Probe",
      framerate: "4K 60fps (Constant Stabilizer)",
      colorSpace: "Sony S-Cinetone",
      crewSize: "Solo Operator (Rapid Speed)",
      crowdSize: "85,000 Hardcore Believers"
    },
    role: "Solo Cinematographer & Fast-Cutter",
    stats: [
      { label: "Views", value: "3.2M+" },
      { label: "Pyros Captured", value: "1,200+" },
      { label: "Hardcore Energy", value: "185BPM" }
    ],
    tags: ["Pyro Sync", "Ultra-Wide", "Gimbal Flow", "Massive Audience"]
  },
  {
    id: "vertile-revelation",
    title: "VERTILE - SHADOW PLAY STAGE INTRO",
    category: "Artist Branding & Social",
    client: "Vertile (Savage Squad)",
    year: "2025",
    videoUrl: "https://www.youtube.com/embed/jY3Q3Y7g_pA",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    description: "An intimate, raw, and high-frequency portrait-formatted video tailored for Vertile's live show intros and trending mobile reels. Shot with dirty vintage glass to give it a brutalist, analog look, contrasted with explosive cyan glowing neon outline graphics tracking his stage jumps.",
    specs: {
      camera: "RED Komodo (Lightweight Shoulder Rig)",
      lens: "Canon FD Vintage Lens Set",
      framerate: "6K 40fps (Anamorphic crop)",
      colorSpace: "RED IPP2 Cinema Graded",
      crewSize: "2 Person Quick Crew"
    },
    role: "Director / Motion Designer / Grader",
    stats: [
      { label: "Social Loops", value: "2.1M+" },
      { label: "Share Ratio", value: "4.8x Avg" },
      { label: "Vintage Aura", value: "100%" }
    ],
    tags: ["Handheld Rig", "Vintage Glass", "Brutalist", "Outline Tracker"]
  },
  {
    id: "intents-2024",
    title: "INTENTS FESTIVAL - SHOGUN OF LIGHT",
    category: "Festival Aftermovie",
    client: "Intents Festival (official)",
    year: "2024",
    videoUrl: "https://www.youtube.com/embed/A8M59i73QO8",
    thumbnailUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200",
    description: "Focusing on the architectural soundstage of the Intents theme 'Kingdom of Light'. Filming with heavy mechanical telemetry, capturing laser setups crossing over 40-meter tall warrior statues. Highly stylized contrast layers are applied to emphasize visual bloom.",
    specs: {
      camera: "Sony FX6 & FX3 Dual Rig",
      lens: "Sony G-Master Zoom Series",
      framerate: "4K 120fps (Slow-motion drop-shots)",
      colorSpace: "S-Log3 Cinema Gamma",
      crewSize: "2 Operators",
      crowdSize: "40,000 Crowd Troops"
    },
    role: "Lead Cine Rig Operator",
    stats: [
      { label: "Beats Tracked", value: "155BPM" },
      { label: "Laser Protection", value: "IR Cut Filter" },
      { label: "Vibe Score", value: "11/10" }
    ],
    tags: ["Laser Defense", "Laser Bloom", "Gigantic Structures", "EDM Vibes"]
  }
];

export const SERVICES: Service[] = [
  {
    id: "festival-coverage",
    title: "Festival Aftermovies",
    description: "Comprehensive multi-camera and FPV drone video recaps packed with crowd energy, pyrotechnic syncing, laser flares, and premium cinematic audio design that makes visitors live the event again.",
    iconName: "Flame",
    deliverables: ["Full Official Aftermovie", "Artist Teasers", "Stage Opener Clip", "Social Media Cutdowns"],
    techHighlight: "RED Cine 8K Sensors + Slow Motion Anamorphic"
  },
  {
    id: "social-media-content",
    title: "Social Media Campaigning",
    description: "Hyper-frequency portrait videos tailored for TikTok, Reels, and YouTube Shorts. Dynamic typography, vintage styling, and fast beats integration to multiply audience engagement by up to 5x.",
    iconName: "Sparkles",
    deliverables: ["Vertical Artist Hype Reels", "VFX Asset Overlays", "BPM Audio Integration", "Daily Recaps on-site"],
    techHighlight: "Mobile-first framing + Fast-turnaround edits within 3 hours"
  },
  {
    id: "artist-branding",
    title: "Artist Tour Visuals & Intros",
    description: "Sci-fi and brutalist cyber stage visual content designed for giant venue screens. Customized CGI tracks and tracking outlines that make acts feel grand and larger than life.",
    iconName: "MonitorPlay",
    deliverables: ["Stage Show Opening", "Track Release Teasers", "Artist Manifesto Video", "Alpha Transparencies"],
    techHighlight: "Holographic outlines + 3D laser-aligned visual outputs"
  },
  {
    id: "music-videos",
    title: "Cinematic Music Videos",
    description: "Deep narrative-driven music video productions with customized color grading, moody concept locations, anamorphic lens flares, and theatrical set direction that visualizes the track story.",
    iconName: "Film",
    deliverables: ["Full Narrative Cut", "Pre-Release Teasers", "Director's Commentary Cuts", "Behind the Scenes Layer"],
    techHighlight: "ARRI Color-Science + Cooke Cinema Optics"
  },
  {
    id: "event-recaps",
    title: "Brand Promotional Campaigns",
    description: "Energetic promotional videos for club nights, DJ management companies, festival gear suppliers, and stage designers. Bold, stylized, and business-focused on driving immediate tickets conversion.",
    iconName: "Video",
    deliverables: ["Phase Announcement Videos", "Ticket Sales Booster Cut", "Partnerships Event Recap", "Sponsor Special Segment"],
    techHighlight: "High-contrast commercial grading + Dynamic call-to-actions"
  },
  {
    id: "short-form-content",
    title: "Impact Shorts & Loops",
    description: "Extremely quick, rhythmically pure EDM visual loops, stage backdrop videos, and promotional animations to maintain daily visual momentum around major electronic releases.",
    iconName: "Zap",
    deliverables: ["10-sec Spotify Canvas loops", "SoundCloud Custom Promo reels", "DJ Set Visual Loop Pack", "Audio Visualizers"],
    techHighlight: "Lossless compression rendering for audio platforms"
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "c1", name: "SUPREMACY", logoText: "SUPREMACY", glowColor: "from-cyan-400 to-cyan-600" },
  { id: "c2", name: "DEFQON.1", logoText: "DEFQON.1", glowColor: "from-blue-400 to-blue-600" },
  { id: "c3", name: "REBIRTH FESTIVAL", logoText: "REBIRTH", glowColor: "from-cyan-400 to-blue-500" },
  { id: "c4", name: "SAVAGE SQUAD", logoText: "SAVAGE SQUAD", glowColor: "from-blue-500 to-cyan-500" },
  { id: "c5", name: "INTENTS FESTIVAL", logoText: "INTENTS", glowColor: "from-cyan-500 to-blue-400" },
  { id: "c6", name: "Q-DANCE", logoText: "Q-DANCE", glowColor: "from-blue-600 to-cyan-400" },
  { id: "c7", name: "DIRTY WORKZ", logoText: "DIRTY WORKZ", glowColor: "from-cyan-400 to-cyan-600" }
];
