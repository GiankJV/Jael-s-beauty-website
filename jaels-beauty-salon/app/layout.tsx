import './globals.css';
import { Allura, Cormorant_Garamond, Nunito } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/context/LanguageContext';
import LayoutWithBooking from '@/components/LayoutWithBooking';

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
  description: 'Japanese head spa rituals and bespoke hair transformations on the Gulf Coast.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        {/* Wrap the UI with the language provider so text can toggle between EN/ES */}
        <LanguageProvider>
          <LayoutWithBooking>{children}</LayoutWithBooking>
        </LanguageProvider>
      </body>
    </html>
  );
}
