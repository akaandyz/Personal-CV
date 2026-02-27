import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="bjork-minimal" suppressHydrationWarning>
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
