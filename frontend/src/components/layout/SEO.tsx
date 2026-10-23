import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl = 'https://forensicai.in',
  ogType = 'website',
  ogImage = 'https://forensicai.in/og-image.png',
  noIndex = false,
  jsonLd,
}) => {
  const fullTitle = title.includes('ForensicAI')
    ? title
    : `${title} | ForensicAI - Crime Analysis & Legal Mapping`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content="ForensicAI" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};
