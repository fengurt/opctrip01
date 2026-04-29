import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className={className}
    >
      <Globe className="w-4 h-4 mr-2" />
      {lang === 'zh' ? 'EN' : '中文'}
    </Button>
  );
}
