import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Andy Zheng — Data Scientist & AI/ML Engineer',
  description: '6+ years delivering enterprise-scale ML, LLM, and RAG solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="bjork-light-surreal"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        {/*
          Restore persisted theme before first paint.
          Falls back to prefers-color-scheme if no stored preference.
          suppressHydrationWarning on <html> silences the server/client mismatch.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t);return}}catch(e){}var d=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',d?'bjork-minimal':'bjork-light-surreal')})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
