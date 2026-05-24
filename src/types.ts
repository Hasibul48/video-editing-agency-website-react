export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  metrics: string;
  description: string;
  imagePath?: string;
  videoFile?: string;
  videoId?: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  companyName: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  frequency?: string;
  description: string;
  features: string[];
  popular: boolean;
  badge?: string;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface StatValue {
  id: string;
  value: string;
  label: string;
}

// -------------------------------------------------------
// Global wpData — injected by WordPress functions.php
// -------------------------------------------------------
export interface WpData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  themeUri: string;
  ajaxUrl: string;
  restUrl: string;
  nonce: string;
  email: string;
  studioLocation: string;
  copyright: string;
  socialLinks: Record<string, string>;
  navLinks: { name: string; href: string }[];
  hero: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollText: string;
    stats: { value: string; label: string; description: string }[];
  };
  about: {
    manifesto: string[];
    stats: { value: string; label: string }[];
    qualityBadge: string;
    workflow?: TimelineEvent[];
  };
  services: {
    sectionHeader: string;
    sectionTitle: string;
    sectionSubtext: string;
    items: Service[];
  };
  projects: {
    sectionHeader: string;
    sectionTitle: string;
    categories: string[];
    items: Project[];
  };
  reviews?: {
    sectionHeader?: string;
    sectionTitle?: string;
    items: Review[];
    videoTestimonials: { client: string; role: string; duration: string; videoFile?: string; youtubeId?: string }[];
  };
  pricing: {
    sectionHeader: string;
    sectionTitle: string;
    billedMonthly: string;
    billedAnnually: string;
    footnote: string;
    tiers: PricingTier[];
  };
  faq: {
    sectionHeader: string;
    sectionTitle: string;
    supportCallout: string;
    supportSubtext: string;
    supportCta: string;
    items: FAQItem[];
  };
  finalCta: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    buttonText: string;
    limitText: string;
  };
  introVideo: {
    sectionHeader: string;
    sectionTitle: string;
    description: string;
    playButtonText: string;
    duration: string;
    videoFile?: string;
    youtubeId: string;
    floatingNodes: string[];
  };
  fictionalBrands?: { name: string; logo: string }[];
  bookingForm?: {
    dates: { value: string; display: string }[];
    times: string[];
  };
  buttonSettings?: {
    navbarBookCallText: string;
    navbarBookCallUrl: string;
    heroCtaPrimaryText: string;
    heroCtaPrimaryUrl: string;
    heroCtaSecondaryText: string;
    heroCtaSecondaryUrl: string;
    heroScrollText: string;
    heroScrollUrl: string;
    introVideoPlayText: string;
    projectsWatchLabel: string;
    finalCtaButtonText: string;
    finalCtaButtonUrl: string;
    finalCtaLimitText: string;
    faqSupportCtaText: string;
    faqSupportCtaUrl: string;
  };
}

declare global {
  interface Window {
    wpData?: WpData;
  }
}

