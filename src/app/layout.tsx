import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import { FB_PIXEL_ID, GA_TRACKING_ID, GOOGLE_ADS_ID, CLARITY_ID } from '@/lib/tracking';
import '../styles/globals.scss';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'UIT-Fukuoka | 福岡のITエンジニア専門キャリア相談（転職・UIターン支援）',
    template: '%s | UIT-Fukuoka',
  },
  description:
    'いきなり求人は紹介しません。福岡在住＆U・Iターン希望のITエンジニア（バックエンド/Web/アプリ/フルスタック/AI等）専門の個別キャリア相談。強みと理想の働き方を徹底整理し、ミスマッチを防ぐ初回90分無料相談。',
  keywords: [
    '福岡', 'エンジニア', '転職', 'UIターン', 'キャリア相談', 'IT転職', 'バックエンド', 'Webエンジニア', 'アプリ開発', 'AIエンジニア', '無料相談'
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'UIT-Fukuoka',
    title: 'UIT-Fukuoka | 福岡のITエンジニア専門キャリア相談（転職・UIターン支援）',
    description:
      'いきなり求人は紹介しません。福岡在住＆U・Iターン希望のITエンジニア専門キャリア相談。ミスマッチを防ぐ初回90分無料相談。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UIT-Fukuoka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UIT-Fukuoka | 福岡のITエンジニア専門キャリア相談（転職・UIターン支援）',
    description:
      'いきなり求人は紹介しません。福岡在住＆U・Iターン希望のITエンジニア専門キャリア相談。ミスマッチを防ぐ初回90分無料相談。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Google Tag (gtag.js) - Google Analytics & Google Ads */}
        {(GA_TRACKING_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID || GOOGLE_ADS_ID}`}
            />
            <Script
              id="google-tags-base"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${GA_TRACKING_ID ? `gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });` : ''}
                  ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
                `,
              }}
            />
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        )}

        {/* Meta Pixel */}
        {FB_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
