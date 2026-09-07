import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  ogImage?: string;
}

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://unitedmedilab.com';

export function SEO({ title, description, canonical, noindex, jsonLd, ogImage }: SEOProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | United MediLab`
      : 'United MediLab — Diagnostic Laboratory in Perumbavoor, Kerala';

    const desc = description ||
      'Reliable laboratory testing and diagnostic services in Perumbavoor, Kerala. Secure digital access to your reports. Book health check packages online.';

    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : window.location.href;

    document.title = fullTitle;

    setMeta('description', desc);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', canonicalUrl);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', 'website', 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);

    const existing = document.querySelectorAll('script[data-jsonld]');
    existing.forEach((el) => el.remove());

    if (jsonLd) {
      const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      scripts.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-jsonld', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical, noindex, jsonLd, ogImage]);

  return null;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'United MediLab',
  description: 'Diagnostic laboratory and medical testing services in Perumbavoor, Kerala.',
  telephone: '+91-9539900048',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump',
    addressLocality: 'Perumbavoor',
    addressRegion: 'Kerala',
    postalCode: '683542',
    addressCountry: 'IN',
  },
  areaServed: 'Perumbavoor, Ernakulam, Kerala',
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'United MediLab',
  url: BASE_URL,
};

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function packageOfferJsonLd(pkg: { name: string; description?: string | null; offer_price?: number | null; original_price?: number | null; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.description || undefined,
    url: `${BASE_URL}/packages/${pkg.slug}`,
    price: pkg.offer_price ?? undefined,
    priceCurrency: 'INR',
  };
}
