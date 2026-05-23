import type { WpData, Service, Project, Review, PricingTier, FAQItem, TimelineEvent } from '../types';
import {
  SERVICES_DATA, PROJECTS_DATA, REVIEWS_DATA, PRICING_DATA, FAQ_DATA, TIMELINE_DATA,
} from '../types';

function wd(): WpData | undefined {
  return typeof window !== 'undefined' ? window.wpData : undefined;
}

export function getWpData(): WpData | undefined {
  return wd();
}

export function servicesItems(): Service[] {
  return wd()?.services?.items ?? SERVICES_DATA;
}

export function projectsItems(): Project[] {
  return wd()?.projects?.items ?? PROJECTS_DATA;
}

export function projectsCategories(): string[] {
  return wd()?.projects?.categories ?? ['All', 'Fashion Brand Campaign', 'SaaS Launch', 'Restaurant Rebrand', 'Personal Brand Growth', 'Product Commercial'];
}

export function reviewsItems(): Review[] {
  return wd()?.reviews?.items ?? REVIEWS_DATA;
}

export function pricingTiers(): PricingTier[] {
  return wd()?.pricing?.tiers ?? PRICING_DATA;
}

export function faqItems(): FAQItem[] {
  return wd()?.faq?.items ?? FAQ_DATA;
}

export function timelineItems(): TimelineEvent[] {
  return wd()?.timeline?.items ?? TIMELINE_DATA;
}

export function getThemeUri(): string {
  return wd()?.themeUri ?? '';
}
