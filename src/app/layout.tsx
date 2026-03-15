import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rivly — AI-Powered Competitor UX/CX Analysis',
  description: 'Automated weekly UX/CX reports on your competitors. AI-powered insights in 30 minutes. Set up in 5 minutes, save 40+ hours per month.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Rivly — Your AI UX analyst watching competitors 24/7',
    description: 'Get automated weekly UX/CX analysis of your competitors. Powered by AI.',
    url: 'https://rivly.tech',
    siteName: 'Rivly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rivly — AI-Powered Competitor UX Analysis',
    description: 'Automated weekly UX/CX reports. Set up in 5 min.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('rivly-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
