export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  videoUrl: string; // YouTube embeds or placeholder videos
  thumbnailUrl: string;
  description: string;
  specs: {
    camera: string;
    lens: string;
    framerate: string;
    colorSpace: string;
    crewSize: string;
    crowdSize?: string;
  };
  role: string;
  stats: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  deliverables: string[];
  techHighlight: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoText: string;
  glowColor: string;
}

export interface AtmosphereSettings {
  bpm: number;
  lasersActive: boolean;
  bassBoost: boolean;
  ambientSound: boolean;
  strobeMode: boolean;
}