// PREMIUM AGENCY ASSETS & METADATA CONFIG
export const SERVICES_DATA: Service[] = [
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Multi-channel content engines that position your brand as the absolute authority and generate high-intent inbound opportunities.",
    iconName: "FileText",
    benefits: ["Authority Building", "SEO Ecosystems", "Inbound Funnels"]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Cinematic human-centric short and long-form video curation built to completely dominate social algorithms and retain eye contact.",
    iconName: "Video",
    benefits: ["Cinematic Grading", "Dynamic Soundscapes", "Micro-Retention Hooks"]
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description: "Complete visual identity, tone of voice guidelines, and competitive brand positioning to command premium pricing.",
    iconName: "Compass",
    benefits: ["Market Differentiation", "Visual Identity Systems", "Premium Tone & Voice"]
  },
  {
    id: "social-media-growth",
    title: "Social Media Growth",
    description: "Calculated attention-grabbing marketing playbooks engineered for organic, explosive reach across TikTok, YouTube, and LinkedIn.",
    iconName: "TrendingUp",
    benefits: ["Trend Architecture", "Daily Publishing Systems", "Viral Loop Engineering"]
  },
  {
    id: "creative-direction",
    title: "Creative Direction",
    description: "End-to-end creative campaigns, artistic oversight, and concept prototyping to turn complex business ideas into stunning visual stories.",
    iconName: "Sparkles",
    benefits: ["Cinematic Storyboards", "Concept Validation", "Uncompromising Aesthetics"]
  },
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    description: "High-ROI traffic systems integrating premium content creative with surgical audience targeting for rapid customer acquisition.",
    iconName: "Activity",
    benefits: ["Creatives-First Ad Optimization", "Meta & YT Specialist Setup", "Conversion Attribution"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Aura Haute Couture Cam",
    category: "Fashion Brand Campaign",
    client: "AURA Paris",
    metrics: "+340% Engagement Rate",
    description: "Crafted a dark-luxe cinematic campaign displaying abstract silk motion and chrome curves, capturing premium global attention.",
    imagePath: "/src/assets/images/brandjo_fashion_1779378386303.png"
  },
  {
    id: "proj-2",
    title: "Synergy Enterprise SaaS",
    category: "SaaS Launch",
    client: "Synergy Group",
    metrics: "48,000+ Signups in 14 Days",
    description: "Launched an interactive dark digital network visualization, transforming raw cloud systems telemetry into an elegant, high-impact marketing reel.",
    imagePath: "/src/assets/images/brandjo_saas_1779378408344.png"
  },
  {
    id: "proj-3",
    title: "Nero Sensory Dining Rebrand",
    category: "Restaurant Rebrand",
    client: "Nero Restaurant",
    metrics: "Fully booked 3 months forward",
    description: "Re-imagined premium hospitality with custom glass typography overlays, deep concrete visuals, and neon purple ambient dining storyboards.",
    imagePath: "/src/assets/images/brandjo_rebrand_1779378427472.png"
  },
  {
    id: "proj-4",
    title: "Vertex Personal Brand Growth",
    category: "Personal Brand Growth",
    client: "AI Venture Partner",
    metrics: "0 to 220,000 Premium Followers",
    description: "Built an authoritative content strategy around clean typography overlays, black backgrounds, and hyper-targeted venture capital insights.",
    imagePath: "/src/assets/images/brandjo_hero_bg_1779378368447.png"
  },
  {
    id: "proj-5",
    title: "Synthetix Product Commercial",
    category: "Product Commercial",
    client: "Synthetix Labs",
    metrics: "12M Views, +41% Direct Sales",
    description: "Rendered abstract chrome liquids and crystal floating graphics to launch a premium bio-hacking supplement line without single physical human models.",
    imagePath: "/src/assets/images/brandjo_saas_1779378408344.png"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    quote: "Brandjo completely transformed our online presence. What used to be standard corporate postings was elevated into custom, cinematic business stories that our prospects cite during sales calls. Best creative decision we've made.",
    author: "Elena Vance",
    role: "VP of Marketing, Synthetix Labs",
    rating: 5,
    companyName: "SYNTHETIX"
  },
  {
    id: "rev-2",
    quote: "The content quality feels cinematic. Every video, asset, and strategic document produced by Brandjo Media reflects standard-setting prestige. They operate at a tier of sophistication that simply doesn't exist elsewhere.",
    author: "Marcus Thorne",
    role: "Creative Director, Aura Paris",
    rating: 5,
    companyName: "AURA"
  },
  {
    id: "rev-3",
    quote: "Best creative team we've worked with. Their multi-channel framework helped us scale synergy reach from non-existent to dominating luxury-tech feeds. They do of course command a premium, but the output is worth multiple times their fee.",
    author: "Solomon Kray",
    role: "Founder, Synergy Group",
    rating: 5,
    companyName: "SYNERGY"
  },
  {
    id: "rev-4",
    quote: "Working with Brandjo Media allowed us to launch our secret-beta product with massive immediate authority. The abstract floating animations and clean UI visual teasers spoke directly to premium tech founders.",
    author: "Zarah Chen",
    role: "Co-Founder, Vertex Systems",
    rating: 5,
    companyName: "VERTEX"
  }
];

export const FICTIONAL_BRANDS = [
  { name: "AURA", logo: "A U R A" },
  { name: "SYNTHETIX", logo: "S Y N T H E T I X" },
  { name: "SYNERGY", logo: "S Y N E R G Y" },
  { name: "VERTEX", logo: "V E R T E X" },
  { name: "NEXUS", logo: "N E X U S" }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: "t-1",
    year: "Phase 1: Diagnosis",
    title: "Brand Audit & Content Archetype Blueprinting",
    description: "We deep-dive into your existing market positioning, identify competitors' creative weaknesses, and formulate core cinematic narrative templates."
  },
  {
    id: "t-2",
    year: "Phase 2: Production",
    title: "Creative Storyboarding & Cinematic Execution",
    description: "Our world-class design studio crafts bespoke abstract environments, glassmorphic visual trailers, and highly polished narrative copy."
  },
  {
    id: "t-3",
    year: "Phase 3: Launch",
    title: "Platform-Specific Distribution & Ad Systems",
    description: "We deploy content natively into target platforms, utilizing creative-first paid advertising and organic loops optimized for retention."
  },
  {
    id: "t-4",
    year: "Phase 4: Dominate",
    title: "Inbound Pipeline Integration & Growth System Scale",
    description: "We integrate lead qualification cards, map inbound attention to CRM pipelines, and scale metrics based on verified pipeline revenue."
  }
];

