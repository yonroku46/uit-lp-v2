import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import Problem from '@/components/sections/Problem/Problem';
import Philosophy from '@/components/sections/Philosophy/Philosophy';
import ValueProposition from '@/components/sections/ValueProposition/ValueProposition';
import Service from '@/components/sections/Service/Service';
import Process from '@/components/sections/Process/Process';
import CareerApproach from '@/components/sections/CareerApproach/CareerApproach';
import Counselor from '@/components/sections/Counselor/Counselor';
import Faq from '@/components/sections/Faq/Faq';
import Contact from '@/components/sections/Contact/Contact';

export const metadata: Metadata = {
  title: 'UIT-Fukuoka | 福岡エンジニア専門キャリア相談所',
  description:
    '福岡・UIターンエンジニアのキャリア相談ならUIT-Fukuoka。転職前提なし、初回90分完全無料。あなたのキャリアを、もっと自由に。',
};

// JSON-LD構造化データ
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'UIT-Fukuoka',
      url: siteUrl,
      description: '福岡・UIターンエンジニア専門のキャリア相談サービス',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '福岡市',
        addressRegion: '福岡県',
        addressCountry: 'JP',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: '日本語',
      },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#service`,
      name: 'エンジニア向けキャリア相談サービス',
      provider: { '@id': `${siteUrl}/#organization` },
      description:
        '福岡IT市場に特化したエンジニア専門のキャリアカウンセリング。初回90分無料、転職費用エンジニア負担ゼロ。',
      areaServed: {
        '@type': 'Country',
        name: '日本',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
        description: '初回90分キャリア相談無料',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '転職を考えていなくても相談できますか？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'はい、転職すべきか迷っている段階でのご相談も歓迎します。',
          },
        },
        {
          '@type': 'Question',
          name: '初回相談後に費用はかかりますか？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'エンジニア側への費用は一切かかりません。初回90分は完全無料です。',
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <CareerApproach />
        <Philosophy />
        <ValueProposition />
        <Service />
        <Process />
        <Counselor />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
