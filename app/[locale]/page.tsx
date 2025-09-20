import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { HeroSection } from '@/components/hero/hero-section';
import { HomeIntro } from '@/components/sections/home/intro';
import { ExperienceHighlights } from '@/components/sections/home/experience-highlights';
import { SkillsOverview } from '@/components/sections/home/skills-overview';
import { AchievementsSpotlight } from '@/components/sections/home/achievements-spotlight';
import { CTABanner } from '@/components/sections/home/cta-banner';

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return (
    <div className="space-y-16">
      <HeroSection messages={messages} locale={locale} />
      <HomeIntro messages={messages} locale={locale} />
      <ExperienceHighlights messages={messages} />
      <SkillsOverview messages={messages} />
      <AchievementsSpotlight messages={messages} />
      <CTABanner messages={messages} locale={locale} />
    </div>
  );
}
