export interface WorkingHours {
  display: string;
  details?: string;
}

export interface SocialMedia {
  instagram?: string;
  vkontakte?: string;
  gorko?: string;
  youtube?: string;
  rutube?: string;
}

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface Contact {
  _type: 'contact';
  title: string;
  email: string;
  phone?: string;
  address?: string;
  workingHours: WorkingHours;
  socialMedia?: SocialMedia;
  contactFormEnabled: boolean;
  contactFormEmail?: string;
  mapLocation?: MapLocation;
}

export interface WorkingCity {
  _type: 'workingCity';
  name: string;
  description?: string;
  performances: string;
  order: number;
}

export interface FAQ {
  _type: 'faq';
  question: string;
  answer: string;
  order: number;
}

export interface BlogCategory {
  _type: 'blogCategory';
  name: string;
  slug: {
    current: string;
  };
  order: number;
  count?: number;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  category: BlogCategory;
  publishedAt: string;
  readTime: number;
  isFeatured: boolean;
  content: any[];
}

export interface GalleryPhoto {
  _type: 'galleryPhoto';
  image: {
    asset: {
      url: string;
    };
  };
  alt: string;
  category: string;
  order: number;
}

export interface GalleryVideo {
  _type: 'galleryVideo';
  title: string;
  description: string;
  videoUrl: string;
  videoFile?: {
    url: string;
  };
  thumbnail: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface PortfolioItem {
  _type: 'portfolioItem';
  title: string;
  date: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  stats: {
    viewers: string;
    duration: string;
    artists: string;
  };
  order: number;
}

export interface Service {
  _type: 'service';
  title: string;
  slug: {
    current: string;
  };
  type: 'fire' | 'pyro';
  description: string;
  icon: 'Sparkles' | 'Star' | 'Target';
  duration: string;
  performers?: string;
  height?: string;
  order: number;
  images: {
    asset: {
      url: string;
    };
  }[];
}

export interface SpecialOffer {
  _type: 'specialOffer';
  title: string;
  description: string;
  icon: 'Heart' | 'PartyPopper' | 'Building' | 'Calendar';
  image: {
    asset: {
      url: string;
    };
  };
  price: string;
  features: string[];
  order: number;
}

export interface PriceListItem {
  _type: 'priceListItem';
  title: string;
  duration: string;
  price: string;
  type: 'fire' | 'pyro';
  order: number;
}

export interface AboutGalleryImage {
  _type: 'aboutGalleryImage';
  alt: string;
  order: number;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface Achievement {
  _type: 'achievement';
  title: string;
  year: string;
  description: string;
  icon: 'Trophy' | 'Award' | 'Star' | 'Users';
  order: number;
}

export interface AboutStats {
  _type: 'aboutStats';
  clientCount: string;
  citiesCount: string;
  yearsExperience: string;
}

export interface TeamMember {
  _type: 'teamMember';
  name: string;
  role: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  socialMedia?: {
    instagram?: string;
    vkontakte?: string;
  };
  order: number;
}

export interface Review {
  _type: 'review';
  author: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  avatar: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface HistoryEvent {
  _type: 'historyEvent';
  year: string;
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface DocumentFile {
  _type: 'documentFile';
  title: string;
  description: string;
  file: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface VideoBanner {
  _type: 'videoBanner';
  title: string;
  subtitle: string;
  videoUrl: {
    asset: {
      url: string;
    };
  };
}

export interface CompanyIntro {
  _type: 'companyIntro';
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}

export interface HomeStat {
  label: string;
  value: number;
  suffix: string;
}

export interface HomeStats {
  _type: 'homeStats';
  stats: HomeStat[];
}

export interface UpcomingEvent {
  _type: 'upcomingEvent';
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'public' | 'private';
  typeLabel: string;
  order: number;
}

export interface MainPageService {
  _type: 'mainPageService';
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface MainPageSections {
  _type: 'mainPageSections';
  servicesSection: {
    title: string;
    description: string;
  };
  eventsSection: {
    title: string;
    description: string;
  };
}

export interface PageHeader {
  title: string;
  description: string;
}

export interface PageHeaders {
  _type: 'pageHeaders';
  aboutHeader: PageHeader;
  blogHeader: PageHeader;
  contactsHeader: PageHeader;
  galleryHeader: PageHeader;
  servicesHeader: PageHeader;
}
