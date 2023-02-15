import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import '@/styles/globals.css';
import { Noto_Sans_JP, Roboto } from '@next/font/google';
import { clientEnv } from '@/utils/client-env';
import Script from 'next/script';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const title = 'OUCRC | 岡山大学電子計算機研究会';
const description = `岡山大学電子計算機研究会は、パソコンを使ってプログラミングやDTMをしたり、電子工作や3Dプリンターなど "モノづくり" をしている部活です！部にはVRゴーグルやタブレットなどの機材があり、デバッグなども気軽にできます！また、電子工作のパーツや3Dプリンターなどもあるため、ハードルなく "モノづくり" の世界に入ることができます！そして、息抜きにはゲーム大会を開いたり、漫画を読むこともできます。岡大に入学して部活動・サークル選びに迷っている方は、ぜひ一度遊びに来てください！`;
const ogImageUrl =
  'https://images.microcms-assets.io/assets/9db8326938b34b1381d6805cc5e10b04/e4434ebf7e8a426aaaa71f16dea02a74/cover.jpg';

/**
 * next-seoに相当する機能のapp directory版
 * @see https://beta.nextjs.org/docs/api-reference/metadata#icons
 */
export const metadata = {
  title,
  description,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: title,
    description,
    images: [
      {
        url: ogImageUrl,
      },
    ],
  },
  verification: {
    google: 'gUJca8xJ_QAdQ02BNBQRL7jCS53EgM8BWQZqA7zbSQU',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@oucrc',
    creatorId: '551682037', // 不変のTwitterユーザID
    images: [ogImageUrl],
  },
};

/**
 * 全ページ共通レイアウト
 */
export default async function Layout({ children }: { children: ReactNode }) {
  const gtagId = clientEnv.GTAG_ID;
  return (
    <>
      {/*
        アナリティクス設定
      */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${gtagId}');
           `,
        }}
      />
      <div className={`${notoSansJP} ${roboto} flex min-h-screen flex-col`}>
        <Header />
        <div className="grow pt-16">
          <div className="container mx-auto mb-32 px-10">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}