import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type = 'website', image, url, schema }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dizvyn.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/src/assets/logo.webp`;

    // Default JSON-LD for LocalBusiness / WebDesignStudio
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebDesignService",
    "name": "Dizvyn",
    "alternateName": ["Dizvyn", "Dizayn", "Dizvayn", "Dizvin", "Dizayn Web", "Dizayn Ajans", "Dizvyn Dijital", "Dizvyn Web Tasarım"],
    "image": imageUrl,
    "url": siteUrl,
    "logo": `${siteUrl}/src/assets/logo.webp`,
    "sameAs": [
      "https://www.instagram.com/dizvyn",
      "https://www.linkedin.com/company/dizvyn"
    ],
    "description": "Dizvyn; modern web site yapımı, web tasarım, yazılım ve UI/UX tasarımı üzerine odaklanan butik bir dijital dizayn stüdyosudur."
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title && title !== 'Ana Sayfa' ? `${title} | Dizvyn` : 'Dizvyn | Web Sitesi Yapımı & UI/UX Tasarım'}</title>
      <meta name='description' content={description || "Dizvyn; web sitesi yapımı, UI/UX tasarım ve butik dijital çözümler sunan kreatif bir stüdyodur. Modern web teknolojileriyle markanızı geleceğe taşıyın."} />
      <meta name='keywords' content="dizvyn, dizayn, dizvayn, dizvin, dizayn web, dizayn ajans, dizvyn web tasarım, web site yapımı, web sitesi yapımı, UI/UX tasarım, arayüz tasarımı, web tasarım, özel yazılım, kreatif ajans, dijital dönüşüm, butik dijital ajans, performanslı web siteleri, React geliştirme" />
      <link rel="canonical" href={fullUrl} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title && title !== 'Ana Sayfa' ? `${title} | Dizvyn` : 'Dizvyn | Web Sitesi Yapımı & UI/UX Tasarım'} />
      <meta property="og:description" content={description || "Dizvyn; web sitesi yapımı, UI/UX tasarım ve butik dijital çözümler sunan kreatif bir stüdyodur. Modern web teknolojileriyle markanızı geleceğe taşıyın."} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title && title !== 'Ana Sayfa' ? `${title} | Dizvyn` : 'Dizvyn | Web Sitesi Yapımı & UI/UX Tasarım'} />
      <meta name="twitter:description" content={description || "Dizvyn; web sitesi yapımı, UI/UX tasarım ve butik dijital çözümler sunan kreatif bir stüdyodur. Modern web teknolojileriyle markanızı geleceğe taşıyın."} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
