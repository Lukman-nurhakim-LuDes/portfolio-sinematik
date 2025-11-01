import { Libre_Baskerville, Work_Sans } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-work-sans',
});

export const metadata = {
  title: '[Nama Brand Kamu] - Fotografi Sinematik',
  description: 'Capturing Emotion in Every Frame',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body 
        className={`${libreBaskerville.variable} ${workSans.variable} bg-anthracite font-sans text-white`}
      >
        {children}
      </body>
    </html>
  );
}
