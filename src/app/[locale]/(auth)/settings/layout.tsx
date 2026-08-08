import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthTemplate } from '@/templates/Auth/AuthTemplate';

type SettingsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SettingsLayoutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SettingsLayout',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SettingsLayout(props: SettingsLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AuthTemplate>{props.children}</AuthTemplate>;
}