export const PRICING_DATA: PricingTier[] = [
  {
    id: "p-starter",
    name: "Starter",
    price: "4,500",
    frequency: "month",
    description: "Perfect for high-potential startups and founders establishing authority.",
    features: [
      "1 Custom Content Archetype Blueprint",
      "8 Custom Cinematic Video Assets",
      "Weekly Copywriting & Scripts",
      "Core Tone of Voice Guide Setup",
      "Dedicated Content Manager Link",
      "Slack Collaboration Access"
    ],
    popular: false,
    ctaText: "Get Starter Suite"
  },
  {
    id: "p-growth",
    name: "Growth",
    price: "8,500",
    frequency: "month",
    description: "Our flagship setup that fully scales social reach and brand prestige.",
    features: [
      "3 Custom Content Archetypes Blueprint",
      "18 Custom Cinematic Video Assets",
      "Daily Multichannel Copywriting",
      "Complete Visual Brand Identity Redesign",
      "Fictional Brand Collaboration Hooking",
      "Creative Paid Advertising Strategy",
      "Bi-Weekly Strategy Calls",
      "24/7 Priority Channel Support"
    ],
    popular: true,
    badge: "MOST POPULAR",
    ctaText: "Scale My Brand"
  },
  {
    id: "p-dominance",
    name: "Dominance",
    price: "15,000",
    frequency: "month",
    description: "A total creative takeover for market leaders aiming to rewrite the rules completely.",
    features: [
      "Unlimited Cinematic Video Deliverables",
      "Omnichannel Multi-platform Distribution Systems",
      "Complete Brand Strategy & Positioning Consulting",
      "Bespoke Abstract 3D Render Assets Created",
      "Dedicated Full-time Creative Director Integration",
      "Full Funnel Lead Attribution Setup",
      "Weekly Progress Audits & Direct CEO Hotlines",
      "Unmatched Performance-backed Growth Commitments"
    ],
    popular: false,
    badge: "ENTERPRISE ELITE",
    ctaText: "Secure Absolute Domination"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does Brandjo Media provide?",
    answer: "We are a full-service futuristic creative content agency specializing in Content Marketing, High-End Cinematic Video Editing, Comprehensive Brand Strategy, Organic Social Media Growth playbooks, Luxury Creative Direction, and Conversational Paid Advertising campaigns designed specifically for luxury, elite SaaS, and modern brands.",
    category: "Services"
  },
  {
    id: "faq-2",
    question: "How long does a project take to launch?",
    answer: "Our initial auditing, brand blueprinting, and initial strategy phases take between 7 to 10 days. The production pipeline is continuous, with active premium deliverable scheduling commencing in the second week.",
    category: "Process"
  },
  {
    id: "faq-3",
    question: "Do you work with international clients?",
    answer: "Absolutely. We are fully distributed and service brands, venture capital funds, and modern tech leaders globally. All communication streams, strategy workshops, and execution updates are conducted through premium video and dedicated Slack spaces.",
    category: "Scope"
  },
  {
    id: "faq-4",
    question: "Can you handle end-to-end content strategy?",
    answer: "Yes, this is our key differentiator. Unlike traditional video editors or freelance copywriters, we build the entire high-converting distribution funnel. We handle conceptualizing, storyboarding, scripts writing, raw assets processing, distribution scheduling, and metadata performance analysis.",
    category: "Strategy"
  },
  {
    id: "faq-5",
    question: "What platforms do you specialize in?",
    answer: "Our content engines are fine-tuned for high-retention formats across YouTube (Shorts & Longform), LinkedIn (Authority positioning text/images/carousels), TikTok (Trend-jacking visuals), and Meta/Google for paid advertising amplification.",
    category: "Platforms"
  },
  {
    id: "faq-6",
    question: "How do we get started with Brandjo Media?",
    answer: "Simply click 'Book a Call' or click on our primary CTA to schedule your 1-on-1 strategy diagnostic call. On this deep-dive, we analyze your current content gaps and deliver a complimentary 3-step high-level creative direction script.",
    category: "Onboarding"
  }
];
