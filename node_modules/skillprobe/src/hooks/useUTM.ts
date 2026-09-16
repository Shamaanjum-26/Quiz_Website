import { useEffect, useState } from 'react';
import { captureUTMFromURL, getPersistedUTM } from '@/lib/analytics';
import type { UTMData } from '@/types';

export function useUTM(): UTMData {
  const [utm, setUTM] = useState<UTMData>({});

  useEffect(() => {
    const fromURL = captureUTMFromURL();
    const persisted = getPersistedUTM();
    setUTM({ ...persisted, ...fromURL });
  }, []);

  return utm;
}
