import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { WebVitals } from '@/components/analytics/WebVitals';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebVitals />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
