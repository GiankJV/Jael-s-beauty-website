import './globals.css';
import { Playfair_Display, Work_Sans } from 'next/font/google';
import Script from 'next/script';
import { LanguageProvider } from '@/context/LanguageContext';
import LayoutWithBooking from '@/components/LayoutWithBooking';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata = {
  title: "Jael's Beauty Salon",
  description: 'Japanese head spa rituals and bespoke hair transformations on the Gulf Coast.',
  icons: {
    icon: '/icon.png',
  },
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
      <body className={`${body.variable} ${display.variable} font-body antialiased bg-beige text-ink`}>
        {/* Wrap the UI with the language provider so text can toggle between EN/ES */}
        <LanguageProvider>
          <LayoutWithBooking>{children}</LayoutWithBooking>
        </LanguageProvider>
      </body>
    </html>
  );
}
