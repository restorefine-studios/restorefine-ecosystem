export interface BlogSection {
  heading: string;
  content: string;
  link?: {
    label: string;
    href: string;
  };
}

export interface BlogBenefit {
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleHighlight?: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  intro: string;
  faqs?: { question: string; answer: string }[];
  sectionLabel?: string;
  sections: BlogSection[];
  benefitsLabel?: string;
  benefits?: BlogBenefit[];
  conclusion: string;
  cta: {
    text: string;
    label: string;
    href: string;
  };
}

export interface CaseStudyResult {
  metric: string;
}

export interface CaseStudyChallenge {
  heading: string;
  description: string;
}

export interface CaseStudyService {
  heading: string;
  content: string;
  bulletPoints?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  client: {
    name: string;
    industry: string;
    location: string;
    website?: string;
  };
  intro: string;
  context: string;
  challenges: CaseStudyChallenge[];
  approach: {
    intro: string;
    services: CaseStudyService[];
  };
  results: CaseStudyResult[];
  testimonial: {
    quote: string;
    author: string;
  };
  closing: string;
  cta: {
    text: string;
    label: string;
    href: string;
  };
  faqs: FAQ[];
}
