'use client';

import { useState } from 'react';
import { useT } from './i18n';
import { city, wordmarkText } from '@/config/city';

export function ShareButton() {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.origin : `https://${city.domain}`;
    const data = {
      title: wordmarkText,
      text: `${wordmarkText} — das Wichtigste aus ${city.name} auf einen Blick`,
      url,
    };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled or clipboard blocked */
    }
  }

  return (
    <button type="button" className="linklike" onClick={share}>
      {copied ? t('Link kopiert ✓') : t('Teilen')}
    </button>
  );
}
