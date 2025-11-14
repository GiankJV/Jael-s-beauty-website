import './globals.css';
import { Allura, Cormorant_Garamond, Nunito } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/context/LanguageContext';
import LayoutWithBooking from '@/components/LayoutWithBooking';

const script = Allura({ subsets: ['latin'], weight: '400', variable: '--font-script' });
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});
const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata = {
  title: "Jael's Beauty Salon",
  description:
    'Luxury beauty salon in Gulfport serving Biloxi, Gulfport and the surrounding 100‑mile area. Hair, spa and bridal services by appointment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Insert the Nanochat script here if provided. Replace `YOUR_NANOCHAT_SCRIPT` with your snippet */}
        {process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT && (
          <Script
            id="nanochat-script"
            dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT }}
          />
        )}
      </head>
      <body className={`${body.variable} ${display.variable} ${script.variable} font-body antialiased bg-beige text-ink`}>
        {/* Wrap the UI with the language provider so text can toggle between EN/ES */}
        <LanguageProvider>
          <LayoutWithBooking>{children}</LayoutWithBooking>
        </LanguageProvider>
      </body>
    </html>
  );
}
