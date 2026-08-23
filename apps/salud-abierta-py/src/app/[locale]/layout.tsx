import './../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import EmergencyExit from '@/components/EmergencyExit';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { isValidLocale } from '@/lib/locales';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'guarani' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <SkipToContent />
      <DisclaimerBanner />
      <Navbar locale={locale} />
      <main id="main-content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer locale={locale} />
      <EmergencyExit />
    </>
  );
}
