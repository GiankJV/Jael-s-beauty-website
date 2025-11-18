import './globals.css';
import { Allura, Cormorant_Garamond, Nunito } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/components/LanguageProvider';
import LayoutWithBooking from '@/components/LayoutWithBooking';
import SplashScreen from '@/components/SplashScreen';

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: "Jael's Beauty Salon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: "Jael's Beauty Salon",
    url: 'https://jaelsbeauty.com',
    telephone: '+1-657-353-7263',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '729 E Pass Rd h',
      addressLocality: 'Biloxi',
      addressRegion: 'MS',
      postalCode: '39507',
      addressCountry: 'US',
    },
    areaServed: ['Biloxi', 'Gulfport', 'Ocean Springs', 'Pascagoula', 'Mobile', 'Hattiesburg'],
    makesOffer: ['Spa services', 'Hair color', 'Hair treatments'],
  };
  return (
    <html lang="en" className={`${allura.variable} ${cormorant.variable} ${nunito.variable}`}>
      <head>
        {/* Insert the Nanochat script here if provided. Replace `YOUR_NANOCHAT_SCRIPT` with your snippet */}
        {process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT && (
          <Script
            id="nanochat-script"
            dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT }}
          />
        )}
      </head>
      <body className="font-body antialiased bg-beige text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Wrap the UI with the language provider so text can toggle between EN/ES */}
        <LanguageProvider>
          <SplashScreen />
          <LayoutWithBooking>{children}</LayoutWithBooking>
        </LanguageProvider>
      </body>
    </html>
  );
}
