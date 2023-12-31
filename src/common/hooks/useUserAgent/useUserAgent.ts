import { useEffect, useState, useCallback } from 'react';

import type { UseUserAgentProps } from './useUserAgent.interface';

export const useUserAgent = ({ breakpoint }: UseUserAgentProps) => {
  const checkDevice = useCallback(
    (): boolean => window.innerWidth < breakpoint,
    [breakpoint],
  );

  const [isMobile, setIsMobile] = useState<boolean>(checkDevice());

  useEffect(() => {
    const onPageResize = (): void => setIsMobile(checkDevice());

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onPageResize);
      window.addEventListener('orientationchange', onPageResize);
      window.addEventListener('load', onPageResize);
      window.addEventListener('reload', onPageResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onPageResize);
        window.removeEventListener('orientationchange', onPageResize);
        window.removeEventListener('load', onPageResize);
        window.removeEventListener('reload', onPageResize);
      }
    };
  }, [checkDevice]);

  return [isMobile];
};
